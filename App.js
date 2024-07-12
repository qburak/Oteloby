import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux'
import app from './firebaseConfig';
import { db } from './firebaseConfig';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});
