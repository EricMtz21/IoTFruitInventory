import "./App.css"
import React, { useRef } from "react"

function App() {
  return (
    <div className="base-div">
      <div className="apple">
        <h1>Apple</h1>
        <h1>2</h1>
        <div className="fruit-container">
          <img
            src={process.env.PUBLIC_URL + "/imgs/apple.png"}
            alt="Logo"
            className="img-fruit"
          />
        </div>
      </div>
      <div className="banana">
        <h1>Banana</h1>
        <h1>3</h1>
        <div className="fruit-container">
          <img
            src={process.env.PUBLIC_URL + "/imgs/banana.png"}
            alt="Logo"
            className="img-fruit"
          />
        </div>
      </div>
      <div className="carrot">
        <h1>Carrot</h1>
        <h1>5</h1>
        <div className="fruit-container">
          <img
            src={process.env.PUBLIC_URL + "/imgs/carrot.png"}
            alt="Logo"
            className="img-fruit"
          />
        </div>
      </div>
      <div className="broccoli">
        <h1>Broccoli</h1>
        <h1>1</h1>
        <div className="fruit-container">
          <img
            src={process.env.PUBLIC_URL + "/imgs/brocoli.png"}
            alt="Logo"
            className="img-fruit"
          />
        </div>
      </div>
      <div className="orange">
        <h1>Orange</h1>
        <h1>0</h1>
        <div className="fruit-container">
          <img
            src={process.env.PUBLIC_URL + "/imgs/orange.png"}
            alt="Logo"
            className="img-fruit"
          />
        </div>
      </div>
    </div>
  )
}

export default App
