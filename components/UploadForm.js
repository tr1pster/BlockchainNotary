import React, { useState } from 'react';
import { ethers } from 'ethers';
import buffer from 'buffer';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contractABI = process.env.REACT_APP_CONTRACT_ABI;

const DocumentUploadForm = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const submitDocument = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    if (!reader.result) {
                        throw new Error("File reading failed");
                    }
                    const buf = buffer.Buffer.from(reader.result);
                    const fileHash = ethers.utils.keccak256(buf);

                    if (!window.ethereum) {
                        throw new Error("Ethereum object doesn't exist in your browser");
                    }

                    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                    await provider.send("eth_requestAccounts", []); 
                    const signer = provider.getSigner();
                    
                    const contract = new ethers.Contract(contractAddress, JSON.parse(contractABI), signer);
                    if (!contract) {
                        throw new Error("Failed to load contract");
                    }

                    const transaction = await contract.registerDocument(fileHash);
                    await transaction.wait();
                    setMessage('Document successfully registered on the blockchain.');
                } catch (innerError) {
                    console.error('Error processing document:', innerError);
                    setMessage('Error processing document. See console for details.');
                }
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error registering document:', error);
            setMessage('Error registering document. See console for details.');
        }
    };

    return (
        <div>
            <h2>Upload Document for Notarization</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={submitDocument}>Submit Document</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DocumentUploadForm;