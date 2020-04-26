import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const options ={
      method: 'GET'
    };

    fetch('http://192.168.178.200:8000/users',options)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json["personid"] });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (

          <Text>Dane otrzymane z api:{data}</Text>
        )}
      </View>
    );
  }
};
