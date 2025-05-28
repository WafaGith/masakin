import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const FormData = () => {
  const [judul, setJudul] = useState("");
  const [bahan, setBahan] = useState("");
  const [langkah, setLangkah] = useState("");

  const handleSubmit = () => {
    if (judul && bahan && langkah) {
      Alert.alert("Resep Ditambahkan", `Judul: ${judul}`);
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
    <Text style={styles.judul}>Judul Resep</Text>
      <TextInput
        style={styles.input}
        placeholder="Judul Resep"
        value={judul}
        onChangeText={setJudul}
      />
      <Text style={styles.judul}>Bahan Bahan</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Bahan-bahan"
        multiline
        numberOfLines={4}
        value={bahan}
        onChangeText={setBahan}
      />
      <Text style={styles.judul}>Langkah Memasak</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Langkah Memasak"
        multiline
        numberOfLines={4}
        value={langkah}
        onChangeText={setLangkah}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Simpan Resep</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FormData;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF8F0",
    flexGrow: 1,
  },
  judul:{
    fontSize: 17,
  },
  title: {
    marginTop: 50,
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#F7944D",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
