// screens/HomeScreen.jsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang di Dapur Pintar!</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate("CookingTips")}>
        <Text style={styles.buttonText}>Tips Memasak</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => navigation.navigate("Recipe")}>
        <Text style={styles.buttonText}>Resep Masakan</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#F7944D",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#F7944D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
