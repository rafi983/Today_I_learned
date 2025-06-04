import styled from "styled-components";
import Header from "./Header";
import FactForm from "./FactForm";
import CategoryFilter from "./CategoryFilter";
import FactList from "./FactList";

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 48px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

function AppLayout() {
  return (
    <Container>
      <Header />
      <FactForm />
      <Main>
        <CategoryFilter />
        <FactList />
      </Main>
    </Container>
  );
}

export default AppLayout;


