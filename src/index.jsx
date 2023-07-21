import React from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';

function App() {
  const [amountWater, setAmountWater, amountCoffee, setAmountCoffee] = React.useState();

  const calculateCoffeeAmount = () => {
    return 0.06 * amountWater;
  };

  return (
    <div>
      <p>
        <label for="suhde">vahvuus</label>
        <select name="suhde" id="suhde" onclick="Calculate()" onchange="Calculate()"><option value="13">1:13
          </option><option value="14">1:14
          </option><option value="15">1:15
          </option><option value="16" selected="">1:16
          </option><option value="17">1:17</option>
          <option value="18">1:18</option>
          <option value="19">1:19</option>
        </select>
      </p>

      <label htmlFor="amountWater">Veden määrä</label>
      <input name="amountWater" value={amountWater} onChange={event => setAmountWater(event.target.value)} />ml
      <label htmlFor="amountCoffee">kahvin määrä</label>
      <input name="amountCoffee" value ={amountCoffee} onchange={event => setAmountCoffee(event.target.value)} />g

    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />, );
