import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { colors, fontType } from "../../theme";

const RecipeDetail = ({ route }) => {
  const { category } = route.params;
  const [customRecipes, setCustomRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecipes = useCallback(() => {
    const unsubscribe = firestore()
      .collection("resep")
      .where("kategori", "==", category)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const fetched = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCustomRecipes(fetched);
        },
        (error) => {
          console.error("Firestore error:", error.message);
        }
      );
    return unsubscribe;
  }, [category]);

  useEffect(() => {
    const unsub = fetchRecipes();
    return () => unsub();
  }, [fetchRecipes]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Resep Berbahan {category}</Text>

      {customRecipes.length > 0 ? (
        customRecipes.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.recipeTitle}>{item.judul}</Text>
            <Text style={styles.subTitle}>Bahan:</Text>
            {item.bahan?.split("\n").map((bhn, idx) => (
              <Text key={idx} style={styles.ingredient}>• {bhn}</Text>
            ))}
            <Text style={styles.subTitle}>Cara Memasak:</Text>
            <Text style={styles.recipeSteps}>{item.langkah}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Belum ada resep dalam kategori ini.</Text>
      )}
    </ScrollView>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    padding: 16,
  },
  title: {
    marginTop: 38,
    fontSize: 20,
    fontWeight: "bold",
    color: "#F7944D",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: fontType.regular,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    fontFamily: fontType.CAOOLI,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    color: "#F7944D",
    fontFamily: fontType.regular,
  },
  ingredient: {
    fontSize: 14,
    color: "#444",
    marginLeft: 10,
    fontFamily: fontType.regular,
  },
  recipeSteps: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    fontFamily: fontType.regular,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontFamily: fontType.regular,
  },
});
