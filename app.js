import Web3 from "web3";
import notaryContractABI from "./NotaryContractABI.json";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ETH_NODE_URL = process.env.ETH_NODE_URL;
const web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL));
const notaryContract = new web3.eth.Contract(notaryContractABI, CONTRACT_ADDRESS);

const checkWeb3Connection = async () => {
    try {
        const netId = await web3.eth.net.getId();
        return !!netId;
    } catch (error) {
        console.error("Error checking Web3 connection:", error);
        return false;
    }
};