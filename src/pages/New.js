import React, { Component } from 'react';

import { View , StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

// import styles from './styles';

export default class New extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        newTweet:''
    };

    goBack = ()=>{
        this.props.navigation.pop();
    }

    handleTweet = async () =>{
        const content  = this.state.newTweet;
        const author = await AsyncStorage.getItem('@OmniStack:username');

        await api.post('tweets', { author, content });

        this.goBack();
    };

    handleInputChange = (newTweet)=>{
        this.setState({ newTweet });
    }

  render() {
    return (
            <SafeAreaView styles={styles.container}>
                <View styles={styles.header}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Icon name="close" size={24} color="#4BB0EE"/>
                    </TouchableOpacity>
                    
                    <TextInput 
                        style={styles.input}
                        multiline
                        placeholder="O que está acontecendo?"
                        placeholderTextColor="#999"
                        value={this.state.newTweet}
                        onChangeText={this.handleInputChange}
                        returnKeyType="send"
                        onSubmitEditing={this.handleTweet}
                        >

                    </TextInput>
                    <TouchableOpacity style={styles.button} onPress={this.handleTweet}>
                        <Text style={styles.buttonText}>Tweetar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  
    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },
  
    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
  });
  