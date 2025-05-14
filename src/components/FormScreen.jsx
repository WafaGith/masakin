import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";

const FormScreen = () => {
  const [judul, setJudul] = useState("");
  const [bahan, setBahan] = useState("");
  const [langkah, setLangkah] = useState("");

  const handleSubmit = () => {
    if (judul && bahan && langkah) {
      Alert.alert("Resep Ditambahkan", `Judul: ${judul}`);
      // Reset form
      setJudul("");
      setBahan("");
      setLangkah("");
    } else {
      Alert.alert("Error", "Mohon lengkapi semua field.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Form Tambah Resep</Text>

      <TextInput
        style={styles.input}
        placeholder="Judul Resep"
        value={judul}
        onChangeText={setJudul}
      />
      <TextInput
        style={styles.input}
        placeholder="Bahan-bahan"
        multiline
        numberOfLines={4}
        value={bahan}
        onChangeText={setBahan}
      />
      <TextInput
        style={styles.input}
        placeholder="Langkah Memasak"
        multiline
        numberOfLines={4}
        value={langkah}
        onChangeText={setLangkah}
      />

      <Button title="Simpan Resep" onPress={handleSubmit} color="#F7944D" />
    </ScrollView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF8F0",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F7944D",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});
