import styled from "styled-components";
import { CATEGORIES } from "../data/sampleData";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 20px;
  font-size: 18px;
  border-radius: 100px;
  border: none;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: #a1a1aa;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Fact = styled.li`
  font-size: 20px;
  line-height: 1.4;
  background-color: ${({ theme }) => theme.card};
  padding: 16px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Tag = styled.span`
  text-transform: uppercase;
  font-size: 14px;
  font-family: "Coiny", sans-serif;
  padding: 3px 10px;
  border-radius: 100px;
  background-color: ${({ color }) => color || "#44403c"};
`;

const Source = styled.a`
  color: #a8a29e;
  margin-left: 12px;

  &:hover {
    color: #3b82f6;
  }
`;

const Votes = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;

  button {
    border: none;
    background-color: ${({ theme }) => theme.vote};
    font-size: 18px;
    padding: 6px 12px;
    border-radius: 100px;
    color: inherit;
    font-family: inherit;
    font-weight: 600;

    &:hover {
      background-color: ${({ theme }) => theme.background};
    }
  }
`;

function FactList({ facts, selectedCategory, onVote, searchText, setSearchText }) {
  const filteredFacts = facts
    .filter((fact) =>
      selectedCategory === "all" ? true : fact.category === selectedCategory
    )
    .filter((fact) =>
      fact.text.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Search facts..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <List>
        {filteredFacts.map((fact) => {
          const category = CATEGORIES.find((c) => c.name === fact.category);
          return (
            <Fact key={fact.id}>
              <p>
                {fact.text}
                <Source href={fact.source} target="_blank" rel="noopener noreferrer">
                  (Source)
                </Source>
              </p>
              <Tag color={category?.color}>{fact.category}</Tag>
              <Votes>
                <button onClick={() => onVote(fact.id, "votesInteresting")}>
                  👍 {fact.votesInteresting}
                </button>
                <button onClick={() => onVote(fact.id, "votesMindblowing")}>
                  🤯 {fact.votesMindblowing}
                </button>
                <button onClick={() => onVote(fact.id, "votesFalse")}>
                  ⛔ {fact.votesFalse}
                </button>
              </Votes>
            </Fact>
          );
        })}
      </List>
    </Wrapper>
  );
}

export default FactList;
