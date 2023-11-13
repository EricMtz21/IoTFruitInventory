import "./App.css"
import { db } from "./utils/firebase"
import { onValue, ref } from "firebase/database"
import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Outlet, Link } from "react-router-dom"
import { DAPage } from "./components/graphs"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Content />} />
          <Route path="graphs" element={<DAPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function NavBar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/graphs">Data Analysis</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

function Content() {
  const [product, setProduct] = useState([])
  const [totalApples, setTotalApples] = useState(0)
  const [totalBananas, setTotalBananas] = useState(0)
  const [totalBroccoli, setTotalBroccoli] = useState(0)
  const [totalCarrots, setTotalCarrots] = useState(0)
  const [totalOranges, setTotalOranges] = useState(0)
  useEffect(() => {
    const query = ref(db, "productos")
    return onValue(query, (snapshot) => {
      const data = snapshot.val()

      if (snapshot.exists()) {
        let applesCount = 0

        Object.values(data).forEach((product) => {
          applesCount += product.apples || 0
          setProduct((productos) => [...productos, product])
        })

        setTotalApples(applesCount)
      }
      if (snapshot.exists()) {
        let bananasCount = 0

        Object.values(data).forEach((product) => {
          bananasCount += product.bananas || 0
          setProduct((productos) => [...productos, product])
        })

        setTotalBananas(bananasCount)
      }
      if (snapshot.exists()) {
        let broccoliCount = 0

        Object.values(data).forEach((product) => {
          broccoliCount += product.broccoli || 0
          setProduct((productos) => [...productos, product])
        })

        setTotalBroccoli(broccoliCount)
      }
      if (snapshot.exists()) {
        let carrotCount = 0

        Object.values(data).forEach((product) => {
          carrotCount += product.carrots || 0
          setProduct((productos) => [...productos, product])
        })

        setTotalCarrots(carrotCount)
      }
      if (snapshot.exists()) {
        let orangesCount = 0

        Object.values(data).forEach((product) => {
          orangesCount += product.orange || 0
          setProduct((productos) => [...productos, product])
        })

        setTotalOranges(orangesCount)
      }
    })
  }, [])

  return (
    <div className="base-div">
      <div className="apple">
        <h1>Apple</h1>
        <h1>{totalApples}</h1>
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
        <h1>{totalBananas}</h1>
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
        <h1>{totalCarrots}</h1>
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
        <h1>{totalBroccoli}</h1>
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
        <h1>{totalOranges}</h1>
        <div className="fruit-container">
          <img
            src={process.env.PUBLIC_URL + "/imgs/orange.png"}
            alt="Logo"
            className="img-fruit"
          />
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default App
