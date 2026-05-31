'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }, 
      include: {
        _count: {
          select: { articles: true } 
        }
      }
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Gagal memuat kategori dari database." };
  }
}

export async function createCategory(name: string, slug: string, status: string) {
  try {
    const adminId = process.env.DEFAULT_ADMIN_ID;

    if (!adminId) {
      return { success: false, error: "Sistem belum dikonfigurasi dengan benar (ID Admin hilang)." };
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        status,
        creatorId: adminId, 
      }
    });

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Gagal menyimpan. Pastikan Nama dan Slug belum pernah digunakan." };
  }
}

// Fungsi 3: Memperbarui data kategori (Edit)
export async function updateCategory(id: string, name: string, slug: string, status: string) {
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: id },
        data: {
          name,
          slug,
          status,
        }
      });
  
      return { success: true, data: updatedCategory };
    } catch (error) {
      console.error("Error updating category:", error);
      return { success: false, error: "Gagal memperbarui. Pastikan nama/slug tidak bentrok dengan kategori lain." };
    }
  }
  
  // Fungsi 4: Menghapus data kategori (Delete)
  export async function deleteCategory(id: string) {
    try {
      await prisma.category.delete({
        where: { id: id }
      });
  
      return { success: true };
    } catch (error) {
      console.error("Error deleting category:", error);
      return { 
        success: false, 
        error: "Gagal menghapus kategori. Kategori ini mungkin sedang digunakan oleh artikel yang sudah ada." 
      };
    }
  }