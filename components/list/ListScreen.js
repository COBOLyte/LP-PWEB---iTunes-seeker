import React from "react";
import { View, FlatList, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";

import { listSelector, filteredListSelector, setTextFilter, activateSongFilter, activateArtistFilter } from "./ListSlice";

import ResultCard  from "../ResultCard";

const ListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const list = useSelector(filteredListSelector);

  return (
    <View>
      <View style={{
        flexDirection: "row",
        backgroundColor: 'white',
        justifyContent: "space-around",
        alignItems: "center"
        }}
      >
        <TextInput
          value={ useSelector(listSelector).textFilter }
          placeholder="Filter movie..."
          onChangeText={(textFilter) => dispatch(setTextFilter({textFilter: textFilter}))}
          style={{ paddingStart: 10, height: 50 }}
        />
        <Pressable
          onPress={() => dispatch(activateSongFilter())}
          style={{ flexDirection: "row" }}
        >
          <Ionicons name={ (useSelector(listSelector).isSongFilterActivated) ? 'musical-notes' : 'musical-notes-outline' } size={ 20 } />
        </Pressable>
        <Pressable
          onPress={() => dispatch(activateArtistFilter())}
          style={{ flexDirection: "row" }}
        >
          <Ionicons name={(useSelector(listSelector).isArtistFilterActivated) ? 'people' : 'people-outline'} size={ 20 } />
        </Pressable>
      </View>
      <FlatList
        data={ list }
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("Details", item)}>
            <ResultCard
              name={ item.name }
              artist={ item.artist }
              picture={ item.picture }
              rating={ item.rating }
              color={ 'white' }
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ListScreen;
