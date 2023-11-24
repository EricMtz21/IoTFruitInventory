import { db } from "./utils/firebase"
import { onValue, ref } from "firebase/database"
import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Outlet, Link } from "react-router-dom"
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';


function App() {
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
        let bananasCount = 0
        let broccoliCount = 0
        let carrotCount = 0
        let orangesCount = 0

        Object.values(data).forEach((product) => {
          applesCount += product.apples || 0
          bananasCount += product.bananas || 0
          broccoliCount += product.broccoli || 0
          carrotCount += product.carrots || 0
          orangesCount += product.orange || 0
        })

        setTotalApples(applesCount)
        setTotalBananas(bananasCount)
        setTotalBroccoli(broccoliCount)
        setTotalCarrots(carrotCount)
        setTotalOranges(orangesCount)

        setProduct(Object.values(data))
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Content />} />
          <Route
            path="graphs"
            element={
              <Chart
                totalApples={totalApples}
                totalBananas={totalBananas}
                totalBroccoli={totalBroccoli}
                totalCarrots={totalCarrots}
                totalOranges={totalOranges}
              />
            }
          />
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
        let bananasCount = 0
        let broccoliCount = 0
        let carrotCount = 0
        let orangesCount = 0

        Object.values(data).forEach((product) => {
          applesCount += product.apples || 0
          bananasCount += product.bananas || 0
          broccoliCount += product.broccoli || 0
          carrotCount += product.carrots || 0
          orangesCount += product.orange || 0
        })

        setTotalApples(applesCount)
        setTotalBananas(bananasCount)
        setTotalBroccoli(broccoliCount)
        setTotalCarrots(carrotCount)
        setTotalOranges(orangesCount)

        setProduct(Object.values(data))
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
      <Outlet />
    </div>
  )
}

const Chart = ({
  totalApples,
  totalBananas,
  totalCarrots,
}) => {
  const data = {
    labels: ["Apples", "Bananas", "Carrots"],
    datasets: [
      {
        data: [
          totalApples,
          totalBananas,   
          totalCarrots,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    
  };

  return (
    <div className="chart">
      <Pie data={data} options={options} />
    </div>
  );
};

export default App
