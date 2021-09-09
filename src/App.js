import React, { useState, useEffect } from "react";
import cflLogo from "./assets/cfl365-logo-light.svg";
import Web3 from "web3";
const tokenABI = JSON.parse(`[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "faucet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]`);

let web3 = new Web3(Web3.givenProvider);
const address = "0x4DCA9cC45ad1b72eb1e9CF3497b2F21a06b40D85";
const tokenContract = new web3.eth.Contract(tokenABI, address);

function App() {
  const [isExtension, setExtension] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState(0);
  const [accountTo, setAccountTo] = useState("");
  const [amount, setAmount] = useState(0);

  const detectMetamaskExtension = async () => {
    try {
      console.log(await web3.givenProvider);
      if ((await web3.givenProvider) !== null) {
        setExtension(true);
      } else {
        setExtension(false);
      }
    } catch (error) {
      throw error;
    }
  };

  const detectMetamaskConnection = async () => {
    try {
      if (!isConnected && isExtension) {
        const accounts = await web3.eth.requestAccounts();
        const chain = await web3.eth.getChainId();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setChainId(chain);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  async function getToken() {
    try {
      await tokenContract.methods
        .faucet(accountTo, amount)
        .send({ from: account })
        .on("transactionHash", function (hash) {
          console.log("hash", hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log("confirmation", confirmationNumber, receipt);
        })
        .on("receipt", function (receipt) {
          // receipt example
          console.log(receipt);
        })
        .on("error", function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function getChain() {
    switch (chainId) {
      case 1:
        return "Ethereum";
      case 4:
        return "Rinkeby";
      case 3:
        return "Ropsten";
      case 5:
        return "Goerli";
      case 42:
        return "Kovan";
      default:
        break;
    }
  }

  useEffect(() => {
    if (!isExtension) {
      detectMetamaskExtension();
    }
    if (!isConnected && isExtension) {
      detectMetamaskConnection();
    }
    return () => {};
  }, []);

  setInterval(() => {
    if (!isConnected && isExtension) {
      detectMetamaskConnection();
    }
  }, 1000);

  function openModal() {
    window.open(
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
    );
  }

  return (
    <>
      <div className="flex items-end justify-end py-12 px-4 sm:px-6 lg:px-8">
        <button
          type="submit"
          onClick={!isExtension ? openModal : detectMetamaskConnection}
          className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {!isExtension
            ? "Install Metamask"
            : !isConnected
            ? "Connect"
            : `${getChain()} - ${account.substr(0, 8)}...${account.substr(
                -4,
                4
              )}`}
        </button>
      </div>
      <div className="min-h- flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={cflLogo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              CFL365 Token Faucet
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary"
              >
                Testnet token faucet
              </a>
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="address" className="sr-only">
                  Ethereum address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="text"
                  required
                  onChange={(e) => setAccountTo(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Your Ethereum address..."
                />
                <p className="mt-2 text-sm text-gray-400">
                  Hint: Your metamask account address
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="sr-only">
                  Token Amount
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  autoComplete="amount"
                  required
                  onChange={(e) => setAmount(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Token amount"
                />
              </div>
            </div>
            <div>
              <button
                onClick={getToken}
                disabled={!isConnected && !isExtension}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Get some token
              </button>
            </div>
          </div>
          <div class="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-700 p-4" role="alert">
            <p class="font-bold">Notice</p>
            <p>Rinkeby CFL365 Token : 0x4DCA9cC45ad1b72eb1e9CF3497b2F21a06b40D85</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
