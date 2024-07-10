require('dotenv').config();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const NotaryContract = require('./build/contracts/Notary.json');

const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_API_KEY;
const network = process.env.NETWORK;

const provider = new HDWalletProvider(mnemonic, `https://${network}.infura.io/v3/${infuraKey}`);
const web3 = new Web3(provider);

const deployAndInteract = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(`Attempting to deploy from account: ${accounts[0]}`);

    const contract = new web3.eth.Contract(NotaryContract.abi);

    const deployedContract = await contract.deploy({
        data: NotaryContract.bytecode
    }).send({
        from: accounts[0],
        gas: '1000000'
    });

    console.log(`Contract deployed to address: ${deployedContract.options.address}`);
    
    const storeValue = 123; 
    
    console.log(`Storing value ${storeValue} to the contract.`);
    
    await deployedContract.methods.store(storeValue).send({from: accounts[0]});
    console.log('Value stored successfully.');

    const retrievedValue = await deployedContract.methods.retrieve().call();
    console.log(`Retrieved value from the contract: ${retrievedValue}`);

    provider.engine.stop();
};

deployAndInteract().catch(error => {
    console.error("Error deploying and interacting with contract: ", error);
    process.exit(1);
});