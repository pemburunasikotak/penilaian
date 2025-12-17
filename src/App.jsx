import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import GradeResult from './components/GradeResult';
import ErrorMessage from './components/ErrorMessage';
import { fetchStudentGrade } from './services/api';

const styles = {
  app: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '0 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#1a237e',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
  },
  footer: {
    marginTop: '60px',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#888',
  }
};

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (nrp, kelas) => {
    setLoading(true);
    setError('');
    setResult(null);
    setHasSearched(true);

    try {
      const data = await fetchStudentGrade(nrp, kelas);
      if (data) {
        // Inject kelas info into display data
        setResult({ ...data, kelas });
      } else {
        // Not found case handled by showing specific error message
        setError('Data nilai mahasiswa tidak ditemukan.');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memproses data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title}>Sistem Penilaian Mahasiswa</h1>
        <p style={styles.subtitle}>Cek hasil evaluasi akademik Anda secara mandiri</p>
      </header>
      
      <main>
        <SearchForm onSearch={handleSearch} isLoading={loading} />
        
        {error && <ErrorMessage message={error} />}
        
        {result && <GradeResult data={result} />}
      </main>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Universitas Akademik. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
