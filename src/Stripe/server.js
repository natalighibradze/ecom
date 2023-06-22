import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
const stripe = new Stripe(
  "sk_test_51NH8WjCrzqfWmI5AhvAd3EQjrdefJCrRDnARBcZluCuP4ej9CrNsqA9KZpzx7EjxE7pMJLSMtkk5RhZqidHXZOMm00o4iP1fSd"
);
// Create a checkout session in Stripe
app.post("/checkout", async (req, res) => {
  try {
    const { items } = req.body;
    // Create a product in Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          description: item.description,
          images: item.images,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.send(
      JSON.stringify({
        url: session.url,
      })
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the checkout session" });
  }
});
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});