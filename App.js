import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import { Bar } from 'react-native-pathjs-charts'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
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
        this.setState({ordersData: ordersData});
      }).catch(error =>{
         console.log(error);
      });
  }

  render() {

    let data = [
      [{
        "v": 49,
        "name": "apple"
      }, {
        "v": 42,
        "name": "apple"
      }],
      [{
        "v": 69,
        "name": "banana"
      }, {
        "v": 62,
        "name": "banana"
      }],
      [{
        "v": 29,
        "name": "grape"
      }, {
        "v": 15,
        "name": "grape"
      }]
    ]

    let options = {
      width: 300,
      height: 300,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#2980B9',
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
          keyboardType = 'numeric'
          style={{height: 40, width: 150}}
          placeholder="Type SFL account ID!"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
            onPress={this._onPressButton}
            title="Go for it!"
            color="#841584"
          />

        <Bar data={data} options={options} accessorKey='v'/>

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
