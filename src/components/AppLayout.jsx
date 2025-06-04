import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import FactForm from "./FactForm";
import CategoryFilter from "./CategoryFilter";
import FactList from "./FactList";
import Spinner from "./Spinner";
import { initialFacts } from "../data/sampleData";
import toast from "react-hot-toast";

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

const LOCAL_STORAGE_KEY = "til_facts";

function AppLayout({ onToggleTheme }) {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    setTimeout(() => {
      setFacts(stored ? JSON.parse(stored) : initialFacts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(facts));
    }
  }, [facts, loading]);

  function handleAddFact(newFact) {
    setFacts((prev) => [newFact, ...prev]);
    toast.success("Fact posted successfully!");
  }

  function handleVote(id, type) {
    setFacts((prev) =>
      prev.map((fact) =>
        fact.id === id ? { ...fact, [type]: fact[type] + 1 } : fact
      )
    );
    toast.success("Vote recorded");
  }

  if (loading) return <Spinner />;

  return (
    <Container>
      <Header
        onToggleForm={() => setShowForm((s) => !s)}
        onToggleTheme={onToggleTheme}
      />
      {showForm && <FactForm onAddFact={handleAddFact} />}
      <Main>
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <FactList
          facts={facts}
          selectedCategory={selectedCategory}
          onVote={handleVote}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Main>
    </Container>
  );
}

export default AppLayout;
