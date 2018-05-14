import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import axios from 'axios';

import { Input, Button, Card, CardSection, Alert } from './common';

class ViewRequest extends Component {
  state = { 
    // address: '10.46.129.1', 
    address: '10.0.1.13',
    alertAt: 10,
    errorMessage: '', 
    timer: false, 
    distance: [], 
    alert: false 
  };
  
  onButtonPressTimer() {
    const timer = setInterval(() => {
      this.sendRequest();
    }, 1000);
    this.setState({ timer });
  }

  sendRequest() {
    const { address } = this.state;
    if (address === '') {
      return;
    }
    
    axios.get(`http://${address}/api/v1/couch/get-pos`)
      .then(response => {
          // const distance = Math.floor(Math.random() * 20);
          const distance = response.data;
          if (distance <= this.state.alertAt) {
            this.setState({ alert: true });
          } else {
            this.setState({ alert: false });
          }
          this.setState({ distance: [...this.state.distance, distance] });
          this.listView.scrollToEnd();
        }
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
  renderAlert() {
    if (this.state.alert === true) {
      return (<Alert title={'STOP'} text={'in the limit'} type={'danger'} />);
    }
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
        Request every 1 Second
      </Button>); 
  }

  
  renderDistance() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(this.state.distance);
    return (<ListView
      style={{ maxHeight: 200 }}
      dataSource={dataSource}
      enableEmptySections
      ref={listView => { this.listView = listView; }}
      renderRow={(data) => <View><Text>{data} cm</Text></View>}
    />);
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input 
            label={'Address'} 
            placeholder={'10.42.92.1'}
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
          <Input 
            label={'Alert At'} 
            placeholder={'10'}
            value={this.state.alertAt} 
            onChange={alertAt => this.setState({ alertAt })} 
          />
        </CardSection>

        <CardSection>
          { this.renderAlert() }
        </CardSection> 

        <CardSection>
          <Text>Distance {'\n'}</Text>
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
