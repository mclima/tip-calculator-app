import './styles.css'
import { useState } from 'react'

function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  )
}

function TipCalculator() {
  const [bill, setBill] = useState('')
  const [percentage, setPercentage] = useState(15)
  const [people, setPeople] = useState(1)

  const tip = (bill * percentage) / 100
  const total = bill + tip
  const perPerson = total / people

  function handleReset() {
    setBill('')
    setPercentage(15)
    setPeople(1)
  }

  return (
    <div className="tip-container">
      <div className="header">
        <h1>Tip Calculator</h1>
        <p className="subtitle">Calculate tips and split bills easily</p>
      </div>
      
      <div className="input-section">
        <BillInput bill={bill} onSetBill={setBill} />
        <SelectPercentage percentage={percentage} onSelect={setPercentage} />
        <PeopleInput people={people} onSetPeople={setPeople} />
      </div>

      {bill > 0 && (
        <div className="results-section">
          <Output bill={bill} tip={tip} total={total} perPerson={perPerson} people={people} />
          <Reset onReset={handleReset} />
        </div>
      )}
    </div>
  )
}

function BillInput({ bill, onSetBill }) {
  return (
    <div className="input-group">
      <label>Bill Amount</label>
      <div className="input-wrapper">
        <span className="currency-symbol">$</span>
        <input
          type="number"
          inputMode="decimal"
          step="1.00"
          min="0"
          placeholder="0.00"
          value={bill}
          onChange={(e) => onSetBill(e.target.value === '' ? '' : parseFloat(e.target.value))}
        />
      </div>
    </div>
  )
}

function SelectPercentage({ percentage, onSelect }) {
  return (
    <div className="input-group">
      <label>Tip Percentage</label>
      <div className="select-wrapper">
        <select
          value={percentage}
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          <option value="0">0%</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
          <option value="18">18%</option>
          <option value="20">20%</option>
          <option value="25">25%</option>
        </select>
      </div>
    </div>
  )
}

function PeopleInput({ people, onSetPeople }) {
  return (
    <div className="input-group">
      <label>Number of People</label>
      <input
        type="number"
        min="1"
        value={people}
        onChange={(e) => onSetPeople(e.target.value === '' ? 1 : parseInt(e.target.value))}
      />
    </div>
  )
}

function Output({ bill, tip, total, perPerson, people }) {
  return (
    <div className="output">
      <div className="output-row">
        <span className="output-label">Bill Amount:</span>
        <span className="output-value">${bill.toFixed(2)}</span>
      </div>
      <div className="output-row">
        <span className="output-label">Tip Amount:</span>
        <span className="output-value">${tip.toFixed(2)}</span>
      </div>
      <div className="output-row total">
        <span className="output-label">Total:</span>
        <span className="output-value">${total.toFixed(2)}</span>
      </div>
      {people > 1 && (
        <div className="output-row per-person">
          <span className="output-label">Per Person:</span>
          <span className="output-value">${perPerson.toFixed(2)}</span>
        </div>
      )}
    </div>
  )
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>
}

export default App
