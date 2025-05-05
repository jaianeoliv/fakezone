import styled from 'styled-components';

export const XPButton = styled.button`
  margin-right: 10px;
  border-radius: 3px;
   margin-top: 20px; 
  align-self: flex-start;
  border: 1px solid #707070;
  padding: 3px 15px;
  background: linear-gradient(
    to bottom,
    #f2f2f2 0%,
    #ebebeb 42%,
    #dddddd 47%,
    #cfcfcf 100%
  );
  transition: all 0.1s ease-in;
  cursor: pointer;
  font-family: inherit;

  &:hover,
  &:focus {
    outline: none;
    background: linear-gradient(
      to bottom,
      #eaf6fd 0%,
      #d9f0fc 42%,
      #bee6fd 47%,
      #bce5fc 58%,
      #a7d9f5 100%
    );
    border: 1px solid #3c7fb1;
    box-shadow: 0 0 3px #a7d9f5;
  }

  &:active {
    box-shadow:
      inset 0 -1px 6px rgba(0, 0, 0, 0.2),
      inset 0 -0.7em #bee6fd,
      0 0 3px #a7d9f5;
  }
`;
