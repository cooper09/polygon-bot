
require('dotenv').config();
const ethers = require('ethers');
const Web3 = require('web3');
//
const contractAddr = process.env.CONTRACT_ADDR;
const Contract = require('./contracts/Contract.json');
const ownerAddr = process.env.ACCT1;
const privateKey = process.env.PRIVATE_KEY; 
//const acct2 = process.env.ACCT2; 

const polyBot = async () => {
    console.log("Poly Bot ready to role!");

// RPC Connection
const NODE_URL = 'https://rpc-mumbai.matic.today';

//Connect Truffle wallet
const walletProvider = require('@truffle/hdwallet-provider');
const web3 = new Web3(new walletProvider(process.env.PRIVATE_KEY,NODE_URL) )

//Create web3 contract
const contract = new web3.eth.Contract(Contract, contractAddr);
//console.log("Web3 contract: ", contract );

//Read txs
const owner = await contract.methods.owner().call(); //.then ((result)=> console.log("Our balance: "));
console.log("Current Contract owner: ", owner );

const balance = await contract.methods.getBalance().call(); //.then ((result)=> console.log("Our balance: "));
console.log("Current Contract balance: ", balance );

//Write tx
try {
    const receipt = await  contract.methods.depositIt().send({ 
        from: ownerAddr,
        gas: 80000,
        value: 11111, 
        }).then( (receipt) =>  {
            console.log(`Transaction hash: ${receipt.transactionHash}`);
        })
    } catch (e){
        console.log("Bombs away: ", e );
    }
//const signer = Provider.getSigner();

    const newBalance = await contract.methods.getBalance().call();
    console.log("New Balance: ", balance );

    //process.exit();

}//end polyBot

setInterval (
    polyBot, 
    3000
    );
