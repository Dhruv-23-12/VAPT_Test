from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from datetime import datetime, timedelta
import random
import string
import os
from dotenv import load_dotenv
from models import Base, SuperAdmin, OTPToken, User, UserOTPToken, PasswordResetToken
from uuid import uuid4
from email_utils import send_email
import stripe
import os


stripe.api_key = os.getenv("STRIPE_SECRET_KEY")



PRICE_IDS = {
    'basic': 'price_1RnxsrSA4aXcfSeS74eGurnb',
    'advance': 'price_1Rnxv6SA4aXcfSeSsBIgp3Ob',
    'team': 'price_1RnxvuSA4aXcfSeS7mucDmO8'
}

from fastapi import Request
from fastapi.responses import JSONResponse

# Load environment variables
load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# FastAPI app
app = FastAPI(title="SuperAdmin Authentication API")

# ✅ CORS configuration - allow your frontend (localhost:8080)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class OTPRequest(BaseModel):
    email: EmailStr
    otp_code: str

class SuperAdminCreate(BaseModel):
    email: EmailStr
    password: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOTPRequest(BaseModel):
    email: EmailStr
    otp_code: str
    password: str = None  # Only needed for registration

class PasswordResetVerifyRequest(BaseModel):
    token: str

class PasswordResetRequest(BaseModel):
    token: str
    new_password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# Utility functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def generate_otp() -> str:
    return ''.join(random.choices(string.digits, k=6))

# Routes
@app.post("/NS-MS-1127/login")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(SuperAdmin).filter(SuperAdmin.email == request.email).first()
    if not admin or not verify_password(request.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not admin.is_active:
        raise HTTPException(status_code=401, detail="Account is deactivated")

    otp_code = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=10)

    otp_token = OTPToken(email=request.email, otp_code=otp_code, expires_at=expires_at)
    db.add(otp_token)
    db.commit()

    if not send_email(
        to_email=request.email,
        subject="SuperAdmin Login OTP",
        title="SuperAdmin Login Verification",
        message="Use the following OTP to complete your login verification. Please do not share this code with anyone.",
        otp_code=otp_code
    ):
        raise HTTPException(status_code=500, detail="Failed to send OTP email")

    return {"message": "OTP sent to your email", "email": request.email}

@app.post("/NS-MS-1127/verify-otp")
async def verify_otp(request: OTPRequest, db: Session = Depends(get_db)):
    otp_token = db.query(OTPToken).filter(
        OTPToken.email == request.email,
        OTPToken.otp_code == request.otp_code,
        OTPToken.is_used == False
    ).order_by(OTPToken.created_at.desc()).first()

    if not otp_token:
        raise HTTPException(status_code=400, detail="Invalid OTP code")
    if otp_token.is_expired():
        raise HTTPException(status_code=400, detail="OTP has expired")

    otp_token.is_used = True
    db.commit()

    admin = db.query(SuperAdmin).filter(SuperAdmin.email == request.email).first()
    return {
        "message": "Login successful",
        "admin": {
            "id": admin.id,
            "email": admin.email,
            "role": "superadmin"
        }
    }

@app.post("/NS-MS-1127/create-superadmin")
async def create_superadmin(request: SuperAdminCreate, db: Session = Depends(get_db)):
    existing_admin = db.query(SuperAdmin).filter(SuperAdmin.email == request.email).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="SuperAdmin with this email already exists")

    hashed_password = hash_password(request.password)
    admin = SuperAdmin(email=request.email, password_hash=hashed_password)
    db.add(admin)
    db.commit()
    db.refresh(admin)

    return {"message": "SuperAdmin created successfully", "id": admin.id}

