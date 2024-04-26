/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import data from './data'
import style from './style';
import Square from './square';

function App() {
  return (
    <ScrollView style={style.container}>
      {data.map((item, index) => (
        <Square key={item} text={`Square ${index + 1}`} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({

});

export default App;
