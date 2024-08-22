// App.js
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import TicTacToe from './TikTacToe';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <TicTacToe />
    </SafeAreaView>
  );
};

export default App;
