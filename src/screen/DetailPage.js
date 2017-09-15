//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';
import { CardMain, CommentsList } from '../index.js';

// create a component
class DetailPage extends Component {  
  constructor(props){
    super(props)
  }

  componentDidMount(){
    // const { dispatch, id } = this.props
    // console.log('DetailPage => componentDidMount => id', id)    
    // dispatch(selectRedditId(id))    
    // dispatch(fetchDetailByRedditId(id))
    // const {id, domain} = this.props    
    // axios({
    //   method:'get',
    //   url:`https://www.reddit.com/by_id/t3_${id}.json`,
    //   responseType:'json'
    // }).then((response) => {
    //   if (response.data.data.children){
    //     this.setState(assign({}, this.state, {
    //       mainObject: response.data.data.children[0]
    //     }))
    //   }
    // }).catch((error) => {
    //   console.log(error)      
    // })
  }

  render() {
    const { id, permalink, domain } = this.props
    console.log('DetailPage => render => props', this.props)

    // const domain = 'i.imgur.com'

    // if(this.state.mainObject.data){
    //   title = this.state.mainObject.data.title
    //   thumbnail = this.state.mainObject.data.thumbnail
    //   author = this.state.mainObject.data.author
    //   num_comments = this.state.mainObject.data.num_comments
    //   score = this.state.mainObject.data.score      
    //   url = this.state.mainObject.data.url            
    // }

  //   <GifCard
  //   id = {id}
  //   title = {title}
  //   thumbnail = {thumbnail}
  //   author = {author}
  //   numOfComment = {num_comments}
  //   score = {score}
  //   imgUrl = {url}
  // /> :

    return (
      <Container>
        <Content>
          
          <CardMain id={ id } domain={domain}/> 

          <Text style={styles.mainText}>Comments</Text>
          
          <CommentsList permalink={ permalink }></CommentsList>

        </Content>
      </Container>
    )
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
  mainText: {
    paddingHorizontal: 16,    
    fontSize: 17,
    color: 'gray'    
  },
});

// const mapStateToProps = (state, ownProps) => {
//   const { postsByRedditId } = state
//   const { id } = ownProps
  
//   // console.log('DetailPage => mapStateToProps => postsByRedditId', postsByRedditId)  
//   // console.log('mapStateToProps => postsByReddit', postsByReddit)
  
//   const {
//     isFetching,
//     lastUpdated,
//     items: detailObject
//   } = postsByRedditId[id] ||  {
//     isFetching: true,
//     items: {}
//   }

//   return {
//     detailObject,
//     isFetching,
//     lastUpdated
//   }
// }

// //make this component available to the app
export default DetailPage ;
