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
  const [percentage, setPercentage] = useState(0)

  const tip = (bill * percentage) / 100

  function handleReset() {
    setBill('')
    setPercentage(0)
  }

  return (
    <div className="tip-container">
      <h1>Calculate Tip</h1>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage} onSelect={setPercentage}>
        Select Tip Percentage
      </SelectPercentage>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  )
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        placeholder="0.00"
        value={bill}
        onChange={(e) => onSetBill(e.target.value === '' ? '' : parseFloat(e.target.value))}
      />
    </div>
  )
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div className="select-container">
      <label>{children}</label>
      <div className="select-wrapper">
        <select
          value={percentage}
          onChange={(e) => onSelect(Number(e.target.value))}
        >
          <option value="0">0%</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
          <option value="20">20%</option>
        </select>
      </div>
    </div>
  )
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${(bill + tip).toFixed(2)} (${bill.toFixed(2)} + ${tip.toFixed(2)} tip)
    </h3>
  )
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>
}

export default App
