const Stripe  = require('stripe')(process.env.SECRET_KEY);
const Express = require('express');

const authMiddelware = require('../middelware/authenticate.middelware').authenticateMiddelware;
const User = require('../model/user.model');
const Route = Express.Router();

Route.post('/api/addCredit', authMiddelware, async (req, res) => {
    let userWithCustumerId;
    let userWithNewCredits;
        try{
            if(!req.user.stripe_customer_id){
            const customer = await Stripe.customers.create({
                description: 'Custumer discription',
                email: req.body.token.email,
                name: req.user.display_name,
                source: req.body.token.id,
                address:{
                    city:"mumbai",
                    country:"india",
                    line1:"unr",
                    line2:"thane",
                    postal_code:"421005",
                    state:"maharashtra"},
              });
              userWithCustumerId = await User.findByIdAndUpdate(req.user._id,{stripe_customer_id: customer.id}, {new: true})
          }    
       const charge =  await Stripe.charges.create({
            currency: 'usd',
            description: 'for 5 new credits',
            amount: req.body.amount,
            shipping:{
                name: 'dummy_name',
                address:{
                    city:"Tioga",
                    country:"US",
                    line1:"unr",
                    line2:"thane",
                    postal_code:"58852",
                    state:"North Dakota"
                }
            },
            customer: req.user.stripe_customer_id? req.user.stripe_customer_id :userWithCustumerId.stripe_customer_id,
            receipt_email: req.body.token.email   
        })
        userWithNewCredits = await User.findByIdAndUpdate(req.user._id,{credit: req.user.credit+5}, {new: true})
        } catch(error){
            console.log('//Error// \n', error);
        }

    res.send(userWithNewCredits);
})

module.exports = Route
