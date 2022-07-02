import styled from "styled-components";

export const SpinnerOverlay = styled.div`
   position: absolute;
   top: 40vh; left: 50%;
   transform: translate(-50%, -50%);
`;

export const SpinnerBackground = styled.div`
   height: 90px;
   width: 100px;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 10px;
   border: 1px solid grey;
   background-color: white;
`;

export const SpinnerContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 50px;
   height: 50px;
   border: 3px solid rgba(195, 195, 195, 0.6);
   border-radius: 50%;
   border-top-color: #636767;
   animation: spin 1s ease-in-out infinite;
   -webkit-animation: spin 1s ease-in-out infinite;
   @keyframes spin {
      to {
         -webkit-transform: rotate(360deg);
      }
   }
   @-webkit-keyframes spin {
      to {
         -webkit-transform: rotate(360deg);
      }
   }
`;