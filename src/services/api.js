
// MAPPING KELAS KE SPREADSHEET ID
const SHEET_IDS = {
  'DC-A': '1KniwOwOLU895ZUkOcJrPMpzabO9Dlnd8I8NwMp_jGzM',
  'DC-B': '1CgH7NX6UDvfK3pkIPc3Xy0LYFMU2D9skQaMSeuzA74g',
  'DC-C': '1QZMGK8_AjpcFcPPFO7oYfnmCMQlq5zoeGIzEfII5iyg',
  // Placeholder untuk kelas selanjutnya jika ada
  'DC-D': '1i6pAcHsdsR9iyzn4KjtOPZjdKlb51p1-y5qL2TSODsI', 
  'K3-A': '1XK3dq6lCVG-fNR5o_vfCYZfjf2fBCvkdMpMomuAVKAQ', 
  'K3-B': '18Y_1z9sIjbx9ODPjRsn1dlYYPcAKiC1oZ_9jpI-daC4', 
  'K3-C': '1_wYv5NyGnACBOrfYZrmf2rYHYxAU-howYK5edzbDmxU', 
  'K3-D': '1hCruRZ26HeKGaceZ-5Ifi6-0Up5T7Lqq_zYlSJ-Ogog', 
};


// API KEY (Harus diamankan dengan HTTP Referrer restriction di Google Cloud Console)
// User perlu mengganti ini dengan API Key mereka yang valid
// const API_KEY = 'c7d37143343331bd99806dc8c443db4dfd8df916'; 
const API_KEY = 'AIzaSyDI1A5vO38i_D4W5ri8BJdhwICeQRqWWpE'; 

// Set ke false untuk menggunakan data dari Google Sheets
const USE_MOCK_DATA = false;

// Mock Data updated to match new structure for fallback testing
const mockDb = {
  'DC1': [
    { nrp: '124040073', nama: 'Dewangga Bintang', tugas: 80, quis1: 50, quis2: 0, uts: 23.75, uas: 0, akhir: 9.75 },
    { nrp: '125040059', nama: 'A.m. Ghazi Alfaridzi', tugas: 82.25, quis1: 50, quis2: 0, uts: 86, uas: 81, akhir: 79.65 },
  ]
};

export const fetchStudentGrade = async (nrp, kelas) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (USE_MOCK_DATA) {
    console.log(`[MOCK] Searching Class ${kelas} for NRP ${nrp}`);
    const classData = mockDb[kelas];
    if (!classData) throw new Error(`Data kelas ${kelas} tidak tersedia di Mock Data.`);
    
    const student = classData.find(s => s.nrp === nrp);
    return student || null;
  }

  // REAL IMPLEMENTATION
  const spreadsheetId = SHEET_IDS[kelas];
  if (!spreadsheetId) throw new Error(`ID Spreadsheet untuk kelas ${kelas} belum dikonfigurasi.`);

    // 1. Fetch Metadata to get the Sheet Name (Tab Name)
    const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${API_KEY}`;
    const metaResponse = await fetch(metaUrl);
    
    if (!metaResponse.ok) {
       const err = await metaResponse.json();
       throw new Error(err.error?.message || 'Gagal mengambil metadata Spreadsheet.');
    }

    const metaData = await metaResponse.json();
    const sheetName = metaData.sheets?.[0]?.properties?.title; // Get first sheet's name

    if (!sheetName) throw new Error("Tidak dapat menemukan nama Sheet (Tab).");

    // 2. Fetch Values using the dynamic sheet name
    // Range: Dari D (NRP) sampai AB (Nilai Huruf), mulai baris 3
    const range = `'${sheetName}'!D3:AB`; 
    const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;

    const response = await fetch(dataUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'Gagal mengambil data nilai.');
    }

    const result = await response.json();
    const rows = result.values;

    if (!rows || rows.length === 0) {
      return null;
    }

    // Index Mapping (Relative to Range D:AB)
    // Range starts at Column D (Index 0 in 'rows' result)
    // D -> 0 (NRP)
    // ...
    // V is column 21 (0-based from A). D is 3. So V relative to D is 21 - 3 = 18.
    // X is column 23. Relative: 23 - 3 = 20.
    // Y is column 24. Relative: 24 - 3 = 21.
    // Z is column 25. Relative: 25 - 3 = 22.
    // AA is column 26. Relative: 26 - 3 = 23.
    // AB is column 27. Relative: 27 - 3 = 24.

    const studentRow = rows.find(row => {
      // Index 0 here corresponds to Column D (NRP)
      return row[0] && row[0].toString().replace(/['"`]/g, '').trim() === nrp.toString().trim();
    });

    if (studentRow) {
      const val = (idx) => studentRow[idx] || '0';

      return {
        nrp: val(0),              // Col D
        nama: val(1),             // Col E (Relative 1)
        quis1: val(18),           // Col V (Relative 18) - Quis
        quis2: "-",               // Not specified in new mapping
        tugas: val(20),           // Col X (Relative 20)
        uts: val(21),             // Col Y (Relative 21)
        uas: val(22),             // Col Z (Relative 22)
        akhir: val(23),           // Col AA (Relative 23)
        huruf: val(24)            // Col AB (Relative 24)
      };
    }
    
    return null;

  // } catch (error) {
  //   console.error("API Error:", error);
  //   throw error;
  // }
};
