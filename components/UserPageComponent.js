import React, { Component } from "react";
import ChartComponent from "../components/ChartComponent";
import PieChartExpensesComponent from "../components/PieChartExpensesComponent";
import PieChartIncomeComponent from "../components/PieChartIncomeComponent";
import TableComponent from "../components/TableComponent";
import UserPageFormComponent from "../components/UserPageFormComponent";
import { Spinner, Jumbotron } from "react-bootstrap";

export default class UserPageComponent extends Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  state = {
    dataLoaded: false,
    selectMonth: 1,
    selectYear: 2020,
  };

  componentDidMount() {
    this.loadData(this.state.selectMonth, this.state.selectYear);
  }

  update(month, year) {
    this.setState({
      dataLoaded: false,
      selectMonth: month,
      selectYear: year,
    });
    this.loadData(this.state.selectMonth, this.state.selectYear);
  }

  handleChange = (e) => {
    this.loadData(e.target.value, this.state.selectYear);
  };

  handleChange2 = (e) => {
    this.loadData(this.state.selectMonth, e.target.value);
  };

  loadData = (month, year) => {
    this.setState({
      dataLoaded: false,
      selectMonth: month,
      selectYear: year,
    });

    fetch("http://localhost:3000/api/userbudgets")
      .then((res) => res.json())
      .then(
        (result) => {
          var out;
          for (var i = 0; i < result.data.length; i++) {
            if (
              result.data[i].email == this.props.user.email &&
              result.data[i].month == month &&
              result.data[i].year == year
            ) {
              out = result.data[i];
            }
          }
          if (out) {
            this.setState({
              dataLoaded: true,
              dataFound: true,
              selectMonth: month,
              selectYear: year,
              labels: out.labels,
              data: out.data,
            });
          } else {
            this.setState({
              dataLoaded: true,
              dataFound: false,
              selectMonth: month,
              selectYear: year,
            });
          }
        },
        (error) => {
          this.setState({
            dataLoaded: false,
            selectMonth: month,
            selectYear: year,
            labels: ["Income", "Net Income"],
            data: [0, 0],
            error,
          });
        }
      );
  };

  render() {
    return (
      <div>
        {this.state.dataLoaded ? (
          <div>
            {this.state.dataFound ? (
              <div>
                <select
                  value={this.state.selectMonth}
                  onChange={this.handleChange}
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>

                <select
                  value={this.state.selectYear}
                  onChange={this.handleChange2}
                >
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                </select>

                <TableComponent
                  category={this.state.labels}
                  price={this.state.data}
                />
                <ChartComponent
                  labels={this.state.labels}
                  data={this.state.data}
                />
                <PieChartIncomeComponent
                  labels={this.state.labels}
                  data={this.state.data}
                />
                <PieChartExpensesComponent
                  labels={this.state.labels}
                  data={this.state.data}
                />
              </div>
            ) : (
              <div>
                <select
                  value={this.state.selectMonth}
                  onChange={this.handleChange}
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>

                <select
                  value={this.state.selectYear}
                  onChange={this.handleChange2}
                >
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                </select>

                <h3>No Data for this month :(</h3>
                <br />
                <h4>Would you like to add some?</h4>
                <Jumbotron>
                  <UserPageFormComponent
                    user={this.props.user}
                    month={this.state.selectMonth}
                    year={this.state.selectYear}
                    update={this.update}
                  />
                </Jumbotron>
              </div>
            )}
          </div>
        ) : (
          <Spinner animation="border" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}
