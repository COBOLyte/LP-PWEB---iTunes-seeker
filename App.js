import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react";

import { Ionicons } from '@expo/vector-icons';

import Store from "./Store";

import DetailsScreen from "./components/DetailsScreen";
import SearchScreen from "./components/SearchScreen";
import ListScreen from "./components/list/ListScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={ ({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search')
            iconName = focused
              ? 'search'
              : 'search-outline';
          else if (route.name === 'List')
            iconName = focused
            ? 'list'
            : 'list-outline';

          return <Ionicons name={ iconName } size={ size } color={ color } />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }) }
    >
      <Tab.Screen name="List" component={ ListScreen } />
      <Tab.Screen name="Search" component={ SearchScreen } />
    </Tab.Navigator>
  );
};

const persistor = persistStore(Store);

const App = () => {

  return (
    <Provider store={ Store }>
      <PersistGate persistor={ persistor }>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="iTunes Seeker" component={ Home } />
            <Stack.Screen name="Details" component={ DetailsScreen } />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
