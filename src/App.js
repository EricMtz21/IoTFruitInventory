import { db } from "./utils/firebase"
import { onValue, ref } from "firebase/database"
import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Outlet, Link } from "react-router-dom"
import Chart from "react-google-charts"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Content />} />
          <Route path="graphs" element={<MyChar />} />
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

function loadGoogleCharts() {
  return new Promise((resolve) => {
    // Cargar la API de Google Charts
    window.google.charts.load("current", { packages: ["corechart"] })

    // Establecer un callback para ejecutar cuando se carga la API de Google Charts
    window.google.charts.setOnLoadCallback(() => {
      resolve()
    })
  })
}

function MyChar() {
  useEffect(() => {
    // Llamar al servicio para cargar Google Charts
    loadGoogleCharts().then(() => {
      // Ahora `google` está disponible y puedes usarlo para dibujar el gráfico
      drawChart()
    })
  }, [])

  function drawChart() {
    // Create the data table.
    var data = new window.google.visualization.DataTable()

    data.addColumn("string", "Fruit")
    data.addColumn("number", "Quantity")
    data.addRows([
      ["Apple", 7],
      ["Banana", 5],
      ["Carrot", 10],
      ["Broccoli", 3],
      ["Orange", 2],
    ])

    // Set chart options
    var options = {
      title: "Fruits and Vegetables picked",
      width: 700,
      height: 500,
    }

    // Instantiate and draw our chart, passing in some options.
    var chart = new window.google.visualization.PieChart(
      document.getElementById("chart_div")
    )
    chart.draw(data, options)
  }

  return (
    <div id="chart_div" className="chart-div"></div>
  )
}

export default App
