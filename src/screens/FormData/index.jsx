import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator, // Pastikan ActivityIndicator diimpor
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import notifee, { AndroidImportance } from '@notifee/react-native';
import { colors, fontType } from "../../theme"; // pastikan file theme sudah benar

const kategoriOptions = ["ayam", "daging", "ikan", "tahu", "telur", "tempe"];

const FormData = ({ navigation }) => { // Asumsi navigation prop diteruskan jika diperlukan
  const [judul, setJudul] = useState("");
  const [bahan, setBahan] = useState("");
  const [langkah, setLangkah] = useState("");
  const [kategori, setKategori] = useState("ayam");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fungsi untuk menampilkan notifikasi lokal
  const tampilkanNotifikasiLokal = async (title, body) => {
    try {
      // 1. Meminta izin (wajib untuk Android 13+)
      await notifee.requestPermission();

      // 2. Membuat channel (wajib untuk Android 8.0+)
      const channelId = await notifee.createChannel({
        id: 'resep-sukses', // ID unik untuk channel
        name: 'Notifikasi Penambahan Resep', // Nama channel yang terlihat oleh pengguna
        importance: AndroidImportance.HIGH, // Tingkat kepentingan notifikasi
        // sound: 'default', // Suara notifikasi default
      });

      // 3. Menampilkan notifikasi
      await notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId: channelId,
          // smallIcon: 'ic_launcher', // Opsional: nama ikon kecil (tanpa ekstensi) dari drawable
          pressAction: {
            id: 'default', // Aksi default saat notifikasi ditekan (membuka aplikasi)
          },
        },
      });
    } catch (error) {
      console.error("Gagal menampilkan notifikasi:", error);
      // Anda bisa menambahkan Alert di sini jika ingin memberi tahu pengguna tentang kegagalan notifikasi
    }
  };

  const handleSubmit = async () => {
    if (!judul || !bahan || !langkah || !kategori) {
      Alert.alert("Error", "Mohon lengkapi semua field.");
      return;
    }

    setLoading(true); // Pindahkan setLoading ke awal
    try {
      const newResep = {
        judul,
        bahan,
        langkah,
        kategori,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection("resep").add(newResep);

      // Panggil fungsi untuk menampilkan notifikasi lokal
      await tampilkanNotifikasiLokal(
        'Resep Berhasil Ditambahkan! 🎉',
        `Resep "${judul}" sekarang ada di daftar masakanmu.`
      );

      Alert.alert("Sukses", "Resep berhasil ditambahkan!");
      setJudul("");
      setBahan("");
      setLangkah("");
      setKategori("ayam");
      // Jika Anda ingin kembali ke layar sebelumnya setelah sukses:
      // if (navigation) {
      //   navigation.goBack();
      // }
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

      {/* Tampilkan ActivityIndicator saat loading */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary || '#F7944D'} />
        </View>
      )}
    </ScrollView>
  );
};

export default FormData;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF8F0", // Warna latar belakang dari tema Anda
    flexGrow: 1,
  },
  title: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: "bold",
    color: "#F7944D",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: fontType.regular, // Font dari tema Anda
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.textDark || "#212121", // Warna teks gelap dari tema Anda
    fontFamily: fontType.regular,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey || "#ccc", // Warna abu-abu dari tema Anda
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: colors.textLight || "#FFFFFF", // Warna teks terang (untuk latar input)
    fontFamily: fontType.regular,
    color: colors.textDark || "#212121",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top", // Agar teks dimulai dari atas pada multiline
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.grey || "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.textLight || "#FFFFFF",
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.textDark || "#333",
    fontFamily: fontType.regular,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: colors.grey || "#ccc",
    borderRadius: 8,
    backgroundColor: colors.textLight || "#FFFFFF",
    marginBottom: 15,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background || "#eee", // Warna latar (untuk pemisah)
  },
  optionText: {
    fontSize: 16,
    fontFamily: fontType.regular,
    color: colors.textDark || "#333",
  },
  button: {
    backgroundColor: "#F7944D",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: colors.textLight || "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: fontType.bold || fontType.regular, // Font tebal jika ada
  },
  // Gaya untuk loading overlay
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // Membuat view menutupi seluruh layar
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Latar belakang semi-transparan
    justifyContent: 'center',
    alignItems: 'center',
  },
});
