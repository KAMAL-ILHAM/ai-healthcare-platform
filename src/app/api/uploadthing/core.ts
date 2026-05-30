import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/utils/auth";
import { prisma } from "@/lib/db";
import { DocumentParserService } from "@/app/services/document-parser.service";
import { FileType } from "@prisma/client";

const f = createUploadthing();

// Fungsi untuk mengecek sesi user sebelum upload diizinkan
const authGuard = async () => {
  const token = cookies().get("auth_token")?.value;
  if (!token) throw new UploadThingError("Unauthorized");
  
  const user = await verifyToken(token);
  if (!user) throw new UploadThingError("Invalid Token");

  return { userId: user.userId as string };
};

export const ourFileRouter = {
  // Rute khusus untuk lampiran medis (Medical Attachments)
  medicalAttachment: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 1 }, 
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB", maxFileCount: 1 } // Format DOCX
  })
    .middleware(async ({ req }) => {
      // 1. Validasi keamanan sebelum file diterima
      const user = await authGuard();
      
      // Ambil messageId dari header custom yang dikirim frontend saat upload
      const messageId = req.headers.get("x-message-id");
      if (!messageId) throw new UploadThingError("Message ID diperlukan");

      return { userId: user.userId, messageId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // 2. File berhasil masuk ke Cloud. Sekarang kita proses di Backend.
      console.log(`[UPLOAD_SUCCESS] File ${file.name} uploaded by User ${metadata.userId}`);

      let fileType: FileType = 'IMAGE';
      let extractedText: string | null = null;

      // 3. Tentukan Tipe File & Ekstrak Teks Otomatis
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      if (extension === 'pdf') {
        fileType = 'PDF';
        extractedText = await DocumentParserService.parsePDF(file.url);
      } else if (extension === 'docx' || extension === 'doc') {
        fileType = 'WORD';
        extractedText = await DocumentParserService.parseWord(file.url);
      } else {
        fileType = 'IMAGE';
        // Gambar tidak diekstrak teksnya di sini; URL dikirim ke DeepSeek sebagai lampiran file
      }

      // 4. Simpan ke Database Prisma
      await prisma.attachment.create({
        data: {
          messageId: metadata.messageId,
          fileName: file.name,
          fileKey: file.key,
          fileUrl: file.url,
          fileSize: file.size,
          fileType: fileType,
          extractedText: extractedText, // Jika gambar, ini akan bernilai null
        }
      });

      // 5. Kembalikan URL ke Frontend
      return { fileUrl: file.url, fileType };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;