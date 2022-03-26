import { useState } from "react";
import { View, FlatList, Pressable } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SmallResult  from "./SmallResult";

const ListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [resultsList, setResultsList] = useState();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@results_list');
      return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch(e) { console.log("Error while getting data: " + e); }
  }

  const storeData = async (value) => {
    try { await AsyncStorage.setItem('@results_list', JSON.stringify([...resultsList, value])); }
    catch (e) { console.log("Error while storing data: " + e); }
  }

  const addResult = (result) => {
    const element = {
      key: resultsList.length,
      name: result.name,
      artist: result.artist,
      genre: result.genre,
      country: result.country,
      picture: result.picture,
      rating: 0
    }

    setResultsList((current) => [...current, element]);
    storeData(element);
  }
  
  useFocusEffect(() => {
    getData().then((data) => { setResultsList(data); });

    if (!route.params) return;
    if (route.params.addElement) addResult(route.params.addElement);
    
    route.params.addElement = null;
  });

  return (
    <View>
      <FlatList
        data={ resultsList }
        renderItem={({ item }) => (
          <Pressable onPress={ () => navigation.navigate("Details", item) }>
            <SmallResult
              name={ item.name }
              artist={ item.artist }
              picture={ item.picture }
              color={ 'white' }
            />
          </Pressable>
        )}
        keyExtractor={ (item) => item.key }
      />
    </View>
  );
};

export default ListScreen;
