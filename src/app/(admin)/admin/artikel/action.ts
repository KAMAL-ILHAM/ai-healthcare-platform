'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk menarik semua artikel beserta nama kategorinya
export async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' }, // Urutkan dari yang paling baru
      include: {
        category: {
          select: { name: true } // Tarik nama kategori dari relasi categoryId
        },
        // Jika tabel User kamu punya kolom 'name', kamu bisa uncomment baris di bawah ini:
        // author: { select: { name: true } } 
      }
    });
    return { success: true, data: articles };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { success: false, error: "Gagal memuat data artikel dari database." };
  }
}

// Fungsi untuk menghapus artikel
export async function deleteArticle(id: string) {
  try {
    await prisma.article.delete({
      where: { id: id }
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { success: false, error: "Gagal menghapus artikel." };
  }
}

// Fungsi untuk membuat artikel baru (Pastikan ada di src/app/(admin)/admin/artikel/action.ts)
export async function createArticle(data: { 
  title: string, 
  slug: string, 
  content: string, 
  thumbnail: string, 
  categoryId: string, 
  status: string 
}) {
  try {
    const adminId = process.env.DEFAULT_ADMIN_ID;
    if (!adminId) return { success: false, error: "Konfigurasi sistem hilang (ID Admin tidak ditemukan)." };

    await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        // Jika thumbnail kosong, kirim null sesuai skema (String?)
        thumbnail: data.thumbnail === '' ? null : data.thumbnail, 
        status: data.status,
        categoryId: data.categoryId,
        authorId: adminId, 
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating article:", error);
    return { success: false, error: "Gagal menyimpan artikel. Pastikan judul/slug belum pernah digunakan." };
  }
}

// Fungsi untuk menarik 1 artikel spesifik berdasarkan ID (Untuk Form Edit)
export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: id }
    });
    return { success: true, data: article };
  } catch (error) {
    console.error("Error fetching article by id:", error);
    return { success: false, error: "Gagal memuat data artikel." };
  }
}

// Fungsi untuk menyimpan perubahan artikel (Edit)
export async function updateArticle(id: string, data: { title: string, slug: string, content: string, thumbnail: string, categoryId: string, status: string }) {
  try {
    await prisma.article.update({
      where: { id: id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        thumbnail: data.thumbnail === '' ? null : data.thumbnail,
        status: data.status,
        categoryId: data.categoryId,
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating article:", error);
    return { success: false, error: "Gagal memperbarui artikel. Pastikan slug belum digunakan." };
  }
}