import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { colors, fontType } from "../../theme";
import SearchBar from "../../components/SearchBar";

const categories = [
  { name: "Ayam" },
  { name: "Daging" },
  { name: "Ikan" },
  { name: "Telur" },
];

const recommendations = [
  {
    title: "Ayam Balado",
    image: require("../../assets/images/Ayam_balado.jpg"),
  },
  {
    title: "Wagyu elite",
    image: require("../../assets/images/wagyu.jpg"),
  },
  {
    title: "Ikan Bakar Madu",
    image: require("../../assets/images/IkanMadu.jpg"),
  },
];

const HomeScreen = ({ navigation }) => {
  const containerRef = useRef(null);
  const [triggerKey, setTriggerKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      if (containerRef.current) {
        containerRef.current.fadeInUp(600);
      }
      // Trigger animasi ulang kategori
      setTriggerKey((prev) => prev + 1);
    }, [])
  );

  return (
    <Animatable.View
      ref={containerRef}
      animation="fadeInUp"
      duration={600}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Masakin</Text>
        </View>

        <SearchBar />

        <View style={styles.bannerContainer}>
          <Image
            source={require("../../assets/images/Daging.jpg")}
            style={styles.bannerImage}
          />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>Masak Mudah, Lezat, dan Sehat!</Text>
          </View>
        </View>

        <View style={styles.categoryContainer} key={triggerKey}>
          {categories.map((item, index) => (
            <Animatable.View
              key={item.name}
              animation="bounceIn"
              delay={index * 200}
              useNativeDriver
            >
              <Pressable
                style={styles.categoryButton}
                onPress={() =>
                  navigation.navigate("RecipeDetail", { category: item.name })
                }
              >
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Animatable.View>
          ))}
        </View>

        <Text style={styles.recommendTitle}>Rekomendasi untuk Anda</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendations.map((item, i) => (
            <View key={i} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardText}>Resep {item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </Animatable.View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fontType.CAOOLI,
    color: "#F7944D",
  },
  bannerContainer: {
    position: "relative",
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  bannerTextContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
  },
  bannerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: fontType.regular,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#F7944D",
    height: "auto",
    width: 90,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: fontType.regular,
  },
  recommendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    fontFamily: fontType.regular,
  },
  card: {
    backgroundColor: "#fff",
    marginRight: 12,
    borderRadius: 10,
    overflow: "hidden",
    width: 140,
  },
  cardImage: {
    width: "100%",
    height: 90,
  },
  cardText: {
    padding: 8,
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    fontFamily: fontType.regular,
  },
});
