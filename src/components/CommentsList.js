import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Spinner, Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';
import { CommentItem } from '../index.js';
import { fetchComments } from '../actions';

class CommentsList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      commentsArray: []
    }
  }

  componentDidMount(){
    const { dispatch, id, permalink } = this.props
    console.log('CommentsList => componentDidMount => props', this.props)
    dispatch(fetchComments(id, permalink))    
    // axios({
    //   method:'get',
    //   url:'https://www.reddit.com/r/interestingasfuck/comments/6yjimx/amazing_hand_carved_and_painted_walking_stick/.json',
    //   responseType:'json'
    // }).then((response) => {
    //   this.setState(assign({}, this.state, {
    //     commentsArray: response.data[1].data.children
    //   }))
    //   console.log('comments: ', response.data[1].data.children)
    // }).catch((error) => {
    //   console.log(error)      
    // })
  }
  
  _genCommentView = (item) => {
    // console.log('item: ', item)
    let html = []; 
    for (let i = 0 ; i<item.length ; i++){
      if (item[i].kind !== 'more'){
        html = [...html, 
          <View key = {item[i].data.id} style={{ paddingLeft: 10, paddingBottom: 10 }}>
            <View style={styles.commentGroup}>
              <CommentItem
                body = {item[i].data.body}
                author = {item[i].data.author}
                score = {item[i].data.score}
              >
              </CommentItem>
              { 
                item[i].data.replies && item[i].data.replies !== '' ? 
                  this._genCommentView(item[i].data.replies.data.children) :
                  <View></View>
              }
            </View>
          </View>
        ]
      }
    }
    return (
      html
    )
  }

  render() {      
    // const { id, title, thumbnail, author, numOfComment, score, imgUrl } = this.props
    const { commentsObjects, isFetching } = this.props

    console.log('CommentList => render => props', this.props)

    // const commentsArray = commentsObjects

    let isEmpty = true
    let commentView = []
    
    console.log('CommentList => render => commentsObjects', commentsObjects)  
    
    if (commentsObjects){
        isEmpty = commentsObjects.length === 0    
        commentView = this._genCommentView(commentsObjects)
    }

    return (
      <Card>
        { isEmpty
          ? (isFetching ? <Spinner color='lightgray' />: <Text>Empty.</Text>) 
          : 
          <View>{ commentView }</View>         
        }

      </Card>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.054)',
  },
  buttomCard:{
    justifyContent: 'flex-end',    
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttomLeft:{
    flexDirection: 'row',  
    alignItems: 'center',    
  },
  mainText: {
    paddingHorizontal: 16,    
    fontSize: 17,
    color: 'gray'    
  },
  infoText: {
    fontSize: 12,
    color: 'gray'
  },
  commentGroup: {
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0, 0, 0, 0.1)',
  }
});

const mapStateToProps = (state, ownProps) => {
  const { comments, selectRedditId } = state
  const { permalink } = ownProps
  // console.log('CommentList => mapStateToProps => state', state)  
  // console.log('CommentList => mapStateToProps => selectRedditId', selectRedditId)  
  // // console.log('CommentList => mapStateToProps => comments[id]', comments[id])  

  // console.log('CommentList => mapStateToProps => permalink', permalink)  
  
  // console.log('CommentList => mapStateToProps => comments[permalink]', comments[permalink])  
  
  
  const {
    isFetching,
    lastUpdated,
    items: commentsObjects
  } = comments[permalink] ||  {
    isFetching: true,
    items: []
  }

  return {
    commentsObjects,
    isFetching,
    lastUpdated
  }
}

//make this component available to the app
export default connect(mapStateToProps)(CommentsList);