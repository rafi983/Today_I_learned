import styled from "styled-components";
import { initialFacts, CATEGORIES } from "../data/sampleData";

const List = styled.ul``;

const Fact = styled.li`
  font-size: 20px;
  line-height: 1.4;
  background-color: #44403c;
  margin-bottom: 16px;
  padding: 16px 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-end;
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
  flex-shrink: 0;
  display: flex;
  gap: 8px;

  button {
    border: none;
    background-color: #78716c;
    font-size: 18px;
    padding: 6px 12px;
    border-radius: 100px;
    color: inherit;
    font-family: inherit;
    font-weight: 600;

    &:hover {
      background-color: #292524;
    }
  }
`;

function FactList() {
  return (
    <List>
      {initialFacts.map((fact) => {
        const category = CATEGORIES.find((c) => c.name === fact.category);
        return (
          <Fact key={fact.id}>
            <p>
              {fact.text}
              <Source href={fact.source} target="_blank">
                (Source)
              </Source>
            </p>
            <Tag color={category?.color}>{fact.category}</Tag>
            <Votes>
              <button>👍 {fact.votesInteresting}</button>
              <button>🤯 {fact.votesMindblowing}</button>
              <button>⛔ {fact.votesFalse}</button>
            </Votes>
          </Fact>
        );
      })}
    </List>
  );
}

export default FactList;
