import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const tips = [
  {
    id: 1,
    title: "Gunakan Pisau yang Tajam",
    content: "Pisau tajam lebih aman daripada pisau tumpul karena meminimalkan slip saat memotong.",
  },
  {
    id: 2,
    title: "Panaskan Wajan Sebelum Memasak",
    content: "Memastikan wajan panas sebelum memasak akan mencegah makanan menempel dan membantu karamelisasi.",
  },
  {
    id: 3,
    title: "Cicipi Masakanmu",
    content: "Selalu cicipi sebelum disajikan. Koreksi rasa saat memasak sangat penting.",
  },
  {
    id: 4,
    title: "Gunakan Bahan Segar",
    content: "Bahan segar membuat rasa masakan lebih nikmat dan sehat.",
  },
  {
    id: 5,
    title: "Jangan Terlalu Sering Membolak-balik",
    content: "Biarkan makanan memasak sempurna di satu sisi sebelum dibalik untuk hasil terbaik.",
  },
];

const CookingTipsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tips Memasak</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {tips.map((tip) => (
          <View key={tip.id} style={styles.card}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipContent}>{tip.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F7944D",
    textAlign: "center",
    marginBottom: 20,
  },
  scroll: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  tipContent: {
    fontSize: 16,
    color: "#555",
  },
});

export default CookingTipsScreen;
