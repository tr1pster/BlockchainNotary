const Web3 = require('web3');
require('dotenv').config();
let web3;
function initWeb3() {
    if(web3) return;
    const providerUrl = process.env.WEB3_PROVIDER_URL;
    if(!providerUrl) {
        console.error("Please set WEB3_PROVIDER_URL in your .env file.");
        return;
    }
    web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
    web3.eth.net.isListening()
        .then(() => console.log('Connected to Ethereum network successfully'))
        .catch(e => console.error('Failed to connect to Ethereum network:', e));
}
async function isConnected() {
    if(!web3) {
        console.error("Web3 is not initialized. Call initWeb3() first.");
        return false;
    }
    try {
        return await web3.eth.net.isListening();
    } catch {
        return false;
    }
}
module.exports = {
    initWeb3,
    isConnected,
};