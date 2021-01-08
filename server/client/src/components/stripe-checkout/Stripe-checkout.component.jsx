import React from 'react';
import {connect} from 'react-redux';

import StripeCheckout from 'react-stripe-checkout';

import {startAddingCreditsAsync} from '../../store/authReducers/auth.action';

const StripeCheckoutComponent =({children, onClose, startAddingCredit})=>{
   return(
    <StripeCheckout
            amount={500}
            name='Survey Generator Payement Gateway'
            description='pay 5$ for 5 credits'
            image = '/favicon.ico'
            // billingAddress
            // shippingAddress
            token={token => startAddingCredit(token, 500)}
            stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY }
            //opened={onOpen}
            closed={onClose}
    >{children} 
    </StripeCheckout>
   ) 
}
const mapDispatchStateToProps = dispatch => ({startAddingCredit : (token,amount)=> dispatch(startAddingCreditsAsync(token, amount))});
export default connect(null, mapDispatchStateToProps)(StripeCheckoutComponent);