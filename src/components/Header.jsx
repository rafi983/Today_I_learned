import styled from "styled-components";
import logo from "/logo.png";

const HeaderWrapper = styled.header`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  h1 {
    font-size: 42px;
    text-transform: uppercase;
    font-family: "Coiny", sans-serif;
    margin-top: 6px;
    line-height: 1;
  }

  img {
    width: 68px;
    height: 68px;
  }
`;

const ShareButton = styled.button`
  border: none;
  font-family: "Coiny", sans-serif;
  font-size: 20px;
  padding: 20px 32px 17px;
  background-image: linear-gradient(135deg, #3b82f6, #ef4444, #16a34a, #eab308);
  color: inherit;
  border-radius: 100px;
  text-transform: uppercase;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Logo>
        <img src={logo} alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </Logo>
      <ShareButton>Share a fact</ShareButton>
    </HeaderWrapper>
  );
}

export default Header;
