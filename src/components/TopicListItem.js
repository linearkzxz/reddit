//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TopicRow } from '../index.js';

class TopicListItem extends Component {

  _onPress = () => {
    // this.props.onPressItem(this.props.id);
  };

  render() {
    const { id, title, thumbnail, author, numOfComment, score} = this.props
    console.log(thumbnail)
    return (
      <View>
        <TopicRow 
          id = {id}
          title = {title}
          thumbnail = {thumbnail}
          author = {author}
          numOfComment = {numOfComment}
          score = {score} 
        />
      </View>      
    )
  }
}

export default TopicListItem