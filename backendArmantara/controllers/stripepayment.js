const stripe = require("stripe")("sk_test_51NWNmJFqx5OP2nC4lRYNpmDeVlLFTJ4D2NYAWs9NU3uk9xoHBraATQkNzUODxg4X2V58D1RvaOpKwH1U3djrsk4p00dn6JanKr");
const uuid = require("uuid");
const product = require("../models/product");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS", products);
  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });

  // Convert the amount to cents by multiplying with 100
  const amountInCents = Math.round(amount * 100);

  const idempotencyKey = uuid.v4();

  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges
      .create({
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
      }, { idempotencyKey })
      .then(result => res.status(200).json(result))
      .catch(err => console.log(err));
  });
};
