import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentListComponent = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    retrieveDocuments();
  }, []);

  const retrieveDocuments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error retrieving documents:', error);
    }
  };

  const handleViewDocument = (documentId) => {
    console.log(`Viewing document ID: ${documentId}`);
  };

  const handleSignDocument = (documentId) => {
    console.log(`Signing document ID: ${documentId}`);
  };

  return (
    <div className="documentList">
      <h2>Registered Documents</h2>
      {documents.length > 0 ? (
        <ul>
          {documents.map((document) => (
            <li key={document.id}>
              <div>
                <strong>{document.title}</strong> by {document.author} ({new Date(document.timestamp).toLocaleString()})
              </div>
              <div>
                <button onClick={() => handleViewDocument(document.id)}>View</button>
                <button onClick={() => handleSignDocument(document.id)}>Sign</button>
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