import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Email configuration
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT_STR = os.getenv("SMTP_PORT")
SMTP_PORT = int(SMTP_PORT_STR) if SMTP_PORT_STR else 587
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


def get_email_template(title: str, message: str, otp_code: str = None, reset_link: str = None) -> str:
    """
    Improved email template with clean formatting
    """
    if otp_code:
        main_content = f"""
        <h2 style="font-size: 20px; color: #333333; margin-bottom: 10px;">{title}</h2>
        <p style="font-size: 14px; color: #555555; line-height: 1.6;">
            {message}
        </p>
        <div style="margin: 20px 0; text-align:center;">
            <div style="display:inline-block; background: #1a73e8; color:#fff; 
            padding:15px 25px; border-radius:6px; font-size:24px; letter-spacing:6px; 
            font-family: monospace;">
                {otp_code}
            </div>
        </div>
        <p style="font-size: 13px; color: #888888;">This code will expire in 10 minutes. 
        If you did not request this, you can safely ignore this email.</p>
        """
    elif reset_link:
        main_content = f"""
        <h2 style="font-size: 20px; color: #333333; margin-bottom: 10px;">{title}</h2>
        <p style="font-size: 14px; color: #555555; line-height: 1.6;">
            {message}
        </p>
        <div style="margin:20px 0; text-align:center;">
            <a href="{reset_link}" style="background:#1a73e8; color:#fff; padding:12px 24px; 
            text-decoration:none; border-radius:6px; font-weight:bold; font-size:16px;">
            Reset Password</a>
        </div>
        <p style="font-size: 13px; color: #888888;">This link will expire in 1 hour.</p>
        """
    else:
        main_content = f"""
        <h2 style="font-size: 20px; color: #333333; margin-bottom: 10px;">{title}</h2>
        <p style="font-size: 14px; color: #555555; line-height: 1.6;">
            {message}
        </p>
        """

    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>{title}</title>
</head>
<body style="margin:0; padding:0; background:#f8f9fa; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">
        <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff; 
        border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.05); padding:30px;">
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="margin:0; font-size:24px; color:#1a73e8;">VAPT</h1>
            </td>
          </tr>
          <tr>
            <td>{main_content}</td>
          </tr>
          <tr>
            <td style="border-top:1px solid #e1e1e1; padding-top:15px; font-size:12px; 
            color:#999999; text-align:center;">
              If this wasn't you, contact our support team at 
              <a href="mailto:support@vapt.com" style="color:#1a73e8; text-decoration:none;">
              support@vapt.com</a>.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:10px; font-size:11px; color:#bbbbbb;">
              &copy; 2025 VAPT. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""

def send_email(to_email: str, subject: str, title: str, message: str, otp_code: str = None, reset_link: str = None):
    try:
        msg = MIMEMultipart("alternative")
        msg['From'] = SMTP_USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject
        msg['List-Unsubscribe'] = "<mailto:support@vapt.com>"

        # Plain text version (for spam filters and fallback)
        plain_text = f"{title}\n\n{message}\n"
        if otp_code:
            plain_text += f"Your OTP Code is: {otp_code}\nThis code expires in 10 minutes."
        if reset_link:
            plain_text += f"Reset your password here: {reset_link}\nThis link expires in 1 hour."

        html_content = get_email_template(title, message, otp_code, reset_link)

        msg.attach(MIMEText(plain_text, 'plain', 'utf-8'))
        msg.attach(MIMEText(html_content, 'html', 'utf-8'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, to_email, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False