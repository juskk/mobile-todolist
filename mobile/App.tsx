import React from 'react';
import Ionicons  from '@expo/vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TodoPage from './pages/TodoPage/TodoPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { mainColor } from './styles/globalStyles';
import UserScreen from './pages/UserPage/UserScreen';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

export default function App() {

  const [isLogedIn, setIsLogedIn] = React.useState<any>(null);
  React.useEffect(() => {
    checkToken()
  }, [])

  //-------------------

  async function checkToken () {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsLogedIn(true)
    } else {
      setIsLogedIn(false)
    }
  };

  const Tab = createBottomTabNavigator();
  const queryClient = new QueryClient()
  const icons: any = {
    Todo: 'ios-list',
    Auth: 'person-add-outline',
    User: 'person-outline'
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName: string | any = icons[route.name];
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: mainColor,
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}>
          {isLogedIn ? <Tab.Screen options={ReloadInstructions} name="Todo" component={TodoPage} /> : null}
          
          {isLogedIn 
          ? <Tab.Screen name="User" component={UserScreen} initialParams={{logedin: isLogedIn, setLogedIn: setIsLogedIn}}/>  
          : <Tab.Screen name="Auth" component={AuthPage} initialParams={{logedin: isLogedIn, setLogedIn: setIsLogedIn}}/>}
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

