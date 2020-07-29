import React, { Component } from 'react';
import axios from 'axios';
import ListItems from '../Components/ListItems';
import LineChart from './LineChart';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            dataFromAPI: [],
            chartData: []
        }
    }

    componentDidMount() {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaW5tYXRpb24gV2ViIEFQSSJdLCJleHAiOjE1OTY0NDI5NDksImlhdCI6MTU5NTI0Mjk0OSwiaW5fcHJmIjpbIlJlYWN0VGVzdCJdLCJpbl91c3IiOiJSZWFjdFRlc3QiLCJpc3MiOiJpbm1hdGlvbiBXZWIgQVBJIiwibmJmIjoxNTk1MjQyOTQ5LCJzdWIiOiJSZWFjdFRlc3QifQ.XHd0ap5_kslNuVyn-OCLnaibImnIiWHGfEMj2KJrFcI'
            }
        };

        axios.get("https://vps04.inmation.eu:8002/api/v2/read?identifier=%2FSystem%2FCore%2FExamples%2FAssignment", config)
            .then(response => {
                const data = response.data.data[0]["v"];
                this.setState({ dataFromAPI: data });
            })
            .catch(error => console.log(error));
    }

    displayChart = (selectedItemPath) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaW5tYXRpb24gV2ViIEFQSSJdLCJleHAiOjE1OTY0NDI5NDksImlhdCI6MTU5NTI0Mjk0OSwiaW5fcHJmIjpbIlJlYWN0VGVzdCJdLCJpbl91c3IiOiJSZWFjdFRlc3QiLCJpc3MiOiJpbm1hdGlvbiBXZWIgQVBJIiwibmJmIjoxNTk1MjQyOTQ5LCJzdWIiOiJSZWFjdFRlc3QifQ.XHd0ap5_kslNuVyn-OCLnaibImnIiWHGfEMj2KJrFcI'
            }
        };

        axios.get(encodeURI(`https://vps04.inmation.eu:8002/api/v2/readhistoricaldata?start_time=2020-01-15T11:00:00Z&end_time=2020-02-15T11:00:00Z&identifier=${selectedItemPath}`), config)
            .then(response => {
                const data = response.data;
                const items = data.data.items[0].intervals;
                this.setState({ chartData: items });
            })
            .catch(error => console.log(error));
    }

    render() {
        const { chartData, dataFromAPI } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <ListItems dataReceived={dataFromAPI}
                                displayChart={this.displayChart} />
                        </div>

                        <div className="col-8">
                            <div className="mt-5" style={{ height: '900px', width: '100%' }}>
                                <LineChart chartData={chartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
