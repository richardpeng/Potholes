import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  },
  container: {
    flex: 1,
    paddingTop: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#fff',
  },
});

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      {/*<ExpoLinksView />*/}
      <Text style={styles.titleText}>
        Road Radar reports the road conditions that users have traveled on. You can drive with this application to help your city locate sections of roads that are in critical need of repair.
      </Text>
      <Text>
        Privacy Policy: No personally identifiable information is collected. The data sent to the server is completely
        anonymous.
      </Text>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'About',
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });
