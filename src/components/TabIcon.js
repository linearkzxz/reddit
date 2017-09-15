import React, {
  PropTypes,
} from 'react';
import {
  Text,
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => {
  return <Text
    style={{color: props.focused ? 'black' : 'gray'}}
  >{props.title}
  </Text>
};

TabIcon.propTypes = propTypes;

export default TabIcon;
