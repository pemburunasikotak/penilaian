import React from 'react';

const styles = {
  container: {
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem',
    border: '1px solid #ffcdd2',
    textAlign: 'center',
  }
};

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div style={styles.container}>
      {message}
    </div>
  );
};

export default ErrorMessage;
