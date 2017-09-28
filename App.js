import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import { Bar } from 'react-native-pathjs-charts'
import Moment from 'moment'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    this.refs.accountIdInput.blur();
    this.fetchData(this.state.text);
  }

  fetchData(accountID) {
      console.log(`Fetching data for ${accountID}`);
      fetch(`https://12e4f6e9.ngrok.io/api/dashboard/${accountID}`).then(response => {
        return response.json();
      }).then(ordersData => {
        console.log(`Results: --START--`);
        console.log(ordersData);
        console.log(`Results: --END--`);

          let rangeDays = 7;

          let chartOrders = [
              Array
                  .apply(0, Array(rangeDays))
                  .map((x, y) => {
                      let date = Moment().startOf("day").subtract(rangeDays - y - 1, "days").valueOf();
                      let dateText = "";

                      switch (date) {
                          case Moment().startOf("day").toDate().valueOf():
                              dateText = "Today";
                              break;
                          case Moment().startOf("day").subtract(1, "days").toDate().valueOf():
                              dateText = "Yesterday";
                              break;
                          default:
                              dateText = Moment(date).format("ddd Do");
                              break;
                      };

                      let count = ordersData.filter(i => Moment(i.orderDate).valueOf() === date).map(i => i.numberOfOrders)[0] || 0;
                      return { v: count, name: dateText };
                  })
          ];

          let chartValues = [
              Array
                  .apply(0, Array(rangeDays))
                  .map((x, y) => {
                      let date = Moment().startOf("day").subtract(rangeDays - y - 1, "days").valueOf();
                      let dateText = "";

                      switch (date) {
                          case Moment().startOf("day").toDate().valueOf():
                              dateText = "Today";
                              break;
                          case Moment().startOf("day").subtract(1, "days").toDate().valueOf():
                              dateText = "Yesterday";
                              break;
                          default:
                              dateText = Moment(date).format("ddd Do");
                              break;
                      };

                      let count = ordersData.filter(i => Moment(i.orderDate).valueOf() === date).map(i => i.valueOfOrders)[0] || 0;
                      return { v: count, name: dateText };
                  })
          ];

        // let list = ordersData.map(x => { return [{"v": x.numberOfOrders, "name": Moment(x.orderDate).format("MM-DD")}, {"v": x.valueOfOrders, "name": Moment(x.orderDate).format("MM-DD")}] });
        console.log(chartOrders);

        this.setState({ordersData: chartOrders});
        this.setState({orderValues: chartValues});
      }).catch(error =>{
         console.log(error);
      });
  }

  render() {

    let options = {
      width: 300,
      height: 250,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#d42024',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return (
      <View style={styles.container}>
        <Text>Here is MobileTron!</Text>
        <TextInput
          ref="accountIdInput"
          keyboardType = 'numeric'
          style={{height: 40, width: 150}}
          placeholder="Type SFL account ID!"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
            onPress={this._onPressButton}
            title="Go for it!"
            color="#d42024"
          />
        <Bar data={this.state.ordersData} options={options} accessorKey='v'/>

        <Bar data={this.state.orderValues} options={options} accessorKey='v'/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
