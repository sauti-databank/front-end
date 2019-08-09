import React from 'react'; 
import { ResponsiveBar } from "@nivo/bar"; 
import axios from 'axios';

// Creating class for Primary Income Chart so it can hold state and receive props
class PrimaryIncomeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      data: [],
      keys: ["Yes", "No"],
      color: "nivo",
      noPercentage: 0,
      yesPercentage: 0,
      noCount: 0,
      yesCount: 0,
    };
  }

  componentDidMount() {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/primary-income/all")
      .then(res => {
        //console.log('totalCount', res.data.length)
        this.setState({
            ...this.state,
            users: res.data,
            totalCount: res.data.length
          },
          () => {
            this.getPrimaryIncomeYes();
          }
        );
      })
  }

  getPrimaryIncomeYes = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/primary-income/yes/count")
      .then(res => {
        this.setState({
          ...this.state,
          yesCount: res.data
        },
        () => {
          this.getPrimaryIncomeNo();
        }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  getPrimaryIncomeNo = () => {
    axios
      .get("https://staging-sauti-labs-14.herokuapp.com/users/all/primary-income/no/count")
      .then(res => {
        this.setState({
          ...this.state,
          noCount: res.data
        }, () => {
          this.setPercentages();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  
  setPercentages = () => {
    const totalCount = this.state.totalCount;
    let noPercentage = Math.round((this.state.noCount / totalCount) * 100);
    let yesPercentage = Math.round((this.state.yesCount / totalCount) * 100);
    this.setState(
      {
        ...this.state,
        noPercentage: noPercentage,
        yesPercentage: yesPercentage
      },
      () => {
         this.setState({
          ...this.state,
          data: [
            {
              Primary_Income: "Yes",
              Yes: this.state.yesPercentage,
              YesColor: "hsl(65, 70%, 50%)"
            },
            {
              Primary_Income: "No",
              No: this.state.noPercentage,
              NoColor: "hsl(65, 70%, 50%)"
            },
          ]
        });
      }
    );
  };

  render() {
    return (
      <div className="Chart">
        <h2>Cross Border Trade As Primary Income</h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Primary_Income"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Produce As Primary Soure Of Income",
            legendPosition: "middle",
            legendOffset: 30
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "%",
            legendPosition: "middle",
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    );
  }
}

export default PrimaryIncomeChart;