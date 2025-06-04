import styled from "styled-components";
import { CATEGORIES } from "../data/sampleData";

const Aside = styled.aside``;

const List = styled.ul``;

const CategoryButton = styled.button`
  width: 100%;
  padding: 16px 0 13px;
  margin-bottom: 16px;
  font-family: "Coiny", sans-serif;
  font-size: 17px;
  text-transform: uppercase;
  border: none;
  border-radius: 100px;
  color: inherit;
  background-color: ${({ color }) => color || "#44403c"};

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }
`;

function CategoryFilter() {
  return (
    <Aside>
      <List>
        <li>
          <CategoryButton>All</CategoryButton>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name}>
            <CategoryButton color={cat.color}>{cat.name}</CategoryButton>
          </li>
        ))}
      </List>
    </Aside>
  );
}

export default CategoryFilter;
