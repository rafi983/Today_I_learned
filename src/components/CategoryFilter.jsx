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
  transition: 0.3s;

  ${({ isActive }) =>
    isActive &&
    `
    box-shadow: 0 0 0 3px white;
    transform: scale(1.05);
  `}

  &:hover {
    transform: scale(1.1) rotate(-2deg);
  }
`;

const AllButton = styled(CategoryButton)`
  background-image: linear-gradient(135deg, #3b82f6, #ef4444, #16a34a, #eab308);
`;

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <Aside>
      <List>
        <li>
          <AllButton
            isActive={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </AllButton>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name}>
            <CategoryButton
              isActive={selectedCategory === cat.name}
              color={cat.color}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </CategoryButton>
          </li>
        ))}
      </List>
    </Aside>
  );
}

export default CategoryFilter;
