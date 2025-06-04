import { useState } from "react";
import styled from "styled-components";
import { CATEGORIES } from "../data/sampleData";

const FormWrapper = styled.div`
  margin-bottom: 40px;
`;

const Form = styled.form`
  background-color: #44403c;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 16px;

  input,
  select {
    background-color: #78716c;
    border: none;
    border-radius: 100px;
    padding: 16px;
    font-size: 18px;
    color: inherit;
    font-family: inherit;
  }

  input::placeholder {
    color: #a8a29e;
  }

  input:first-child {
    flex-grow: 1;
  }

  span {
    font-weight: 600;
    font-size: 18px;
    margin-right: 18px;
    color: ${({ limitExceeded }) => (limitExceeded ? "#ef4444" : "inherit")};
  }

  button {
    font-size: 20px;
    padding: 20px 32px 17px;
    background-image: linear-gradient(135deg, #3b82f6, #ef4444, #16a34a, #eab308);
    color: inherit;
    border-radius: 100px;
    border: none;
    font-family: "Coiny", sans-serif;
    text-transform: uppercase;

    &:hover {
      transform: scale(1.1) rotate(-2deg);
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: stretch;

    input,
    select {
      width: 100%;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-weight: 600;
  font-size: 16px;
  margin-top: 12px;
  padding: 0 24px;
`;

function FactForm({ onAddFact }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const maxLength = 200;
  const charsLeft = maxLength - text.length;

  function isValidHttpUrl(string) {
    return string.startsWith("http://") || string.startsWith("https://");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!text || !source || !category) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (text.length > maxLength) {
      setErrorMessage(`Fact must be under ${maxLength} characters.`);
      return;
    }

    if (!isValidHttpUrl(source)) {
      setErrorMessage("Source must be a valid URL starting with http:// or https://");
      return;
    }

    const newFact = {
      id: Date.now(),
      text,
      source,
      category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: new Date().getFullYear(),
    };

    onAddFact(newFact);

    // Reset form
    setText("");
    setSource("");
    setCategory("");
    setErrorMessage("");
  }

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit} limitExceeded={text.length > maxLength}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a fact with the world..."
        />
        <span>{charsLeft}</span>
        <input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Trustworthy source..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Choose category:</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Post</button>
      </Form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FormWrapper>
  );
}

export default FactForm;
