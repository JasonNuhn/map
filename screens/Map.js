import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }
        };
    }    

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
           (position) => {
             this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
             });
           },
        (error) => console.log(error.message),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
         );
         this.watchID = navigator.geolocation.watchPosition(
             position => {
                 this.setState({
                     region: {
                         latitude: position.coords.latitude,
                         longitude: position.coords.longitude,
                         latitudeDelta: LATITUDE_DELTA,
                         longitudeDelta: LONGITUDE_DELTA,
                     }
                 });
             }
         );
       }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render(){
      return (
        <View style={styles.container}>
            <Text>Here is a map of where you are hopefully!</Text>
          <MapView style={styles.map}
            showsUserLocation={true}
            region= { this.state.region }
            onRegionChange={ region => this.setState({region}) }
            onRegionChangeComplete={ region => this.setState({region}) }
            >
                <MapView.Marker
                    coordinate= {this.state.region}
                />
            </MapView>
            <Text>I know where you live!</Text>
            <Text>Please snapshot this and send my way!  Thanks.</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    },
    map: {
        width: '70%',
        height: '60%'
    },
  });