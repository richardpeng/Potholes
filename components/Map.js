import React from 'react'
import { WebView, Dimensions, View, Text } from 'react-native'
import AccelerometerSensor from '../components/AccelerometerSensor';

class Map extends React.Component {
  state = {
    loaded: false,
    location: null
  }

  _initLocation = (location) => {
    this.setState({loaded: true, location: location.coords})
  }

  _setLocation = () => {
    const {latitude, longitude} = this.state.location
    this.webViewGoogle.postMessage({
      center: {
        lat: latitude,
        lng: longitude
      }
    });
  }

  render() {
    return <View>
      {this.state.loaded && <WebView
        source={{uri: `https://potholes-api.herokuapp.com/map?lat=${this.state.location.latitude}&lng=${this.state.location.longitude}`}}
        // source={{uri: `http://10.248.32.249:3000/map?lat=${this.state.location.latitude}&lng=${this.state.location.longitude}`}}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height/2,
        }}
        // geolocationEnabled={true}
        // onLoadEnd={this._setLocation}
        // useWebKit={true}
        ref={(component) => (this.webViewGoogle = component)}
      />}
      {/*<View>*/}
      {/*  <Text>*/}
      {/*    {this.state.location && JSON.stringify(this.state.location)}*/}
      {/*  </Text>*/}
      {/*</View>*/}
      <AccelerometerSensor setLocation={this._initLocation} />
    </View>
  }
}
export default Map
