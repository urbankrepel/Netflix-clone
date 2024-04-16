import stripe from "stripe";

export const stripeInstance = process.env.STRIPE_SECRET_KEY
  ? new stripe(process.env.STRIPE_SECRET_KEY)
  : null;
