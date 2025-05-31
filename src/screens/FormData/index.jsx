import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { postTambahResep } from "../../services/api";

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
        JudulTambahResep: judul,
        Bahan: bahan,
        Langkah: langkah,
        Kategori: kategori,
      };
      await postTambahResep(newResep);
      Alert.alert("Sukses", "Resep berhasil ditambahkan!");
      setJudul("");
      setBahan("");
      setLangkah("");
      setKategori("ayam");
    } catch (error) {
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan resep.");
    } finally {
      setLoading(false);
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

      <Text style={styles.judul}>Kategori</Text>
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
  },
  judul: {
    fontSize: 17,
    marginBottom: 5,
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
