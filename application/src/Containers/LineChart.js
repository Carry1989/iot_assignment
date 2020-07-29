import React, { Component } from 'react';
import Chart from 'chart.js';

class LineChart extends Component {
    constructor() {
        super();
        this.chartRef = React.createRef();
    }

    componentDidUpdate() {
        const { chartData } = this.props;
        if (chartData && chartData.length > 0) {
            const labels = chartData.map(interval => {
                const timeValue = interval.T;
                return new Date(timeValue);
            });
            const chartDataMapped = chartData.map(interval => interval.V);
            console.log("Time labels: ", labels);
            console.log("Data values: ", chartDataMapped);

            const data = {
                labels: labels,
                datasets: [{
                    fill: false,
                    label: 'Data',
                    data: chartDataMapped,
                    borderColor: '#fe8b36',
                    backgroundColor: '#fe8b36',
                    lineTension: 0
                }]
            };

            const options = {
                type: 'line',
                data: data,
                options: {
                    fill: false,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Date",
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "Values",
                            }
                        }]
                    }
                }
            };

            this.myChart = new Chart(this.chartRef.current, options);
        }
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default LineChart;