//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios';
import { assign } from 'lodash';
import { TopicRow, CallData } from '../index.js';
import { fetchPostsIfNeeded, reFetchPosts } from '../actions'
import { Spinner } from 'native-base';

// create a component
class FirstPage extends Component {
  constructor(props){
    super(props)
        
    // axios({
    //   method:'get',
    //   url:'https://www.reddit.com/r/popular.json',
    //   responseType:'json'
    // }).then((response) => {
    //   this.setState(assign({}, this.state, {
    //     topicObject: response.data.data.children
    //   }))
    //   console.log(response.data.data.children)
    // }).catch((error) => {
    //   console.log(error)      
    // })
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded('popular', ''))
  }

  // componentWillReceiveProps(nextProps) {
  //   // if (nextProps.selectedReddit !== this.props.selectedReddit) {
  //     // const { dispatch, selectedReddit } = nextProps
  //     const { dispatch } = nextProps      
  //     console.log('componentWillReceiveProps')
  //     dispatch(fetchPostsIfNeeded('popular'))
  //   // }
  // }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item}) => (
    <TopicRow
      id = {item.name}
      domain = {item.domain}
      title = {item.title}
      thumbnail = {item.thumbnail}
      author = {item.author}
      numOfComment = {item.num_comments}
      score = {item.score}
      createdUtc = {item.created_utc}
      permalink = {item.permalink}
    />
  )

  _renderFooter = () => {  
    const { dispatch } = this.props        
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  _handleRefresh = () => {    
    const { dispatch, after } = this.props    

    // dispatch(startLoadMore())        
    // this.setState(assign({}, this.state, {refreshing: true}))

    dispatch(reFetchPosts('popular', after))
  }

  render() {
    const { dispatch, topicObject, isFetching } = this.props
    
    const isEmpty = topicObject.length === 0

    // dispatch(endLoadMore())        
    
    return (
      <View>
        { isEmpty
        ? (isFetching ? <Spinner color='lightgray' />: <Text>Empty.</Text>) 
        : <FlatList
          data={topicObject}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReachedThreshold={1}
          onEndReached = {this._handleRefresh}
        />
        }
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

const mapStateToProps = state => {
  const { postsByReddit } = state
  
  const {
    isFetching,
    lastUpdated,
    items: topicObject,
    after: after,
    before: before,
  } = postsByReddit['popular'] ||  {
    isFetching: true,
    items: []
  }

  return {
    topicObject,
    after,
    before,
    isFetching,
    lastUpdated
  }
}

//make this component available to the app
export default connect(mapStateToProps)(FirstPage) ;
