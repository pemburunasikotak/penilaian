import React from 'react';

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginTop: '20px',
  },
  header: {
    marginBottom: '15px',
    borderBottom: '2px solid #3f51b5',
    paddingBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px 8px',
    backgroundColor: '#e8eaf6',
    borderBottom: '1px solid #ddd',
    color: '#3f51b5',
  },
  td: {
    padding: '12px 8px',
    borderBottom: '1px solid #ddd',
  },
  totalRow: {
    fontWeight: 'bold',
    backgroundColor: '#fafafa',
  }
};

const maskName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => {
    if (word.length <= 1) return word;
    return word[0] + '*'.repeat(word.length - 1);
  }).join(' ');
};

const GradeResult = ({ data }) => {
  if (!data) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Hasil Penilaian Mahasiswa</h2>
        <p><strong>Nama:</strong> {maskName(data.nama)}</p>
        <p><strong>NRP:</strong> {data.nrp}</p>
        <p><strong>Kelas:</strong> {data.kelas}</p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Komponen Penilaian</th>
            <th style={styles.th}>Nilai</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>Tugas</td>
            <td style={styles.td}>{data.tugas}</td>
          </tr>
          <tr>
            <td style={styles.td}>Kuis</td>
            <td style={styles.td}>{data.quis1}</td>
          </tr>
          <tr>
            <td style={styles.td}>UTS</td>
            <td style={styles.td}>{data.uts}</td>
          </tr>
          <tr>
            <td style={styles.td}>UAS</td>
            <td style={styles.td}>{data.uas}</td>
          </tr>
          <tr style={styles.totalRow}>
            <td style={styles.td}>Nilai Akhir</td>
            <td style={styles.td}>{data.akhir} ({data.huruf})</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GradeResult;
