import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import { selectCurrentUser } from '../../store/user/user.selector';

import { BUTTON_TYPE } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles';

function PaymentForm() {
   const stripe = useStripe();
   const elements = useElements();
   const currentUser = useSelector(selectCurrentUser);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!stripe)
         return;

      const clientSecret = new URLSearchParams(window.location.search).get(
         'payment_intent_client_secret'
      );

      if (!clientSecret)
         return;

      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
         switch (paymentIntent.status) {
            case "succeeded":
               alert("Payment succeeded!");
               break;
            case "processing":
               alert("Your payment is processing.");
               break;
            case "requires_payment_method":
               alert("Your payment was not successful, please try again.");
               break;
            default:
               alert("Something went wrong.");
               break;
         }
      });
   }, [stripe]);

   const handlePayment = async (e) => {
      e.preventDefault();
      if (!stripe || !elements)
         return;

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/payment-success`
         }
      });

      if (error.type === 'card_error' || error.type === 'validation_error')
         alert(error.message);
      else
         alert('An unexpected error occured');

      setIsLoading(false);
   };

   return (
      <PaymentFormContainer>
         <h2>Fill payment details</h2>
         <FormContainer onSubmit={handlePayment}>
            <PaymentElement />
            <PaymentButton
               buttonType={BUTTON_TYPE.inverted}
               isLoading={isLoading}
            >
               Pay now
            </PaymentButton>
         </FormContainer>
      </PaymentFormContainer>
   );
}

export default PaymentForm;
