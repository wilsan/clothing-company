import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import Button, { BUTTON_TYPE } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles';

function PaymentForm() {
   const stripe = useStripe();
   const elements = useElements();
   const amount = useSelector(selectCartTotal);
   const currentUser = useSelector(selectCurrentUser);
   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

   const handlePayment = async (e) => {
      e.preventDefault();
      if (!stripe || !elements)
         return;

      setIsProcessingPayment(true);

      const response = await fetch('/.netlify/functions/create-payment-intent', {
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ amount: amount * 100 })
      }).then(res => res.json());

      const { paymentIntent: { client_secret } } = response;
      const paymentResult = await stripe.confirmCardPayment(
         client_secret,
         {
            payment_method: {
               card: elements.getElement(CardElement),
               billing_details: {
                  name: currentUser ? currentUser.displayName : 'Guest'
               }
            }
         }
      );

      setIsProcessingPayment(false);

      if (paymentResult.error)
         console.log(paymentResult.error);
         // alert(paymentResult.error);
      else {
         if (paymentResult.paymentIntent.status === 'succeeded')
            alert('Payment Successful');
            
      }
   };

   return (
      <PaymentFormContainer>
         <h2>Card Payment</h2>
         <FormContainer onSubmit={handlePayment}>
            <CardElement />
            <PaymentButton
               buttonType={BUTTON_TYPE.inverted}
               isLoading={isProcessingPayment}
            >
               Pay now
            </PaymentButton>
         </FormContainer>
      </PaymentFormContainer>
   );
}

export default PaymentForm;
