
require('dotenv').config();
const ethers = require('ethers');
const Web3 = require('web3');
//const Provider = require('@truffle/hdwallet-provider');
//const Provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today');
const Provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/f5fc8a3c3929b85082f/polygon/testnet');
const contractAddr = process.env.CONTRACT_ADDR;
const Contract = require('./contracts/Contract.json');
const ownerAddr = process.env.ACCT1;
const privateKey = process.env.PRIVATE_KEY; 
//const acct2 = process.env.ACCT2; 

//For Mumbai TestNet only
const networkId = "80001";

const loadBlockChainData = async () => {
    console.log("loadblockchaindata...");

}//end loadBlockChainData

const polyBot = async () => {
    console.log("Poly Bot ready to role!");

 // Sign up for a free dedicated RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.
const NODE_URL = 'https://rpc-mumbai.matic.today';

const walletProvider = require('@truffle/hdwallet-provider');

//const provider = new Web3.providers.HttpProvider(NODE_URL);
//const web3 = new Web3(provider);
const web3 = new Web3(new walletProvider(process.env.PRIVATE_KEY,NODE_URL) )

const contract = new web3.eth.Contract(Contract, contractAddr);
//console.log("Web3 contract: ", contract );


//const owner = await contract.methods.owner().call(); //.then ((result)=> console.log("Our balance: "));
//console.log("Current Contract owner: ", owner );

const balance = await contract.methods.getBalance().call(); //.then ((result)=> console.log("Our balance: "));
console.log("Current Contract balance: ", balance );



//const receipt = await  contract.methods.depositIt().send({ from: ownerAddr });
//console.log(`Transaction hash: ${receipt.transactionHash}`);

//console.log("Current Provider: ", provider );

let r = await contract.methods.depositIt().send({
    from:ownerAddr,
    gas: 80000, 
    value: 1234500000,
}).then ( (result) => console.log("deposit result: ", result ))
  .else("Sorry Charlie...");
    
/*
    myContract_read.getBalance().then (
        (result ) => {
            console.log("balance: ", result )
        }
    )  */


    console.log("Let's wrap it up!");
    process.exit();

}//end polyBot

polyBot();