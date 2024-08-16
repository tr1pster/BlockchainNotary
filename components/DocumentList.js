import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentListComponent = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const viewDocument = (documentId) => {
    console.log(`Viewing document with id: ${documentId}`);
  };

  const signDocument = (documentId) => {
    console.log(`Signing document with id: ${documentId}`);
  };

  return (
    <div className="documentList">
      <h2>Registered Documents</h2>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <div>
                <strong>{doc.title}</strong> by {doc.author} ({new Date(doc.timestamp).toLocaleString()})
              </div>
              <div>
                <button onClick={() => viewDocument(doc.id)}>View</button>
                <button onClick={() => signDocument(doc.id)}>Sign</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents have been registered yet.</p>
      )}
    </div>
  );
};

export default DocumentListComponent;