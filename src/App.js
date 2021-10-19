import { useWeb3, useContract } from "./hooks/web3";
import CounterAbi from "./contracts/Counter.json";
import {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';

function App() {
  const provider = "ws://127.0.0.1:8545";
  const defaultAccount = "0xBBb6389AcaEdDe16EC2096F3C1C6f72aEB233B4C";//pegar address acá de ganache-cli
  const contractAddress = "0xE9Ebe3CE83a8Cd2923D5F2110E5F103a3917F776";// instance.address

  const web3 = useWeb3(provider, defaultAccount);
  const contract = useContract(web3, CounterAbi, contractAddress);
  const [counterValue, setCounterValue] = useState(0);

  useEffect (async() => {
    setCounterValue(await contract.methods.counter().call());
  }, []);

  async function handleDecrement(){
    await contract.methods.decrement().send({from:defaultAccount});
    setCounterValue(await contract.methods.counter().call());


  }
  async function handleIncrement(){
    await contract.methods.increment().send({from:defaultAccount});
    setCounterValue(await contract.methods.counter().call());

  }

  return (
    <div className="App">
      <button variant="primary" onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <span>Valor: {counterValue} </span>
    </div>
  );
}

export default App;
