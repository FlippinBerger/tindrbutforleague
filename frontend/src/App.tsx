import { FormEventHandler, useState } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > label {
    margin-top: 1rem;
  }

  & > button {
    margin-top: 1rem;
  }
`;

const Input = styled.input`
  height: 2rem;
  font-size: 1rem;
  border: none;
`;

const Select = styled.select`
  height: 2rem;
  font-size: 1rem;
`;

const Button = styled.button`
  height: 2rem;
  font-size: 1rem;
`;

const positions = ['top', 'jungle', 'mid', 'adc', 'support'] as const;
type Position = typeof positions[number];

function App() {
  const [username, setUsername] = useState('');
  const [mmr, setMmr] = useState('');
  const [positionPreference1, setPositionPreference1] = useState<Position>('top');
  const [positionPreference2, setPositionPreference2] = useState<Position>('jungle');

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <label>Username</label>
        <Input
          type="text"
          placeholder="l33t hax0r"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>MMR</label>
        <Input
          type="number"
          placeholder="69420"
          value={mmr}
          onChange={(e) => setMmr(e.target.value)}
        />
        <label>Position Preference 1</label>
        <Select
          value={positionPreference1}
          onChange={(e) => setPositionPreference1(e.target.value as Position)}
        >
          {positions
            .filter((position) => position !== positionPreference2)
            .map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
        </Select>
        <label>Position Preference 2</label>
        <Select
          value={positionPreference2}
          onChange={(e) => setPositionPreference2(e.target.value as Position)}
        >
          {positions
            .filter((position) => position !== positionPreference1)
            .map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
        </Select>
        <Button type="submit">Enter queue</Button>
      </Form>
      {formSubmitted &&
        JSON.stringify(
          {
            username,
            mmr,
            positionPreference1,
            positionPreference2,
          },
          null,
          2,
        )}
    </Layout>
  );
}

export default App;
