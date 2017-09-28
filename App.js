import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import { Bar } from 'react-native-pathjs-charts'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  _onPressButton() {
    Alert.alert('You entered id:' + this.state.text +'!')
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
