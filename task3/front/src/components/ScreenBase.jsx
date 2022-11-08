import {View} from 'react-native'

import Footer from './Footer'

const ScreenBase = ({navigation, noFooter, location, style, children}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <View style={{flex: 1, ...style}}>{children}</View>
      {!noFooter && <Footer navigation={navigation} location={location} />}
    </View>
  )
}

export default ScreenBase