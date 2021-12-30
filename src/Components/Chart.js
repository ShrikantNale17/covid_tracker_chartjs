import { React } from 'react'
// import ReactApexChart from 'react-apexcharts'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2"
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Chart(props) {

    const { categories, TotalConfirmed, TotalDeaths, TotalRecovered } = props.chartData

    const state = {
        labels: categories,
        datasets: [
            {
                label: 'Total Confirmed',
                backgroundColor: 'rgba(39, 140, 245, 0.56)',
                // borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: TotalConfirmed
            },
            {
                label: 'Total Deaths',
                backgroundColor: 'rgba(245, 39, 39, 0.89)',
                // borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: TotalDeaths
            },
            {
                label: 'Total Recovered',
                backgroundColor: 'rgba(39, 245, 88, 0.89)',
                // borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: TotalRecovered
            }
        ]
    }

    return (
        <div>
            <Bar
                data={state}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Covid Data Visualization',
                            font: {
                                size: 25,
                                weight: 'bold'
                            }
                        },
                        legend: {
                            position: 'top',
                            align: 'end'
                        }
                    },/* 
                    legend: {
                        display: true,
                        position: 'right'
                        
                    }, */
                    scales: {
                        yAxes: {
                            title: {
                                display: true,
                                text: 'No. of Persons',
                                font: {
                                    size: 15,
                                    weight: 'bold'
                                }
                            },
                            ticks: {
                                precision: 0
                            }
                        },
                        xAxes: {
                            title: {
                                display: true,
                                text: 'Countries',
                                font: {
                                    size: 15,
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default Chart