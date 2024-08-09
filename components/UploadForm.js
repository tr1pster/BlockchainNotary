import React, {useState} from 'react';
import {ethers} from 'ethers';

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
            reader.onloadend = async function() {
                const buf = buffer.Buffer(reader.result);
                const fileHash = ethers.utils.keccak256(buf);

                const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                const signer = provider.getSigner();
                
                const contract = new ethers.Contract(contractAddress, JSON.parse(contractABI), signer);

                const transaction = await contract.registerDocument(fileHash);
                await transaction.wait();
                setMessage('Document successfully registered on the blockchain.');
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