import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export class DocumentParserService {
  
  /**
   * Mengunduh file dari URL (S3/UploadThing) ke dalam bentuk Buffer memori sementara
   */
  private static async fetchFileBuffer(url: string): Promise<Buffer> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Gagal mengunduh file dari ${url}`);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   * Mengekstrak teks dari file PDF
   */
  static async parsePDF(fileUrl: string): Promise<string> {
    try {
      const buffer = await this.fetchFileBuffer(fileUrl);
      const data = await pdfParse(buffer);
      // Bersihkan spasi dan enter yang berlebihan agar AI lebih mudah membaca
      return data.text.replace(/\s+/g, ' ').trim();
    } catch (error) {
      console.error('[PDF_PARSE_ERROR]', error);
      throw new Error('Gagal mengekstrak teks dari PDF medis.');
    }
  }

  /**
   * Mengekstrak teks dari file Word (.docx)
   */
  static async parseWord(fileUrl: string): Promise<string> {
    try {
      const buffer = await this.fetchFileBuffer(fileUrl);
      const result = await mammoth.extractRawText({ buffer });
      return result.value.replace(/\s+/g, ' ').trim();
    } catch (error) {
      console.error('[WORD_PARSE_ERROR]', error);
      throw new Error('Gagal mengekstrak teks dari dokumen Word.');
    }
  }
}