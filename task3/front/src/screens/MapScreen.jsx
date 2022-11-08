import {useState, useEffect, useRef} from 'react'
import MapView, {Marker} from 'react-native-maps'
import {View, Text} from 'react-native'
import * as Location from 'expo-location'
import axios from 'axios'

import ScreenBase from '../components/ScreenBase'
import iss from '../../assets/iss.png'
import via from '../../assets/via.png'
import {borderRadius, padding} from '../config/ui'

const MapScreen = ({navigation}) => {

  const [currentPos, setCurrentPos] = useState()
  const [ISSPos, setISSPos] = useState()

  const itRef = useRef(null)

  useEffect(() => {
    getCurrentPos()
    if (!currentPos || !ISSPos) {
      itRef.current = setInterval(() => {getISSPos()}, 2000)
    }
    // return clearInterval(itRef.current)
  }, [])

  const getCurrentPos = async () => {
    let location = await Location.getCurrentPositionAsync({})

    setCurrentPos({
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude
    })
  }

  const getISSPos = () => {
    axios.get('http://api.open-notify.org/iss-now.json')
      .then((res) => setISSPos({
        latitude: res?.data?.iss_position?.latitude,
        longitude: res?.data?.iss_position?.longitude
      }))
  }

  return (
    <ScreenBase navigation={navigation} location='Map'>
      <View style={{width: '100%', height: '100%', alignItems: 'center',
        justifyContent: 'center'
      }}>
        {
          currentPos && ISSPos
          ?
          <MapView
            mapType='hybrid'
            zoomEnabled={false}
            style={{height: '100%', width: '100%'}}
            initialRegion={{
              latitude: currentPos?.latitude,
              longitude: currentPos?.longitude,
              latitudeDelta: 0,
              longitudeDelta: 99
            }}
          >
            <Marker
              coordinate={{
                latitude: currentPos?.latitude,
                longitude: currentPos?.longitude
              }}
              title={'You\'re here'}
              image={via}
              anchor={{x: 0.5, y: 0.6}}
            />
            <Marker
              coordinate={{
                latitude: parseFloat(ISSPos?.latitude),
                longitude: parseFloat(ISSPos?.longitude)
              }}
              title='ISS'
              image={iss}
              anchor={{x: 0.5, y: 0.5}}
            />
          </MapView>
          :
          <View style={{boxSizing: 'border-box', padding: padding,
            backgroundColor: 'white', borderRadius: borderRadius
          }}>
            <Text>Map loading..</Text>
          </View>
        }
      </View>
    </ScreenBase>
  )
}

export default MapScreen