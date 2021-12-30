import '../CSS/App.css';
import axios from 'axios'
// import Chart from "react-google-charts";
import { useEffect, useState } from 'react';
import Chart from './Chart';

function App() {

  const [covidData, setCovidData] = useState([])
  const [index, setIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [chartData, setChartData] = useState({
    categories: [],
    TotalConfirmed: [],
    TotalDeaths: [],
    TotalRecovered: []
  })
  const BarsOnPage = 5
  // const LastPage = Math.ceil(covidData.length/BarsOnPage)

  useEffect(() => {
    axios("https://api.covid19api.com/summary")
      .then(res => setCovidData(res.data.Countries))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    setIndex(5 * page)
  }, [page])

  /* const dataElements = covidData.map(data => {
    return [data.Country, data.TotalConfirmed, data.TotalDeaths, data.TotalRecovered]
  }) */

  const dataElements = covidData.slice(index, index + BarsOnPage)

  useEffect(() => {
    setChartData({

      categories: dataElements.map(data => data.Country),
      TotalConfirmed: dataElements.map(data => data.TotalConfirmed),
      TotalDeaths: dataElements.map(data => data.TotalDeaths),
      TotalRecovered: dataElements.map(data => data.TotalRecovered)
    }
    )
  }, [index, covidData])

  console.log(page, currentPage)

  function previous() {
    if (page >= 1 && page === currentPage) {
      setPage(page - 1)
      setCurrentPage(page - 1)
    } else {
      setPage(page - 1)
    }
  }

  function next() {
    if (page > 3) {
      setPage(page + 1)
      setCurrentPage(page - 3)
    } else {
      setPage(page + 1)
    }

  }

  function setPageNo(pageNo) {
    setPage(pageNo - 1)
  }

  return (
    <div className="App">

      <div style={{width: "80%"}}>
        <Chart chartData={chartData} />
      </div>

      <nav aria-label="..." style={{ marginTop: "5%" }}>
        <ul className="pagination">
          <li className={`page-item ${page === 0 && "disabled"}`}>
            <button className="page-link" onClick={previous}>
              Previous
            </button>
          </li>
          <li className={`page-item ${page === currentPage && "active"}`}>
            <button className="page-link" onClick={() => setPageNo(currentPage + 1)}>
              {currentPage + 1}
            </button>
          </li>
          <li className={`page-item ${page === currentPage + 1 && "active"}`} aria-current="page">
            <button className="page-link" onClick={() => setPageNo(currentPage + 2)}>
              {currentPage + 2}
            </button>
          </li>
          <li className={`page-item ${page === currentPage + 2 && "active"}`}>
            <button className="page-link" onClick={() => setPageNo(currentPage + 3)}>
              {currentPage + 3}
            </button>
          </li>
          <li className={`page-item ${page === currentPage + 3 && "active"}`} aria-current="page">
            <button className="page-link" onClick={() => setPageNo(currentPage + 4)}>
              {currentPage + 4}
            </button>
          </li>
          <li className={`page-item ${page === currentPage + 4 && "active"}`}>
            <button className="page-link" onClick={() => setPageNo(currentPage + 5)}>
              {currentPage + 5}
            </button>
          </li>
          <li className={`page-item ${page + 1 === Math.ceil(covidData.length / 5) && "disabled"}`}>
            <button className="page-link" onClick={next}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
