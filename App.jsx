import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native'; // Impor Notifee

// Fungsi untuk meminta izin notifikasi di Android (khususnya Android 13+)
async function requestUserPermissionAndroid() {
  if (Platform.OS === 'android') {
    try {
      const authStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (authStatus === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Izin notifikasi Android diberikan');
      } else {
        console.log('Izin notifikasi Android ditolak');
      }
    } catch (err) {
      console.warn('Gagal meminta izin notifikasi Android:', err);
    }
  }
}

// Fungsi untuk mendapatkan FCM token
async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token Anda:', token);
    // Di aplikasi nyata, Anda akan mengirim token ini ke server backend Anda
    // untuk dapat mengirim notifikasi ke perangkat ini.
  } catch (error) {
    console.error('Gagal mendapatkan FCM token:', error);
  }
}

// Fungsi untuk membuat channel notifikasi (diperlukan untuk Android 8.0+)
// Ini bisa dipanggil sekali saat aplikasi dimulai atau sebelum menampilkan notifikasi pertama.
// Notifee akan menangani pembuatan channel jika belum ada saat displayNotification dipanggil.
// Namun, lebih baik membuatnya secara eksplisit.
async function createNotificationChannel(channelId, channelName) {
  try {
    await notifee.createChannel({
      id: channelId,
      name: channelName,
      importance: AndroidImportance.HIGH, // Atur tingkat kepentingan
      // sound: 'default', // Opsional: suara notifikasi
    });
    console.log(`Channel notifikasi "${channelName}" berhasil dibuat/diperbarui.`);
  } catch (error) {
    console.error(`Gagal membuat channel notifikasi "${channelName}":`, error);
  }
}


export default function App() {
  useEffect(() => {
    // Meminta izin saat aplikasi dimulai (khusus Android)
    if (Platform.OS === 'android') {
      requestUserPermissionAndroid();
    }

    // Membuat channel notifikasi default untuk FCM foreground
    createNotificationChannel('fcm_foreground_channel', 'Pesan Masuk');

    // Mendapatkan FCM token
    getFCMToken();

    // Listener untuk pesan FCM yang diterima saat aplikasi di foreground
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Pesan FCM diterima di Foreground:', remoteMessage);
      
      // Menampilkan notifikasi menggunakan Notifee agar muncul di foreground
      if (remoteMessage.notification) {
        try {
          await notifee.displayNotification({
            title: remoteMessage.notification.title || 'Pesan Baru',
            body: remoteMessage.notification.body || 'Anda memiliki pesan baru.',
            android: {
              channelId: 'fcm_foreground_channel', // Gunakan channel yang sudah dibuat
              // smallIcon: 'ic_launcher', // Opsional: ganti dengan nama ikon notifikasi Anda (tanpa ekstensi)
                                          // Pastikan ikon ini ada di android/app/src/main/res/mipmap-xxxx/
              pressAction: {
                id: 'default', // Aksi default saat notifikasi ditekan
              },
              // Anda bisa menambahkan properti lain di sini sesuai kebutuhan
            },
          });
        } catch (e) {
          console.error("Gagal menampilkan notifikasi foreground dengan Notifee:", e);
          // Fallback ke Alert jika Notifee gagal
          Alert.alert(
            remoteMessage.notification.title || 'Pesan Baru',
            remoteMessage.notification.body || 'Anda memiliki pesan baru.'
          );
        }
      }
    });

    // Listener untuk ketika pengguna menekan notifikasi saat aplikasi di background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notifikasi menyebabkan aplikasi terbuka dari background:',
        remoteMessage,
      );
      // Tambahkan logika navigasi di sini jika diperlukan
      // Contoh: if (remoteMessage.data.screen) { navigation.navigate(remoteMessage.data.screen); }
    });

    // Memeriksa apakah aplikasi dibuka dari notifikasi saat aplikasi tertutup (quit state)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notifikasi menyebabkan aplikasi terbuka dari quit state:',
            remoteMessage,
          );
          // Tambahkan logika navigasi di sini jika diperlukan
        }
      });

    // Cleanup listener saat komponen di-unmount
    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
