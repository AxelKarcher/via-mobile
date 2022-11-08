import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import MapScreen from './src/screens/MapScreen'
import JokesScreen from './src/screens/JokesScreen'

const App = () => {

  const Stack = createStackNavigator()

  const screenOptions = {headerShown: false, animationEnabled: false}

  const screens = [
    {name: 'Map', component: MapScreen},
    {name: 'Jokes', component: JokesScreen},
  ]

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator>
            {screens?.map((elem, i) => (
              <Stack.Screen
                key={i}
                name={elem?.name}
                component={elem?.component}
                options={{...screenOptions}}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App