/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import realm from 'realm';

const CarSchema = {
  name: 'Car',
  primaryKey: 'id',
  properties: {
    id:    'int',
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};

type Props = {};
export default class App extends Component<Props> {
  onPress = () => {
    try {
      realm.open({schema: [CarSchema], schemaVersion: 6}).then(realm => {
        realm.write(() => {
          console.log('Resetting DB...');
          realm.deleteAll();
          console.log('DB resetted...');
          console.log('Creating first car...');
          const myCar = realm.create('Car', {
            id: 1,
            make: 'Honda',
            //model: 'Civic', // Omitting required parameter -> Crashes... With parameter -> no crash
            miles: 1000
          });
          console.log('Updating mileage...');
          myCar.miles += 20; // Update a property value

          /* Should show a car object if successful */
          console.log(JSON.parse(JSON.stringify(myCar)));
        });
      }).catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Realm-Test!</Text>
        <Text style={styles.instructions}>Testing inserting objects with missing parameter...</Text>
        <Text style={styles.instructions}>For errors check adb logcat</Text>
        <Button title="Click me to crash :(" onPress={this.onPress}/>
      </View>
    );
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
});
