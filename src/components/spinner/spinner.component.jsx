import { SpinnerContainer, SpinnerOverlay, SpinnerBackground } from "./spinner.styles";

function Spinner() {
   return (
      <SpinnerOverlay>
         <SpinnerBackground>
            <SpinnerContainer />
         </SpinnerBackground>
      </SpinnerOverlay>
   );
}

export default Spinner;
