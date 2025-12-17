import React, { useState } from 'react';

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3f51b5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#9fa8da',
    cursor: 'not-allowed',
  }
};

const SearchForm = ({ onSearch, isLoading }) => {
  const [nrp, setNrp] = useState('');
  const [kelas, setKelas] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nrp && kelas) {
      onSearch(nrp, kelas);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="nrp">NRP Mahasiswa</label>
        <input
          style={styles.input}
          type="text"
          id="nrp"
          value={nrp}
          onChange={(e) => setNrp(e.target.value.replace(/\D/g, ''))} // Only allow numbers
          placeholder="Masukkan NRP (hanya angka)"
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="kelas">Pilih Kelas</label>
        <select
          style={styles.select}
          id="kelas"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
          required
        >
          <option value="">-- Pilih Kelas --</option>
          {['DC-A', 'DC-B', 'DC-C', 'DC-D', 'K3-A', 'K3-B', 'K3-C', 'K3-D'].map((k) => (
            <option key={k} value={k}>Kelas {k}</option>
          ))}
        </select>
      </div>

      <button 
        style={isLoading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        type="submit" 
        disabled={isLoading}
      >
        {isLoading ? 'Mencari...' : 'Cari Nilai'}
      </button>
    </form>
  );
};

export default SearchForm;
