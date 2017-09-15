//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class CallData extends Component {
  constructor(props){
    super(props)

    
    
    axios({
      method:'get',
      url:'https://www.reddit.com/r/sports.json',
      responseType:'json'
    }).then((response) => {
      this.setState(assign({}, this.state, {
        topicObject: response.data.data.children
      }))
      console.log(response.data.data.children)
    }).catch((error) => {
      console.log(error)      
    })
  }

  render() {
    return (
      this.props
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default CallData;
