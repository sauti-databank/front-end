/* NOLAN (09-18-19 | 1:24pm):
  Given Google Charts' potential and the existence of a React Wrapper, I've decided to test the candidate
  library using the AgeChart.js file to see if it really is a better charting library to implement.
*/

import React from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

export default class AgeChartGoogle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      totalCount: 0,
      data: [],
      keys: ["Teens", "Twenties", "Thirties", "Forties", "Fifties", "Sixties"],
      teensPercentage: 0,
      twentiesPercentage: 0,
      thirtiesPercentage: 0,
      fortiesPercentage: 0,
      fiftiesPercentage: 0,
      sixtiesPercentage: 0,
      teensCount: 0,
      twentiesCount: 0,
      thirtiesCount: 0,
      fortiesCount: 0,
      fiftiesCount: 0,
      sixtiesCount: 0
    };
  };

  componentDidMount() {
    // this.props.GetDropDownDefault(this.props.name);

    axios
      .get(`${process.env.REACT_APP_BE_URL}/age/all`)
      .then(res => this.setState({
        ...this.state,
        users: res.data,
        totalCount: res.data.length,
        teensCount: res.data.reduce((n, user) => {
          return n + (user.age == "10-19");
        }, 0),
        twentiesCount: res.data.reduce((n, user) => {
          return n + (user.age == "20-29");
        }, 0),
        thirtiesCount: res.data.reduce((n, user) => {
          return n + (user.age == "30-39");
        }, 0),
        fortiesCount: res.data.reduce((n, user) => {
          return n + (user.age == "40-49");
        }, 0),
        fiftiesCount: res.data.reduce((n, user) => {
          return n + (user.age = "50-59");
        }, 0),
        sixtiesCount: res.data.reduce((n, user) => {
          return n + (user.age = "60-69");
        }, 0)
      }, () => {
        this.setPercentage();
      }));
  };

  setPercentage = () => {
    const totalCount = this.state.totalCount;
    let teensPercentage = Math.round(
      (this.state.teensCount / totalCount) * 100
    );
    let twentiesPercentage = Math.round(
      (this.state.twentiesCount / totalCount) * 100
    );
    let thirtiesPercentage = Math.round(
      (this.state.thirtiesCount / totalCount) * 100
    );
    let fortiesPercentage = Math.round(
      (this.state.fortiesCount / totalCount) * 100
    );
    let fiftiesPercentage = Math.round(
      (this.state.fiftiesCount / totalCount) * 100
    );
    let sixtiesPercentage = Math.round(
      (this.state.sixtiesCount / totalCount) * 100
    );

    this.setState({
      ...this.state,
      teensPercentage: teensPercentage,
      twentiesPercentage: twentiesPercentage,
      thirtiesPercentage: thirtiesPercentage,
      fortiesPercentage: fortiesPercentage,
      fiftiesPercentage: fiftiesPercentage,
      sixtiesPercentage: sixtiesPercentage
    }, () => {
      this.setState({
        ...this.state,
        data: [
          {
            age: "10-19",
            Teens: this.state.teensPercentage,
          }, {
            age: "20-29",
            Twenties: this.state.twentiesPercentage,
          }, {
            age: "30-39",
            Thirties: this.state.thirtiesPercentage,
          }, {
            age: "40-49",
            Forties: this.state.fortiesPercentage,
          }, {
            age: "50-59",
            Fifties: this.state.fiftiesPercentage,
          }, {
            age: "60-69",
            Sixties: this.state.sixtiesPercentage,
          }
        ]
      });
    });
  };

  render() {
    return (
      <div>
        <Chart
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          spreadSheetUrl="https://docs.google.com/spreadsheets/d/1wrr_uM3vYwH5mpt1EXA236leFAM7DwYriLAp4i1CP-s/edit#gid=0"
          spreadSheetQueryParameters={{
            headers: 1,
            query: 'SELECT A B'
          }}
          options={{
            title: 'Age',
            chartArea: { width: '50%' },
            hAxis: {
              title: 'Age Range Population',
              minValue: 0
            },
            vAxis: {
              title: 'Age Ranges',
            }
          }}
        />
      </div>
    )
  }
};