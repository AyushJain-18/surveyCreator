import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutComponent =({children, onClose})=>{
   return(
    <StripeCheckout
            amount={500}
            name='Survey Generator Payement Gateway'
            description='pay 5$ for 5 credits'
            image = '/favicon.ico'
            // billingAddress
            // shippingAddress
            token={token => console.log(token)}
            stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY }
            //opened={onOpen}
            closed={onClose}
    >{children} 
    </StripeCheckout>
   ) 
}

export default StripeCheckoutComponent;