#! /usr/bin/env python3.6

import os
from flask import Flask, redirect, request, jsonify, send_from_directory
import stripe
from flask_cors import CORS

# Stripe Test Secret Key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app = Flask(__name__, static_url_path='', static_folder='public')
CORS(app)

YOUR_DOMAIN = 'http://localhost:4242'

# Replace with your actual test Price IDs from Stripe Dashboard
PRICE_IDS = {
    'basic': 'price_1RnxsrSA4aXcfSeS74eGurnb',      # Replace with Basic Plan ID
    'advance': 'price_1Rnxv6SA4aXcfSeSsBIgp3Ob',        # Replace with Pro Plan ID
    'team': 'price_1RnxvuSA4aXcfSeS7mucDmO8' # Replace with Premium Plan ID
}

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()
    plan = data.get('plan')

    if plan not in PRICE_IDS:
        return jsonify({'error': 'Invalid plan selected'}), 400

    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': PRICE_IDS[plan],
                    'quantity': 1,
                },
            ],
            mode='subscription',
            success_url=YOUR_DOMAIN + '/success.html',
            cancel_url=YOUR_DOMAIN + '/cancel.html',
        )
        return jsonify({'url': checkout_session.url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

if __name__ == '__main__':
    app.run(port=4242)
