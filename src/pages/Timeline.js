import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

// import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {
  static navigationOptions = ({navigation}) => ({
    title:"Inicio",
    headerRight:(
      <TouchableOpacity onPress={()=>navigation.navigate('New')}>
        <Icon 
          style={{marginRight: 20}}
          name="add-circle-outline"
          size={24}
          color="#4BB0EE">
        </Icon>


      </TouchableOpacity>
    )
  });

  state = {
    tweets:[]
  };

async componentDidMount() {
    this.subscribeToEvents();
    const dados = await api.get('tweets');

    this.setState({ tweets : dados.data });
};

  subscribeToEvents = () =>{
    const io = socket('https://node-api-danielstackjs.herokuapp.com/');

    io.on('tweet', data =>{
       this.setState({ tweets: [data, ...this.state.tweets]});
    });

    io.on('like', data =>{
        this.setState(
            {
                 tweets: this.state.tweets.map(r=> r._id == data._id ? data : r )
            });
    });

};

  render() {
    return (
          <View style={styles.container}>
          <FlatList 
            data={this.state.tweets}
            keyExtractor={tweet => tweet._id}
             renderItem = {({ item })=> <Tweet tweet={item}></Tweet> }>

          </FlatList>
          </View>
        );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
