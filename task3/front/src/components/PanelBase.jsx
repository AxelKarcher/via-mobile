import {View} from 'react-native'

import {padding, borderRadius} from '../config/ui'

const PanelBase = ({onTouchEnd, children, style}) => {
  return (
    <View
      onTouchEnd={onTouchEnd}
      style={{backgroundColor: 'white', borderRadius: borderRadius,
        padding: padding, boxSizing: 'border-box', ...style
      }}
    >
      {children}
    </View>
  )
}

export default PanelBase