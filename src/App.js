import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [blockTr, setBlockWithTransactions] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  useEffect(() => {
    async function getBlock() {
        setBlock(await alchemy.core.getBlock(blockNumber));
    }

    getBlock();
  }, [blockNumber]);

  useEffect(() => {
    async function getBlockWithTransactions() {

        setBlockWithTransactions(await alchemy.core.getBlockWithTransactions(blockNumber));


    }
    getBlockWithTransactions();

  }, [blockNumber]);


    return (
    <div className="App">
      <p>Block Number: {blockNumber} </p>
      {block &&<div>
          <p>Block Hash: {block.hash}</p>
          <p>Timestamp: {block.timestamp}</p>
          <p>Nonce: {block.nonce}</p>
          <p>Parent Hash: {block.parentHash}</p>
       <p>Miner: {block.miner}</p>
        </div>}

        {blockTr &&<div>
          <p>Block Transactions index 0's Hash!: {blockTr.transactions[0].hash}</p>
          <p>To: {blockTr.transactions[0].to}</p>
          <p>From: {blockTr.transactions[0].from}</p>
          <p>Value: {blockTr.transactions[0].value.toString()}</p>
          <p>Data: {blockTr.transactions[0].data.toString()}</p>
        </div>}
    </div>
  );}


  



// function App() {
//   const [blockNumber, setBlockNumber] = useState();

//   useEffect(() => {
//     async function getBlockNumber() {
//       setBlockNumber(await alchemy.core.getBlockNumber());
//     }

//     getBlockNumber();
//   });

//   useEffect(() => {
//     async function getBlock() {
//       if (blockNumber) {
//         setBlock(await alchemy.core.getBlock(blockNumber));
//       }
//     }

//     getBlock();
//   }, [blockNumber]);

//   return <div className="App">Block Number: {blockNumber}</div>;
// }

export default App;

// <div>
        //   <p>Block Hash: {block.hash}</p>
        //   <p>Timestamp: {block.timestamp}</p>
        //   <p>Nonce: {block.nonce}</p>
        //   <p>Parent Hash: {block.parentHash}</p>
        //   <p>Miner: {block.miner}</p>
        //   <p>Extra Data: {block.extraData}</p>
        //    {/* <p>Gas Limit: {block.gasLimit}</p> */}
        //   <p>Time Stamp: {block.timestamp}</p> 
        //   {/* <p>First transaction: {blockTransactions.transactions[0]}</p> */}
        // </div>


      //   Block Hash: {block.hash}
      // <p>Timestamp: {block.timestamp}</p>
      //  <p>Nonce: {block.nonce}</p>
       