@app.post("/users/register")
async def register_user(request: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    hashed_password = hash_password(request.password)
    user = User(email=request.email, password_hash=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully", "id": user.id}

@app.post("/users/request-otp")
async def request_user_otp(request: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    otp_code = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=10)
    otp_token = UserOTPToken(email=request.email, otp_code=otp_code, expires_at=expires_at)
    db.add(otp_token)
    db.commit()
    
    if not send_email(
        to_email=request.email,
        subject="User Registration OTP",
        title="User Registration Verification",
        message="Use the following OTP to complete your registration. Please do not share this code with anyone.",
        otp_code=otp_code
    ):
        raise HTTPException(status_code=500, detail="Failed to send OTP email")
    
    return {"message": "OTP sent to your email", "email": request.email}

@app.post("/users/verify-registration-otp")
async def verify_registration_otp(request: UserOTPRequest, db: Session = Depends(get_db)):
    otp_token = db.query(UserOTPToken).filter(
        UserOTPToken.email == request.email,
        UserOTPToken.otp_code == request.otp_code,
        UserOTPToken.is_used == False
    ).order_by(UserOTPToken.created_at.desc()).first()
    
    if not otp_token:
        raise HTTPException(status_code=400, detail="Invalid OTP code")
    if otp_token.is_expired():
        raise HTTPException(status_code=400, detail="OTP has expired")
    
    otp_token.is_used = True
    db.commit()
    
    if not request.password:
        raise HTTPException(status_code=400, detail="Password required for registration")
    
    hashed_password = hash_password(request.password)
    user = User(email=request.email, password_hash=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return {"message": "User registered successfully", "id": user.id}

@app.post("/users/request-login-otp")
async def request_login_otp(request: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=401, detail="Account is deactivated")
    
    otp_code = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=10)
    otp_token = UserOTPToken(email=request.email, otp_code=otp_code, expires_at=expires_at)
    db.add(otp_token)
    db.commit()
    
    if not send_email(
        to_email=request.email,
        subject="User Login OTP",
        title="User Login Verification",
        message="Use the following OTP to complete your login verification. Please do not share this code with anyone.",
        otp_code=otp_code
    ):
        raise HTTPException(status_code=500, detail="Failed to send OTP email")
    
    return {"message": "OTP sent to your email", "email": request.email}

@app.post("/users/verify-login-otp")
async def verify_login_otp(request: OTPRequest, db: Session = Depends(get_db)):
    otp_token = db.query(UserOTPToken).filter(
        UserOTPToken.email == request.email,
        UserOTPToken.otp_code == request.otp_code,
        UserOTPToken.is_used == False
    ).order_by(UserOTPToken.created_at.desc()).first()
    
    if not otp_token:
        raise HTTPException(status_code=400, detail="Invalid OTP code")
    if otp_token.is_expired():
        raise HTTPException(status_code=400, detail="OTP has expired")
    
    otp_token.is_used = True
    db.commit()
    
    user = db.query(User).filter(User.email == request.email).first()
    return {"message": "Login successful", "user": {"id": user.id, "email": user.email, "name": getattr(user, 'name', user.email.split('@')[0])}}

@app.post("/users/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    token = str(uuid4())
    expires_at = datetime.utcnow() + timedelta(hours=1)
    reset_token = PasswordResetToken(user_id=user.id, token=token, expires_at=expires_at)
    db.add(reset_token)
    db.commit()
    
    reset_link = f"http://localhost:8080/reset-password/{token}"
    
    if not send_email(
        to_email=user.email,
        subject="Password Reset Link",
        title="Password Reset Request",
        message="Click the button below to reset your password. If you did not request this, please ignore this email.",
        reset_link=reset_link
    ):
        raise HTTPException(status_code=500, detail="Failed to send email")
    
    return {"message": "Password reset link sent to your email"}

@app.post("/users/verify-reset-token")
async def verify_reset_token(request: PasswordResetVerifyRequest, db: Session = Depends(get_db)):
    reset_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == request.token,
        PasswordResetToken.is_used == False
    ).first()
    
    if not reset_token or reset_token.is_expired():
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    user = db.query(User).filter(User.id == reset_token.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "Token valid", "user": {"id": user.id, "email": user.email, "name": getattr(user, 'name', user.email.split('@')[0])}}

@app.post("/users/reset-password")
async def reset_password(request: PasswordResetRequest, db: Session = Depends(get_db)):
    reset_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == request.token,
        PasswordResetToken.is_used == False
    ).first()
    
    if not reset_token or reset_token.is_expired():
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    user = db.query(User).filter(User.id == reset_token.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.password_hash = hash_password(request.new_password)
    reset_token.is_used = True
    db.commit()
    
    return {"message": "Password reset successful"}

@app.post('/create-checkout-session')
async def create_checkout_session(request: Request):
    data = await request.json()
    plan = data.get('plan')
    if plan not in PRICE_IDS:
        return JSONResponse({'error': 'Invalid plan selected'}, status_code=400)
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': PRICE_IDS[plan],
                    'quantity': 1,
                },
            ],
            mode='subscription',
            success_url='http://localhost:8080/payment-success',
            cancel_url='http://localhost:8080/payment-cancel',
        )
        return {'url': checkout_session.url}
    except Exception as e:
        return JSONResponse({'error': str(e)}, status_code=500)

@app.get("/NS-MS-1127/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Run server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)