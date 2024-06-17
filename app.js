import Web3 from "web3";
import notaryContractABI from "./NotaryContractABI.json"; 
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; 
const ETH_NODE_URL = process.env.ETH_NODE_URL; 

const web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL));
const notaryContract = new web3.eth.Contract(notaryContractABI, CONTRACT_ADDRESS);

const checkWeb3Connection = async () => {
    const netId = await web3.eth.net.getId();
    return netId ? true : false;
};

const connectToEthereumNetwork = async () => {
    if (await checkWeb3Connection()) {
        console.log("Connected to Ethereum network.");
    } else {
        console.error("Failed to connect to the Ethereum network.");
    }
};

const getCurrentDocuments = async () => {
    try {
        const documents = await notaryContract.methods.getDocuments().call();
        updateUIDocumentsList(documents);
    } catch (error) {
        console.error(error);
    }
};

const addDocument = async (docHash, fromAddress) => {
    try {
        await notaryContract.methods.addDocument(docHash).send({ from: fromAddress });
        console.log("Document added successfully");
        getCurrentDocuments(); 
    } catch (error) {
        console.error("Failed to add document:", error);
    }
};

const updateUIDocumentsList = (documents) => {
    const documentsListElement = document.getElementById("documentsList");
    documentsListElement.innerHTML = ""; 

    documents.forEach(doc => {
        const listItem = document.createElement("li");
        listItem.textContent = `Document Hash: ${doc}`;
        documentsListElement.appendChild(listItem);
    });
};

connectToEthereumNetwork().then(() => getCurrentDocuments());
