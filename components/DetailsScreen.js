import { View, Text, Image, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = () => {
  const navigation = useNavigation();
  const { key, name, artist, country, genre, picture, rating } = useRoute().params;

  const ratingCompleted = async (ratingChoosed) => {
    try {
      let resultsList = await AsyncStorage.getItem('@results_list');
      resultsList = JSON.parse(resultsList);

      resultsList[key].rating = ratingChoosed;
      await AsyncStorage.setItem('@results_list', JSON.stringify(resultsList));
    } catch (e) { console.log("Error while getting data: " + e); }
  }

  

  return (
    <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
      <Image style={{ width: 150, height: 150 }} source={ (picture) ? { uri: picture } : require('../assets/not-found-pic.png') } />
      <View style={{ justifyContent: "space-evenly", alignItems: "center" }}>
        <Text style={{ fontSize: 32, textAlign: "center" }}>{ name }</Text>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{ artist }</Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>{ genre }</Text>
        <Text style={{ fontSize: 16, textAlign: "center" }}>{ country }</Text>
      </View>
      { (rating >= 0)
      ? <AirbnbRating
          count={ 5 }
          defaultRating={ rating }
          onFinishRating={ ratingCompleted }
        />
      : <Button
      color="green"
      style={{ marginTop: -200 }}
      title="Add"
      onPress={ () => navigation.navigate("List", {
        addElement: {
          name: name,
          artist: artist,
          genre: genre,
          country: country,
          picture: picture
        }})}
      />
      }
    </View>
  );
};

export default DetailsScreen;
