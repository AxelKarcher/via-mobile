import {Text, Linking, Image, TouchableOpacity} from 'react-native'

const NewsCard = ({title, author, pic, url, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
        padding: 15, backgroundColor: 'white', borderRadius: 15, ...style
      }}
      onPress={() => Linking.openURL(url)}
    >
      <Text>{title}</Text>
      <Text style={{marginBottom: 15, fontSize: 10}}>{author}</Text>
      <Image style={{height: 75, borderRadius: 5}} source={{uri: pic}} />
    </TouchableOpacity>
  )
}

export default NewsCard