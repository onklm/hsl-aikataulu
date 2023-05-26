import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

function App() {
  const [number1, setNumber1] = React.useState();
  const [number2, setNumber2] = React.useState();

  return (
    <dl>
      <dt>
        <input value={number1} onChange={event => setNumber1(event.target.value)} />
        ml
      </dt>
      <dd>vettä</dd>
      <dt>
        <span>{0.06 * number1}</span>
        g
      </dt>
      <dd>kahvia</dd>
      <dt>
      <span>{number1}</span>
      ml
      </dt>
      <dd>vettä</dd>
    </dl>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
