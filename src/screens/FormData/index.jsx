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
import firestore from "@react-native-firebase/firestore";
import { colors, fontType } from "../../theme"; // pastikan file theme sudah benar

const kategoriOptions = ["ayam", "daging", "ikan", "tahu", "telur", "tempe"];

const FormData = () => {
  const [judul, setJudul] = useState("");
  const [bahan, setBahan] = useState("");
  const [langkah, setLangkah] = useState("");
  const [kategori, setKategori] = useState("ayam");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!judul || !bahan || !langkah || !kategori) {
      Alert.alert("Error", "Mohon lengkapi semua field.");
      return;
    }

    try {
      setLoading(true);

      const newResep = {
        judul,
        bahan,
        langkah,
        kategori,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection("resep").add(newResep);

      Alert.alert("Sukses", "Resep berhasil ditambahkan!");
      setJudul("");
      setBahan("");
      setLangkah("");
      setKategori("ayam");
    } catch (error) {
      console.error("Firestore error:", error);
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan resep.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Form Tambah Resep</Text>

      <Text style={styles.label}>Judul Resep</Text>
      <TextInput
        style={styles.input}
        placeholder="Judul Resep"
        value={judul}
        onChangeText={setJudul}
      />

      <Text style={styles.label}>Bahan-bahan</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Masukkan bahan-bahan..."
        multiline
        numberOfLines={4}
        value={bahan}
        onChangeText={setBahan}
      />

      <Text style={styles.label}>Langkah Memasak</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Masukkan langkah-langkah memasak..."
        multiline
        numberOfLines={4}
        value={langkah}
        onChangeText={setLangkah}
      />

      <Text style={styles.label}>Kategori</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.dropdownText}>{kategori}</Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownOptions}>
          {kategoriOptions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setKategori(item);
                setShowDropdown(false);
              }}
              style={styles.option}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Menyimpan..." : "Simpan Resep"}
        </Text>
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
  title: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: "bold",
    color: "#F7944D",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: fontType.regular,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: fontType.regular,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontFamily: fontType.regular,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
    fontFamily: fontType.regular,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    fontFamily: fontType.regular,
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
