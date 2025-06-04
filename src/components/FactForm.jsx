import styled from "styled-components";

const Form = styled.form`
  background-color: #44403c;
  margin-bottom: 40px;
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

function FactForm() {
  return (
    <Form>
      <input placeholder="Share a fact with the world..." />
      <span>200</span>
      <input placeholder="Trustworthy source..." />
      <select>
        <option value="">Choose category:</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option>
      </select>
      <button>Post</button>
    </Form>
  );
}

export default FactForm;
