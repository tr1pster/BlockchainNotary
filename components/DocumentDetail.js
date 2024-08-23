import React, { useState, useEffect } from 'react';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DocumentDetailComponent = ({ selectedDocumentId }) => {
  const [documentDetails, setDocumentDetails] = useState(null);

  const fetchDocumentDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/${selectedDocumentId}`);
      const data = await response.json();
      setDocumentDetails(data);
    } catch (error) {
      console.error('Failed to fetch document details:', error);
    }
  };

  const signDocument = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/sign/${selectedDocumentId}`, { method: 'POST' });
      const result = await response.json();
      alert(result.message);
      fetchDocumentDetails();
    } catch (error) {
      console.error('Failed to sign the document:', error);
    }
  };

  const verifyDocument = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/verify/${selectedDocumentId}`, { method: 'GET' });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Failed to verify the document:', error);
    }
  };

  useEffect(() => {
    if (selectedDocumentId) {
      fetchDocumentDetails();
    }
  }, [selectedDocumentId]);

  return (
    <div>
      {documentDetails ? (
        <div>
          <h2>Document Details</h2>
          <p><b>Title:</b> {documentDetails.title}</p>
          <p><b>Description:</b> {documentDetails.description}</p>
          <p><b>Status:</b> {documentDetails.status}</p>
          <p><b>Hash:</b> {documentDetails.hash}</p>
          <p><b>Signees:</b> {documentDetails.signees.join(', ')}</p>
          <button onClick={signDocument}>Sign Document</button>
          <button onClick={verifyDocument}>Verify Document</button>
        </div>
      ) : (
        <p>No document selected or details available.</p>
      )}
    </div>
  );
};

export default DocumentDetailComponent;