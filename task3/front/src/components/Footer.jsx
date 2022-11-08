import {View} from 'react-native'

import Fontisto from 'react-native-vector-icons/Fontisto'

const Footer = ({navigation, location}) => {

  const containerStyle = {
    backgroundColor: 'black',
    width: '100%',
    paddingBottom: 7,
    paddingTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopWidth: 0.5,
    borderColor: 'grey'
  }

  const icons = [
    {iconName: 'map', trueName: 'Map'},
    {iconName: 'laughing', trueName: 'Jokes'}
  ]

  return (
    <View style={containerStyle}>
      {icons?.map((elem, i) => (
        <Fontisto
          key={i}
          name={elem?.iconName}
          size={30}
          color={location === elem?.trueName ? 'crimson' : 'white'}
          onPress={
            elem?.trueName === location
            ?
            null
            :
            () => navigation.push(elem?.trueName)
          }
        />
      ))}
    </View>
  )
}

export default Footer