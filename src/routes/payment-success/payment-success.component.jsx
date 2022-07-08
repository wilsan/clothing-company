import { Link } from "react-router-dom";

import { MessageContainer } from "./payment-success.styles";

function PaymentSuccess() {
   return (
      <MessageContainer>
         <h1>Payment Successful!</h1>
         <Link to='/shop'>Go back</Link>
      </MessageContainer>
   );
}

export default PaymentSuccess;