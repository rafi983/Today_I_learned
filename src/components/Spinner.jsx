import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px 0;
`;

const SpinnerCircle = styled.div`
  width: 48px;
  height: 48px;
  border: 6px solid #78716c;
  border-top-color: #fafaf9;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinnerCircle />
    </SpinnerWrapper>
  );
}

export default Spinner;
