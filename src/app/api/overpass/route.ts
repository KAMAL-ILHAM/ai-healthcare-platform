import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Menangkap query pencarian dari frontend
    const body = await req.text();

    // Vercel meminta data ke Overpass dengan identitas resmi
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        // Memberikan identitas aplikasi agar Overpass tidak menolak (406)
        'User-Agent': 'EIOHealth-App/1.0 (Kelompok 11 - Proyek Akademik)' 
      },
      body: body,
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Ditolak oleh Overpass: ${response.status}` }, { status: response.status });
    }

    // Mengembalikan hasil json ke web
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('[OVERPASS_ERROR]', error);
    return NextResponse.json({ error: 'Gagal mengambil data dari server Overpass' }, { status: 500 });
  }
}