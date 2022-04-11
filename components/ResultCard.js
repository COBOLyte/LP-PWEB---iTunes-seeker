import { View, Text, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ResultCard = ({ name, artist, picture, color, rating }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10, backgroundColor: color, borderRadius: 5 }}>
        <Image style={{ width: 50, height: 50 }} source={ (picture) ? { uri: picture } : require('../assets/not-found-pic.png') } />
        <Text style={{ fontSize: 14, marginStart: 10 }}>
          { name + "\n" }
          <Text style={{ fontSize: 10 }}>{ artist }</Text>
          {(rating >= 0) ? (
            <>
              <Ionicons name={'star'} color={'#f1c40d'} style={{ marginStart: 10 }} />
              <Text style={{ fontSize: 10, marginStart: 1 }}>{ rating }</Text>
            </>
          ) : (
            null
          )}
        </Text>
      </View>
    );
  };

export default ResultCard;
