import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Actions, Router, Stack, Scene, Tabs, Drawer } from 'react-native-router-flux';
import { postsByReddit, postsByRedditId, selectedRedditId, comments, subReddits } from './reducers';
import { FirstPage, DetailPage, TabViewPage } from './index.js';
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import DrawerContent from './components/drawer/DrawerContent';



const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const reducer = combineReducers({
  postsByReddit,
  postsByRedditId,
  selectedRedditId,
  comments,
  subReddits
})

const RouterWithRedux = connect()(Router);
const store = createStore(reducer, applyMiddleware(...middleware)
);

export default class reddit extends Component {
  render() {
    return (
      <Provider store={store}>     
        <RouterWithRedux>
          <Stack key="root">
            <Scene key="TabView" component={TabViewPage} title="Reddit" initial/>
            <Scene key="FirstPage" component={FirstPage} title="Reddit" />
            <Scene key="DetailPage" component={DetailPage} title="Reddit2"/>

            <Drawer
              hideNavBar
              key="drawer"
              contentComponent={TabView}
              
            >
              <Scene hideNavBar>
                <Tabs
                  key="tabbar"
                  swipeEnabled
                  showLabel={false}
                  tabBarStyle={styles.tabBarStyle}
                  activeBackgroundColor="white"
                  inactiveBackgroundColor="rgba(0, 0, 0, 0.01)"
                  swipeEnabled={false}
                >
                  <Stack key="tab_3" >
                    <Scene
                      key="tab_3_1"
                      component={FirstPage}
                      title="Reddit"
                      icon={TabIcon}
                  />
                  </Stack>
                  <Stack key="tab_4">
                    <Scene 
                      key="tab_4_1" 
                      component={TabView} 
                      title="Tab #4" 
                      icon={TabIcon} />
                  </Stack>
                </Tabs>
              </Scene>
            </Drawer>
          </Stack>
        </RouterWithRedux>
      </Provider>

      // <Router>
      //   <Stack key="root">
      //     <Scene key="FirstPage" component={FirstPage} title="Reddit"/>
      //     <Scene key="DetailPage" component={DetailPage} title="Reddit2"/>
      //   </Stack>
      // </Router> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
 labelStyle: {
    color: 'green',
  },
});

AppRegistry.registerComponent('reddit', () => reddit);
