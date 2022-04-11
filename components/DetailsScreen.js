import { View, Text, Image, Button, Linking, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";

import { addResult, rateResult } from "./list/ListSlice";

const DetailsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { id, name, artist, country, genre, link, picture, rating } = useRoute().params;

  const onAddPress = () => {
    dispatch(addResult({
      result: {
        name: name,
        artist: artist,
        country: country,
        genre: genre,
        link: link,
        picture: picture
      }
    }));

    navigation.navigate("List");
  }

  const ratingCompleted = (ratingChoosed) => {
    dispatch(rateResult({
      id: id,
      rating: ratingChoosed
    }));
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
      <Image style={{ width: 150, height: 150 }} source={ (picture) ? { uri: picture } : require('../assets/not-found-pic.png') } />
      <View style={{ justifyContent: "space-evenly", alignItems: "center" }}>
        <Text style={{ fontSize: 32, textAlign: "center" }}>{ name }</Text>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{ artist }</Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>{ genre }</Text>
        <Text style={{ fontSize: 16, textAlign: "center", paddingBottom: 30 }}>{ country }</Text>
        <Pressable style={{ backgroundColor: 'black', padding: 15., borderRadius: 10 }} onPress={() => Linking.openURL(link)} s>
          <Ionicons name={ "logo-apple" } size={ 30 } color={ "white" } />
        </Pressable>
      </View>
      {(rating >= 0) ? (
        <AirbnbRating
          count={ 5 }
          defaultRating={ rating }
          onFinishRating={ ratingCompleted }
        />
      ) : (
        <Button
          color="green"
          style={{ marginTop: -200 }}
          title="Add"
          onPress={ onAddPress }
        />
      )}
    </View>
  );
};

export default DetailsScreen;
