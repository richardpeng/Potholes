import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Accelerometer } from 'expo-sensors'
import { Dimensions, TextInput } from 'react-native'
import { Constants, Location, Permissions } from 'expo';
const screenWidth = Dimensions.get('window').width
import {
  LineChart,
} from 'react-native-chart-kit'
import axios from 'axios'

export default class AccelerometerSensor extends React.Component {
  state = {
    accelerometerData: {},
    locationData: {},
    data: [],
    subscribed: false,
    duration: 5000,
    errorMessage: null,
  };

  componentDidMount () {
    // this._toggle();
    Accelerometer.setUpdateInterval(1000);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      // this._getLocationAsync();
      this._locSubscription = Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 0,
      }, locationData => {
        this.setState({locationData})
      })
    }
  }

  componentWillUnmount () {
    this._unsubscribe();
    this._locSubscription && this._locSubscription.remove();
    this._locSubscription = null;
  }

  _toggle = () => {
    Accelerometer.setUpdateInterval(1);
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this.setState({
        data: []
      })
      this._subscribe();
    }
  };

  _record = () => {
    Accelerometer.setUpdateInterval(100);
    if (!this._subscription) {
      this.setState({
        data: [],
        subscribed: true,
      }, this._subscribe)
      setTimeout(() => {
        this.setState({
          subscribed: false,
        }, this._unsubscribe)
        axios.post('https://potholes-api.herokuapp.com/raw', this.state.data)
        // axios.post('http://10.248.32.249:3000/raw', this.state.data)
      }, this.state.duration);
    }
  }

  _slow = () => {
    Accelerometer.setUpdateInterval(500);
  };

  _fast = () => {
    Accelerometer.setUpdateInterval(
      1
    );
  };

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(
      accelerometerData => {
        this.setState({accelerometerData});
        const {x, y, z} = this.state.accelerometerData;
        const {speed, heading, longitude, latitude, altitude, accuracy, altitudeAccuracy} = this.state.locationData.coords;
        const magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
        this.setState({
          data: [
          ...this.state.data, {
              x,
              y,
              z,
              magnitude,
              speed,
              heading,
              longitude,
              latitude,
              altitude,
              accuracy,
              altitudeAccuracy,
              time: (new Date).getTime(),
          }]})
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  _getLocationAsync = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({location});
  };

  render () {
    let {
      x,
      y,
      z,
    } = this.state.accelerometerData;
    const mag = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
    const time = Date.now()
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.locationData) {
      text = JSON.stringify(this.state.locationData);
    }
    return (
      <View style={styles.sensor}>
        <View>
          <Text style={styles.paragraph}>Location: {text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._record} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TextInput
            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(duration) => this.setState({duration})}
            value={this.state.duration}
            keyboardType='number-pad'
          />
          <Text>{this.state.duration}</Text>
          {/*<TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>*/}
          {/*  <Text>Slow</Text>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity onPress={this._fast} style={styles.button}>*/}
          {/*  <Text>Fast</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>

        <Text>
          x: {round(x)} y: {round(y)} z: {round(z)} mag: {mag} time: {time}
        </Text>
        {!this.state.subscribed && this.state.data.length > 0 && <View>
          <LineChart
            data={{
              // labels: this.state.data.map(d => d.time),
              datasets: [{
                data: this.state.data.map(d => d.magnitude),
              }]
            }}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
          />
          {this.state.data.map(d => <Text key={d.time}>
            mag: {parseFloat(d.magnitude).toFixed(5)} time: {d.time}
          </Text>)}
        </View>
        }
      </View>
    );
  }
}

function round (n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
