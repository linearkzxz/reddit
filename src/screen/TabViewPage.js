import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { assign } from 'lodash';
import { FirstPage } from '../index.js';
import { fetchSubReddits } from '../actions';
import { Spinner } from 'native-base';

const FirstRoute = () => <FirstPage></FirstPage>
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;
 
class TabViewPage extends Component {
  // state = {
  //   index: 0,
  //   routes: [
  //     { key: '1', title: 'First' },
  //     { key: '2', title: 'Second' },
  //     { key: 'x', title: 'Second' },      
  //   ],
  // };

  constructor(props){
    super(props)
    this.state = {
      index: 0,
      routes: [{ key: '1', title: 'First' },
          { key: '2', title: 'Second' },
          { key: 'x', title: 'Second' }, 
        ],
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(fetchSubReddits())
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.subRedditsObjects){
  //     if(nextProps.subRedditsObjects.length > 0){
  //       console.log('nextPropsdddddddd', nextProps.subRedditsObjects)
  //       console.log('nextProps', nextProps.subRedditsObjects.map(x => ({ 
  //         key: x.id,
  //         title: x.title
  //       })))
  //       this.setState(assign({}, this.state, { 
  //         routes: nextProps.subRedditsObjects.map(x => ({
  //           key: x.id,
  //           title: x.title
  //         })) 
  //       }))
  //     }
  //   }
  // }
 
  _handleIndexChange = index => this.setState(assign({}, this.state, { index }))
 
  _renderHeader = props => {
    console.log('_renderHeader => props', props)
    return(
      <TabBar {...props} />
    )
  }

  // _renderScene = () => {
  //   return (
  //     SceneMap({
  //       '1': FirstRoute,
  //       '2': SecondRoute,
  //     })
  //   )
  // }
 
  // _renderScene = SceneMap({
  //   '1': FirstRoute,
  //   '2': SecondRoute,
  // });

  // _renderScene = SceneMap({
  //   '1': FirstRoute,
  //   '2': SecondRoute,
  //   'x': SecondRoute,    
  // });

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '888':
      return <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;
    case '999':
      return <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
    default:
      console.log('_renderScene => route.key', route.key)
      return <FirstPage></FirstPage>;
    }
  };
 
  render() {
    const { dispatch, subRedditsObjects, isFetching } = this.props

    let isEmpty = true
    
    if (subRedditsObjects){
      isEmpty = subRedditsObjects.length === 0
    }

    console.log('render => subRedditsObjects', subRedditsObjects)
    
    return (
      // <View>
      //   { isEmpty
      //   ? (isFetching ? <Spinner color='lightgray' />: <Text>Empty.</Text>) 
      //   : <TabViewAnimated
      //       style={styles.container}
      //       navigationState={this.state}
      //       renderScene={this._renderScene}
      //       renderHeader={this._renderHeader}
      //       onIndexChange={this._handleIndexChange}
      //     />
      //   }
      // </View>

      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  const { subReddits } = state
  console.log('TabViewPage => mapStateToProps => state', state)  
  
  const {
    isFetching,
    lastUpdated,
    items: subRedditsObjects,
    after: after,
    before: before,
  } = subReddits.datas ||  {
    isFetching: true,
    items: []
  }

  return {
    subRedditsObjects,
    after,
    before,
    isFetching,
    lastUpdated
  }
}

//make this component available to the app
export default connect(mapStateToProps)(TabViewPage) ;