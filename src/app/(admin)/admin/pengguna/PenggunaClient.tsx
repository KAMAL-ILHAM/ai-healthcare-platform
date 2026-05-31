'use client';

import { useState, useTransition } from 'react';
import { Users, ShieldCheck, User, Search, Plus, MoreVertical, Mail, X, Loader2 } from 'lucide-react';
import { tambahPenggunaAction } from './actions';

export default function PenggunaClient({ users }: { users: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState('');

  // Kalkulasi statistik
  const totalUsers = users.length;
  const staffCount = users.filter(u => u.isStaff).length;
  const regularCount = totalUsers - staffCount;

  // Fungsi untuk menangani saat tombol "Simpan" ditekan
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await tambahPenggunaAction(formData);
      if (result.success) {
        setIsModalOpen(false); // Tutup pop-up jika berhasil
      } else {
        setErrorMessage(result.error || 'Terjadi kesalahan.');
      }
    });
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manajemen Pengguna</h2>
          <p className="text-sm text-gray-500 mt-1">Kelola data pasien, akun umum, dan akses Admin.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus size={16} strokeWidth={3} />
          Tambah Pengguna
        </button>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={20} strokeWidth={2.5} /></div>
          <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Akun</p><p className="text-2xl font-black text-gray-900 leading-none mt-1">{totalUsers}</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><ShieldCheck size={20} strokeWidth={2.5} /></div>
          <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</p><p className="text-2xl font-black text-gray-900 leading-none mt-1">{staffCount}</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><User size={20} strokeWidth={2.5} /></div>
          <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pengguna Umum</p><p className="text-2xl font-black text-gray-900 leading-none mt-1">{regularCount}</p></div>
        </div>
      </div>

      {/* TABEL PENGGUNA */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search size={16} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" /></div>
            <input type="text" placeholder="Cari nama atau email..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Nama Pengguna</th>
                <th className="px-6 py-4">Status & Peran</th>
                <th className="px-6 py-4">Tanggal Bergabung</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400 italic">Belum ada data pengguna.</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${user.isStaff ? 'bg-gradient-to-br from-indigo-500 to-purple-500' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{user.name || 'Pengguna Tanpa Nama'}</p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5"><Mail size={12} />{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${user.isStaff ? 'bg-purple-50 text-purple-600 border border-purple-100/50' : 'bg-gray-100 text-gray-600 border border-gray-200/50'}`}>
                        {user.isStaff ? <ShieldCheck size={12} strokeWidth={3} /> : <User size={12} strokeWidth={3} />}
                        {user.isStaff ? 'Apoteker / Admin' : 'Pengguna Umum'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================== */}
      {/* POP-UP MODAL TAMBAH PENGGUNA               */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-black text-gray-900">Tambah Pengguna Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><X size={18} strokeWidth={3} /></button>
            </div>
            
            <form onSubmit={onSubmit} className="p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-lg">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
                <input type="text" name="name" required placeholder="Cth: Budi" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Alamat Email</label>
                <input type="email" name="email" required placeholder="budi@eiohealth.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Kata Sandi (Password)</label>
                <input type="password" name="password" required placeholder="Minimal 6 karakter" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Peran & Hak Akses</label>
                <select name="role" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                  <option value="umum">Pengguna Umum (Pasien)</option>
                  <option value="admin">Admin (Akses Dashboard)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">Batal</button>
                <button type="submit" disabled={isPending} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-70 flex justify-center items-center gap-2">
                  {isPending ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : 'Simpan Pengguna'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}