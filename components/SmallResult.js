import { View, Text, Image } from "react-native";

const SmallResult = ({ name, artist, picture, color }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10, backgroundColor: color, borderRadius: 5 }}>
        <Image style={{ width: 50, height: 50 }} source={ (picture) ? { uri: picture } : require('../assets/not-found-pic.png') } />
        <Text style={{ fontSize: 14, marginStart: 10 }}>
          { name + "\n" }
          <Text style={{ fontSize: 10 }}>{ artist }</Text>
        </Text>
      </View>
    );
  };

export default SmallResult;
