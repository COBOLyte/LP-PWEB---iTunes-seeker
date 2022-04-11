import { useState } from "react";
import { View, FlatList, Pressable, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import ResultCard  from "./ResultCard";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [term, onChangeTerm] = useState();
  const [selectedFilter, setSelectedFilter] = useState('song');
  const [searchList, setSearchList] = useState([]);

  const createRequest = (obj) => {
    return (
      "?" +
      Object.keys(obj)
        .map((k) => k + "=" + obj[k])
        .join("&")
    );
  };

  const formatTrackResult = (track, index) => {
    return {
      id: index,
      name: track.trackName,
      artist: track.artistName,
      country: track.country,
      genre: track.primaryGenreName,
      link: track.trackViewUrl,
      picture: track.artworkUrl100
    };
  };

  const formatArtistResult = (artist, index) => {
    return {
      id: index,
      name: artist.artistName,
      artist: artist.artistType,
      genre: artist.primaryGenreName,
      link: artist.artistLinkUrl
    };
  };

  const fetchResults = async () => {
    if (!term) return;

    const baseUrl = "https://itunes.apple.com/search";
    const res = await fetch(baseUrl + createRequest({ term: term, media: 'music', entity: selectedFilter, limit: 50 }));
    const json = await res.json();

    if (selectedFilter === 'song') setSearchList(json.results.map(formatTrackResult));
    else setSearchList(json.results.map(formatArtistResult));
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          defaultValue={ term }
          placeholder="Enter text"
          onChangeText={ onChangeTerm }
          onSubmitEditing={ fetchResults }
          style={{ flex: 1, paddingStart: 10, height: 50, backgroundColor: 'white' }}
        />
        <Picker
          selectedValue={ selectedFilter }
          onValueChange={(filterValue) => setSelectedFilter(filterValue)}
          style={{ width: 125 }}
        >
          <Picker.Item label="Song" value='song' />
          <Picker.Item label="Artist" value='musicArtist' />
        </Picker>
      </View>
      <Button title="Search" onPress={ fetchResults } color="grey" />
        <FlatList
          data={ searchList }
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Details", item)}>
              <ResultCard
                name={ item.name }
                artist={ item.artist }
                picture={ item.picture }
                link={ item.link }
                color={ '#E0E0E0' }
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
    </View>
  );
};

export default SearchScreen;
