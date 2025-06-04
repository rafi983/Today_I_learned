import styled from "styled-components";
import { CATEGORIES } from "../data/sampleData";
import { useState } from "react";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SearchSortBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 240px;
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

const SortSelect = styled.select`
  padding: 14px 20px;
  font-size: 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: none;
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
  position: relative;

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

const ActionArea = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    border: none;
    background-color: ${({ theme }) => theme.vote};
    font-size: 18px;
    padding: 6px 12px;
    border-radius: 100px;
    color: inherit;
    font-family: inherit;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.background};
    }
  }

  a.share-btn {
    font-size: 16px;
    padding: 6px 12px;
    background-color: #1d9bf0;
    color: white;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    transition: 0.2s ease-in-out;
  }

  a.share-btn:hover {
    background-color: #0c7abf;
  }
`;

const TopBadge = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  background: #eab308;
  color: #1c1917;
  font-weight: bold;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 999px;
  font-family: "Coiny", sans-serif;
`;

function generateTweetUrl(fact) {
  const text = encodeURIComponent(`"${fact.text}"`);
  const url = encodeURIComponent(fact.source);
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}

function FactList({ facts, selectedCategory, onVote, searchText, setSearchText }) {
  const [sortBy, setSortBy] = useState("default");

  const filteredFacts = facts
    .filter((fact) =>
      selectedCategory === "all" ? true : fact.category === selectedCategory
    )
    .filter((fact) =>
      fact.text.toLowerCase().includes(searchText.toLowerCase())
    );

  const topFact = [...filteredFacts].reduce((top, curr) =>
      curr.votesInteresting > (top?.votesInteresting || 0) ? curr : top
    , null);

  const restFacts = filteredFacts.filter((fact) => fact.id !== topFact?.id);

  // Sort logic
  if (sortBy === "interesting") {
    restFacts.sort((a, b) => b.votesInteresting - a.votesInteresting);
  } else if (sortBy === "mindblowing") {
    restFacts.sort((a, b) => b.votesMindblowing - a.votesMindblowing);
  } else if (sortBy === "false") {
    restFacts.sort((a, b) => b.votesFalse - a.votesFalse);
  } else if (sortBy === "newest") {
    restFacts.sort((a, b) => b.createdIn - a.createdIn);
  } else if (sortBy === "oldest") {
    restFacts.sort((a, b) => a.createdIn - b.createdIn);
  }

  const renderFact = (fact, isTop = false) => {
    const category = CATEGORIES.find((c) => c.name === fact.category);
    return (
      <Fact key={fact.id}>
        {isTop && <TopBadge>🌟 Top Fact</TopBadge>}
        <p>
          {fact.text}
          <Source href={fact.source} target="_blank" rel="noopener noreferrer">
            (Source)
          </Source>
        </p>
        <Tag color={category?.color}>{fact.category}</Tag>
        <ActionArea>
          <button onClick={() => onVote(fact.id, "votesInteresting")}>
            👍 {fact.votesInteresting}
          </button>
          <button onClick={() => onVote(fact.id, "votesMindblowing")}>
            🤯 {fact.votesMindblowing}
          </button>
          <button onClick={() => onVote(fact.id, "votesFalse")}>
            ⛔ {fact.votesFalse}
          </button>
          <a
            href={generateTweetUrl(fact)}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            Share
          </a>
        </ActionArea>
      </Fact>
    );
  };

  return (
    <Wrapper>
      <SearchSortBar>
        <SearchInput
          type="text"
          placeholder="Search facts..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="interesting">Most 👍 Interesting</option>
          <option value="mindblowing">Most 🤯 Mindblowing</option>
          <option value="false">Most ⛔ False</option>
          <option value="newest">📅 Newest First</option>
          <option value="oldest">📅 Oldest First</option>
        </SortSelect>
      </SearchSortBar>

      <List>
        {topFact && renderFact(topFact, true)}
        {restFacts.map((fact) => renderFact(fact))}
      </List>
    </Wrapper>
  );
}

export default FactList;
