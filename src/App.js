import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './componentes/common';
import ViewRequest from './componentes/ViewRequest';

class App extends Component {
  componentWillMount() {
  }
  

  render() {
    return (
      <View>
        <Header headerText={'Ultrasonuic'} />
        <ViewRequest />
      </View>
    );
  }
}
const styles = {
  spinnerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default App;
