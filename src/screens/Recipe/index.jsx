import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { colors, fontType } from "../../theme";
import { useFocusEffect } from "@react-navigation/native";

const categories = [
  { name: "Ayam", image: require("../../assets/images/Ayam.jpg") },
  { name: "Daging", image: require("../../assets/images/Daging.jpg") },
  { name: "Ikan", image: require("../../assets/images/Ikan.jpg") },
  { name: "Tahu", image: require("../../assets/images/Tahu.jpg") },
  { name: "Telur", image: require("../../assets/images/Telur.jpg") },
  { name: "Tempe", image: require("../../assets/images/Tempe.jpg") },
];

const Recipe = ({ navigation }) => {
  const containerRef = useRef(null);
  const [triggerKey, setTriggerKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      if (containerRef.current) {
        containerRef.current.fadeInUp(600);
      }
      setTriggerKey((prev) => prev + 1); // untuk re-trigger animasi
    }, [])
  );

  return (
    <Animatable.View
      ref={containerRef}
      animation="fadeInUp"
      duration={600}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Pilih Bahan Masakan</Text>
        <View style={styles.grid} key={triggerKey}>
          {categories.map((item, index) => (
            <Animatable.View
              key={item.name}
              animation="bounceIn"
              delay={index * 150}
              useNativeDriver
            >
              <Pressable
                style={styles.card}
                onPress={() =>
                  navigation.navigate("RecipeDetail", { category: item.name.toLowerCase() })
                }
              >
                <Image source={item.image} style={styles.image} />
                <Text style={styles.label}>{item.name}</Text>
              </Pressable>

            </Animatable.View>
          ))}
        </View>
      </ScrollView>
    </Animatable.View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  scrollContainer: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: "bold",
    color: "#F7944D",
    marginBottom: 16,
    fontFamily: fontType.regular,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  card: {
    width: 140,
    alignItems: "center",
    backgroundColor: "#FFE0B2",
    padding: 12,
    margin: 8,
    borderRadius: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: fontType.regular,
  },
});
