import React from 'react';

import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [amountWater, setAmountWater] = React.useState();
  const [amountCoffee, setAmountCoffee] = React.useState();

  const calculateCoffeeAmount = () => {
    return 0.06 * amountWater;
    
}
  const changeAmountWater = (e) => {
    setAmountWater(e.target.value);
    setAmountCoffee(e.target.value * 0.06);

  
  }
  
    
  const changeAmountCoffee = (e) => {
    setAmountCoffee(e.target.value);
    setAmountWater(e.target.value * 16.6667)
  
  }
  return (
    <div>
      <label htmlFor="amountWater">Veden määrä</label>
      <input name="amountWater" value={amountWater} onChange={changeAmountWater} />ml
      <label htmlFor="amountCoffee">kahvin määrä</label>
      <input name="amountCoffee" value={amountCoffee} onChange={changeAmountCoffee} />g
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />,);