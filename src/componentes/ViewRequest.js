import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import axios from 'axios';

import { Input, Button, Card, CardSection } from './common';

class ViewRequest extends Component {
  state = { address: '10.46.129.1', errorMessage: '', timer: false, distance: [] };
  
  onButtonPressTimer() {
    const timer = setInterval(() => {
      this.sendRequest();
    }, 1500);
    this.setState({ timer });
  }

  sendRequest() {
    const { address } = this.state;
    if (address === '') {
      return;
    }
    axios.get(`http://${address}`)
      .then(response => 
        this.setState({ distance: [...this.state.distance, response.data] })
      )
      .catch(err => console.error(err));
  }

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({ timer: false });
  }

  clearDistance() {
    this.setState({ distance: [] });
  }

  renderButtonTimer() {
    if (this.state.timer !== false) {
      return (
        <Button onPress={this.stopTimer.bind(this)}>
          Stop Request
        </Button>);
    }
    return (
      <Button onPress={this.onButtonPressTimer.bind(this)}>
        Request every 1.5 Seconds
      </Button>); 
  }

  
  renderDistance() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(this.state.distance);
    return (<ListView
      style={{ maxHeight: 200 }}
      dataSource={dataSource}
      enableEmptySections
      renderRow={(data) => <View><Text>{data} cm</Text></View>}
    />);
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input 
            label={'Address'} 
            placeholder={'10.42.92.1/api/v1/get-position'}
            value={this.state.address} 
            onChange={address => this.setState({ address })} 
          />
        </CardSection>
        
        <CardSection>
          <Button onPress={this.sendRequest.bind(this)}>
            Get Onte Time Position
          </Button>
        </CardSection>

        <CardSection>
          {this.renderButtonTimer()}
        </CardSection>

        <CardSection>
          <Button onPress={this.clearDistance.bind(this)}>
            Clear
          </Button>
        </CardSection>

        <CardSection>
          <Text>Distance</Text>
        </CardSection>

        <CardSection>
          {this.renderDistance()}
        </CardSection>
          
        <Text style={styles.errorTextStyle}>
          {this.state.errorMessage}
        </Text>
      </Card>
    );
  }
}
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
export default ViewRequest;
