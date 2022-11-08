import {TouchableOpacity, Text} from 'react-native'

import {padding, borderRadius} from '../config/ui'

const Button = ({label, disabled, onPress, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{backgroundColor: disabled ? 'lightgray' : 'crimson', borderRadius: borderRadius,
        boxSizing: 'border-box', padding: padding, ...style
      }}
      disabled={disabled}
    >
      <Text style={{fontWeight: 'bold', color: disabled ? 'gray' : 'white'}}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button