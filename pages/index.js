import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";

import TableComponent from "../components/TableComponent";

import { optionalAuth } from "../utils/ssr";
import { Component } from "react";

export const getServerSideProps = optionalAuth;

class HomePage extends Component {
  state = {
    labels: ["Net Income"],
    data: [0],
  };

  handleFormUpdate = (income, category, value) => {
    if (this.state.labels.includes(category)) {
      const index = this.state.labels.indexOf(category);
      var sum = parseInt(this.state.data[index]) - parseInt(value);
      var sumIncome = parseInt(this.state.data[0]) - parseInt(value);
      const arr = [...this.state.data];
      arr.splice(0, 1, sumIncome);
      arr.splice(index, 1, sum);
      this.setState({
        labels: this.state.labels,
        data: arr,
      });
    } else {
      const arr = [...this.state.data];
      if (this.state.data[0] == "") {
        var sumIncome = parseInt(income) - parseInt(value);
      } else {
        var sumIncome = parseInt(this.state.data[0]) - parseInt(value);
      }

      var intValue = -parseInt(value);
      arr.push(intValue);
      arr.splice(0, 1, sumIncome);
      this.setState({
        labels: this.state.labels.concat(category),
        data: arr,
      });
    }
  };

  handleResetUpdate = () => {
    this.setState({
      labels: ["Net Income"],
      data: [0],
    });
  };

  render() {
    return (
      <Layout>
        <div>
          <ChartFormComponent
            handleFormUpdate={this.handleFormUpdate.bind(this)}
          />
          <button onClick={this.handleResetUpdate}>Reset</button>
          <ChartComponent labels={this.state.labels} data={this.state.data} />
          <TableComponent
            category={this.state.labels}
            price={this.state.data}
          />
        </div>
      </Layout>
    );
  }
}

export default HomePage;
