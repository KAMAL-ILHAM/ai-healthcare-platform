import prisma from '@/lib/prisma'; // <-- Kembali ke import standar (tanpa kurung kurawal)
export class ChatService {
  
  // 1. Mengambil semua riwayat sesi chat milik satu user (untuk Sidebar)
  static async getUserSessions(userId: string) {
    return await prisma.chatSession.findMany({
      where: { userId, isArchived: false },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      }
    });
  }

  // 2. Membuat sesi chat baru
  static async createSession(userId: string, initialTitle: string = "Konsultasi Baru") {
    return await prisma.chatSession.create({
      data: {
        userId,
        title: initialTitle,
        updatedAt: new Date(), // <--- INI OBATNYA: Masukkan waktu saat ini secara manual
      }
    });
  }

  // 3. Mengambil isi percakapan dari satu sesi (Untuk ditampilkan di layar utama)
  static async getSessionMessages(sessionId: string, userId: string) {
    // Validasi keamanan: Pastikan sesi ini benar-benar milik user yang me-request
    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId }
    });

    if (!session) throw new Error("Unauthorized or Session Not Found");

    return await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' }, // Urutkan dari pesan tertua ke terbaru
      include: { attachments: true } // Ambil juga data file lampiran jika ada
    });
  }

  // 4. Menyimpan pesan baru ke database (Bisa pesan User atau pesan AI)
  static async saveMessage(data: { sessionId: string; role: string; content: string }) {
    const message = await prisma.chatMessage.create({
      data: {
        sessionId: data.sessionId,
        role: data.role,
        content: data.content,
      }
    });

    // Otomatis update 'updatedAt' pada ChatSession agar naik ke urutan teratas di Sidebar
    await prisma.chatSession.update({
      where: { id: data.sessionId },
      data: { updatedAt: new Date() }
    });

    return message;
  }
}