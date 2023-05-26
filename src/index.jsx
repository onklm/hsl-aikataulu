import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

function App() {
  const [number1, setNumber1] = React.useState();
  const [number2, setNumber2] = React.useState();

  return (
    <div>
      <label for="amountWater">veden määrä</label>
      <input name="amountWater" value={number1} onChange={event => setNumber1(event.target.value)} />
      ml
      <label for="amountCoffee">kahvin määrä</label>
      <output for="amountCoffee">{0.06 * number1}</output>     
      g
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
