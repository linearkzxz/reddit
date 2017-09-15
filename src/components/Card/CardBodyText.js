import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Platform, Image} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body, Right, Spinner } from 'native-base';
import Timestamp from 'react-timestamp';
import striptags from 'striptags';

function CardBody({ 
  selftext_html,
  platform
}) {
  if (platform && platform !== Platform.OS) {
    return <View />;
  }

  let textContent = ''
  if(selftext_html) { 
    textContent = striptags(selftext_html)
    console.log('textContent', striptags(selftext_html))
  }
  
  let html =
  '<a href="https://example.com">' +
      'lorem ipsum <strong>dolor</strong> <em>sit</em> amet' +
  '</a>';

  console.log('textContent', striptags(html))

  return (
    <CardItem cardBody>
    { selftext_html 
      ? <Text style={ styles.textContent }>{textContent}</Text>
      : <Text></Text>
    }
    </CardItem>
  );
}

CardBody.propTypes = {
  // selftext_html: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  textContent:{
    paddingHorizontal: 10,  
  }
});

export default CardBody;
