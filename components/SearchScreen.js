import { useState } from "react";
import { View, FlatList, Pressable, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import SmallResult  from "./SmallResult";

const baseUrl = "https://itunes.apple.com/search";

const createRequest = (obj) => {
  return (
    "?" +
    Object.keys(obj)
      .map((k) => k + "=" + obj[k])
      .join("&")
  );
};

const SearchScreen = () => {
  const navigation = useNavigation();
  const [term, onChangeTerm] = useState();
  const [selectedFilter, setSelectedFilter] = useState('song');
  const [trackResults, setTrackResultsList] = useState([]);

  const formatTrackResult = (track, index) => {
    return {
      key: index,
      name: track.trackName,
      artist: track.artistName,
      country: track.country,
      genre: track.primaryGenreName,
      picture: track.artworkUrl100
    };
  };

  const formatArtistResult = (artist, index) => {
    return {
      key: index,
      name: artist.artistName,
      artist: artist.artistType,
      genre: artist.primaryGenreName,
    };
  };

  const fetchResults = async () => {
    if (!term) return;

    let res = await fetch(baseUrl + createRequest({ term: term, media: 'music', entity: selectedFilter, limit: 50 }));
    let json = await res.json();

    if (selectedFilter === 'song') setTrackResultsList(json.results.map(formatTrackResult));
    else setTrackResultsList(json.results.map(formatArtistResult));
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          defaultValue={ term }
          placeholder="Enter text"
          onChangeText={ onChangeTerm }
          onSubmitEditing={ fetchResults }
          style={{ flex: 1, paddingStart: 10 }}
        />
        <Picker
          selectedValue={ selectedFilter }
          onValueChange={ (filterValue) => setSelectedFilter(filterValue) }
          style={{ width: 125 }}
        >
        <Picker.Item label="Song" value='song' />
        <Picker.Item label="Artist" value='musicArtist' />
      </Picker>
      </View>
      <Button title="Search" onPress={ fetchResults } color="grey" />
        <FlatList
          data={ trackResults }
          renderItem={({ item }) => (
            <Pressable onPress={ () => navigation.navigate("Details", item) }>
              <SmallResult
                name={ item.name }
                artist={ item.artist }
                picture={ item.picture }
                color={ '#E0E0E0' }
              />
            </Pressable>
          )}
          keyExtractor={ (item) => item.key }
        />
    </View>
  );
};

export default SearchScreen;
