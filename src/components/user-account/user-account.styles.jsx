import styled from "styled-components";

import { ReactComponent as UserSVG } from '../../assets/user-icon.svg';

export const UserIcon = styled(UserSVG)`
   width: 18px;
   height: 18px;
   margin-right: 3px;
`;

export const UserAccountContainer = styled.div`
   display: flex;
   align-items: center;
   border: 1px solid grey;
   padding: 2px 7px;
   border-radius: 3px;
`;
