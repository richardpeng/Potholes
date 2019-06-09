import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import AccelerometerSensor from '../components/AccelerometerSensor';
// import WebViewLeaflet from "react-native-webview-leaflet";
import MapView from 'react-native-maps';

export default function HomeScreen() {
  // const mapboxToken = 'pk.eyJ1IjoicmljaGFyZHBlbmciLCJhIjoiVU0xNkJWdyJ9.FTabBJ4y83aHdWN3YPZSrA'
  // const mapLayers = {
  //   name: 'streets',  // the name of the layer, this will be seen in the layer selection control
  //   checked: 'true',  // if the layer is selected in the layer selection control
  //   type: 'TileLayer',  // the type of layer as shown at https://react-leaflet.js.org/docs/en/components.html#raster-layers
  //   baseLayer: true,
  //   // url of tiles
  //   url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
  //   // attribution string to be shown for this layer
  //   attribution:
  //     '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
  // }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {/*<View style={styles.welcomeContainer}>*/}
        {/*  <Image*/}
        {/*    source={*/}
        {/*      __DEV__*/}
        {/*        ? require('../assets/images/robot-dev.png')*/}
        {/*        : require('../assets/images/robot-prod.png')*/}
        {/*    }*/}
        {/*    style={styles.welcomeImage}*/}
        {/*  />*/}
        {/*</View>*/}
        <View style={styles.getStartedContainer}>
          {/*<DevelopmentModeNotice />*/}

          {/*<Text style={styles.getStartedText}>Get started by opening</Text>*/}

          {/*<View*/}
          {/*  style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>*/}
          {/*  <MonoText>screens/HomeScreen.js</MonoText>*/}
          {/*</View>*/}

          {/*<Text style={styles.getStartedText}>*/}
          {/*  Change this text and your app will automatically reload. Yay!*/}
          {/*</Text>*/}
          {/*<WebViewLeaflet*/}
          {/*  ref={component => (this.webViewLeaflet = component)}*/}
          {/*  // Optional: a callback that will be called when the map is loaded*/}
          {/*  // onLoad={this.onLoad}*/}

          {/*  // Optional: the component that will receive map events}*/}
          {/*  eventReceiver={this}*/}

          {/*  // Optional: the center of the displayed map*/}
          {/*  // centerPosition={this.state.mapCenterPosition}*/}

          {/*  // Optional: a list of markers that will be displayed on the map*/}
          {/*  // markers={this.state.markers}*/}

          {/*  // Required: the map layers that will be displayed on the map. See below for a description of the map layers object*/}
          {/*  mapLayers={mapLayers}*/}

          {/*  // Optional: display a marker to be at a given location*/}
          {/*  // ownPositionMarker={{*/}
          {/*  //   coords: this.state.currentLocation,*/}
          {/*  //   icon: "❤️",*/}
          {/*  //   size: [24, 24],*/}
          {/*  //   animation: {*/}
          {/*  //     name: "pulse",*/}
          {/*  //     duration: ".5",*/}
          {/*  //     delay: 0,*/}
          {/*  //     interationCount: "infinite"*/}
          {/*  //   }*/}
          {/*  // }}*/}

          {/*  // Optional (defaults to false): display a button that centers the map on the coordinates of ownPostionMarker. Requires that "ownPositionMarker" prop be set*/}
          {/*  // centerButton={true}*/}

          {/*  // Optional (defaults to false): cluster icons that are in the same area*/}
          {/*  // useMarkerClustering={true}*/}
          {/*/>*/}
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          {/*<AccelerometerSensor/>*/}
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/*<View style={styles.tabBarInfoContainer}>*/}
      {/*  <Text style={styles.tabBarInfoText}>*/}
      {/*    This is a tab bar. You can edit it in:*/}
      {/*  </Text>*/}

      {/*  <View*/}
      {/*    style={[styles.codeHighlightContainer, styles.navigationFilename]}>*/}
      {/*    <MonoText style={styles.codeHighlightText}>*/}
      {/*      navigation/MainTabNavigator.js*/}
      {/*    </MonoText>*/}
      {/*  </View>*/}
      {/*</View>*/}
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
