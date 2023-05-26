import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

function App() {
  const [amountWater, setAmountWater] = React.useState();

  const calculateCoffeeAmount = () => {
    return 0.06 * amountWater;
  };

  return (
    <div>
      <label htmlFor="amountWater">Veden määrä</label>
      <input name="amountWater" value={amountWater} onChange={event => setAmountWater(event.target.value)} />
      ml

      <label htmlFor="amountCoffee">Kahvin määrä</label>
      <output htmlFor="amountCoffee">{calculateCoffeeAmount()}</output>
      g
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
