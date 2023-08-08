const stripe = require("stripe")("sk_test_51NWNmJFqx5OP2nC4lRYNpmDeVlLFTJ4D2NYAWs9NU3uk9xoHBraATQkNzUODxg4X2V58D1RvaOpKwH1U3djrsk4p00dn6JanKr");
const uuid = require("uuid");
const { Order, ProductCart } = require("../models/order");

exports.makepayment = async (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS", products);
  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });

  // Convert the amount to cents by multiplying with 100
  const amountInCents = Math.round(amount * 100);

  const idempotencyKey = uuid.v4();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const result = await stripe.charges.create({
      amount: amountInCents,
      currency: 'cad',
      customer: customer.id,
      receipt_email: token.email,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip
        }
      }
    }, { idempotencyKey });

    // Create a new order in the database
    const order = new Order({
      products: products.map(p => {
        return {
          product: p._id,
          name: p.name,
          count: p.quantity,
          price: p.price
        };
      }),
      transaction_id: result.id,
      amount: result.amount / 100, // Convert back to dollars
      address: `${token.card.address_line1}, ${token.card.address_line2}, ${token.card.address_city}, ${token.card.address_country}, ${token.card.address_zip}`,
      status: "Received",
      user: token.userId // Assuming you have the user ID in the token
    });

    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Failed to save your order in DB",
    });
  }
};
