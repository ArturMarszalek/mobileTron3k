import React from 'react';
import { VictoryBar } from "victory-native";
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  _onPressButton() {
    Alert.alert('You entered id:' + this.state.text +'!')
  }

  render() {
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
