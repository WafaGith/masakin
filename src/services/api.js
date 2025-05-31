const BASE_URL = 'https://68373883664e72d28e4401f5.mockapi.io/api';

// --- TambahResep ---

// GET semua TambahResep
export async function getTambahResep() {
  const response = await fetch(`${BASE_URL}/TambahResep`);
  if (!response.ok) throw new Error('Gagal mengambil data TambahResep dari server');
  return response.json();
}

// GET TambahResep berdasarkan ID
export async function getTambahResepByKategori(Kategori) {
  const response = await fetch(`${BASE_URL}/TambahResep/${Kategori}`);
  if (!response.ok) throw new Error('Gagal mengambil data TambahResep berdasarkan Category');
  return response.json();
}

// POST TambahResep baru
export async function postTambahResep(data) {
  const response = await fetch(`${BASE_URL}/TambahResep`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      JudulTambahResep: data.JudulTambahResep,
      Bahan: data.Bahan,
      Langkah: data.Langkah,
      Kategori: data.Kategori,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) throw new Error('Gagal mengirim data TambahResep ke server');
  return response.json();
}

// PUT update TambahResep berdasarkan ID
export async function putTambahResep(id, data) {
  const response = await fetch(`${BASE_URL}/TambahResep/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      JudulTambahResep: data.JudulTambahResep,
      Bahan: data.Bahan,
      Langkah: data.Langkah,
      Kategori: data.Kategori,
    }),
  });

  if (!response.ok) throw new Error('Gagal mengupdate data TambahResep');
  return response.json();
}

// DELETE TambahResep berdasarkan ID
export async function deleteTambahResep(id) {
  const response = await fetch(`${BASE_URL}/TambahResep/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Gagal menghapus data TambahResep');
  return response.json();
}
