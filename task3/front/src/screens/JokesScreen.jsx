import {View, Text, TextInput} from 'react-native'
import {useEffect, useState} from 'react'
import axios from 'axios'
import CheckBox from 'expo-checkbox'

import ScreenBase from '../components/ScreenBase'
import {padding, margin, borderRadius} from '../config/ui'
import ModalBase from '../components/ModalBase'
import Button from '../components/Button'
import PanelBase from '../components/PanelBase'

const choices = ['Programming', 'Miscellaneous', 'Dark', 'Pun', 'Spooky', 'Christmas']

const JokesScreen = ({navigation}) => {

  const [jokeInfos, setJokesInfos] = useState()
  const [boxes, setBoxes] = useState(Array(choices?.length).fill(true))
  const [isReady, setIsReady] = useState(true)
  const [isSendModal, setIsSendModal] = useState(false)
  const [receiverMail, setReceiverMail] = useState('')

  useEffect(() => {getJoke()}, [])

  const getJoke = () => {
    axios.get('https://v2.jokeapi.dev/joke/' + getTags() + '?type=single')
      .then((res) => setJokesInfos(res?.data))
  }

  const getTags = () => {
    let choosed = []

    boxes?.forEach((elem, i) => {if (elem) {choosed.push(choices[i])}})

    return choosed.join(',')
  }

  const updateBox = (i, value) => {
    let newBoxes = [...boxes]
    let isOneTrue = false

    newBoxes[i] = value
    newBoxes?.forEach((elem) => {if (elem) {isOneTrue = true}})
    setIsReady(isOneTrue)
    setBoxes(newBoxes)
  }

  const sendJoke = () => {
    axios.post('http://192.168.165.134:8080/jokes/send', {
      receiverMail: receiverMail,
      joke: jokeInfos?.joke
    })
      .finally(() => {setIsSendModal(false)})
  }

  return (
    <ScreenBase
      navigation={navigation}
      location='Jokes'
      style={{alignItems: 'center', justifyContent: 'space-between',
        boxSizing: 'border-box', padding: padding
      }}
    >
      <ModalBase isOn={isSendModal} handleClose={() => setIsSendModal(false)} title='SEND IT'>
        <View style={{width: '100%', alignItems: 'flex-start', marginBottom: margin}}>
          <Text style={{fontWeight: 'bold'}}>Receiver mail</Text>
          <TextInput
            style={{height: 60, width: '100%', padding: padding,
              borderRadius: borderRadius, borderColor: 'gray', borderWidth: 4,
              boxSizing: 'border-box'
            }}
            value={receiverMail}
            onChangeText={(e) => setReceiverMail(e)}
          />
        </View>
        <Button label='CONFIRM' disabled={receiverMail === ''} onPress={sendJoke} />
      </ModalBase>
      <PanelBase>
        {
          jokeInfos
          ?
          <>
            <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold',
              marginBottom: margin / 2
            }}>
              {jokeInfos?.category}
            </Text>
            <Text style={{textAlign: 'center'}}>{jokeInfos?.joke}</Text>
          </>
          :
          <Text>Looking for a joke..</Text>
        }
      </PanelBase>
      <PanelBase>
        {choices?.map((elem, i) => (
          <View key={i} style={{flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Text style={{marginRight: margin, fontSize: 20, fontWeight: 'bold'}}>{elem}</Text>
            <CheckBox value={boxes[i]} onValueChange={(e) => updateBox(i, e)} color='crimson' />
          </View>
        ))}
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: margin}}>
          <Button
            label='NEW JOKE'
            style={{marginRight: margin}}
            disabled={!isReady}
            onPress={getJoke}
          />
          <Button label='SEND IT' disabled={!jokeInfos} onPress={() => setIsSendModal(true)} />
        </View>
      </PanelBase>
    </ScreenBase>
  )
}

export default JokesScreen