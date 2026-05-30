import { jwtVerify, SignJWT } from 'jose';

// Mengambil secret dari .env dan mengubahnya menjadi format byte (Uint8Array) standar kriptografi
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is missing');
  return new TextEncoder().encode(secret);
};

// Fungsi memverifikasi token yang masuk dari request client
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload; // Mengembalikan data seperti { userId, role, email }
  } catch (error) {
    return null; // Token tidak valid atau sudah kadaluarsa
  }
}

// Fungsi membuat token saat user berhasil login
export async function signToken(payload: { userId: string; role: string; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Algoritma hashing HMAC SHA-256
    .setIssuedAt()
    .setExpirationTime('7d') // Sesi login valid selama 7 hari
    .sign(getJwtSecretKey());
}