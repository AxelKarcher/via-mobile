import {Modal, View, Text} from 'react-native'

import {margin, padding} from '../config/ui.js'
import PanelBase from './PanelBase.jsx'

const ModalBase = ({isOn, title, handleClose, children}) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isOn}
    >
      <View
        onTouchEnd={handleClose}
        style={{height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignContent: 'center', justifyContent: 'center',
          boxSizing: 'border-box', padding: padding
        }}
      >
        <PanelBase
          onTouchEnd={(e) => e.stopPropagation()}
          style={{alignItems: 'center'}}
        >
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: margin}}>
            {title}
          </Text>
          {children}
        </PanelBase>
      </View>
    </Modal>
  )
}

export default ModalBase