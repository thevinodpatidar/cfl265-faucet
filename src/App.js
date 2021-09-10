import React, { useState } from "react";
import cflLogo from "./assets/cfl365-logo-light.svg";
import axios from "axios";
import CoinSelect from "./CoinSelect";

export const axiosInstance = axios.create({
  baseURL: 'https://alpha.cfl365.finance/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  validateStatus: status => status <= 500,
});

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [txnHash, setTxnHash] = useState('');
  const [accountTo, setAccountTo] = useState("");
  const [amount, setAmount] = useState(10);

  async function getToken() {
    try {
      setIsLoading(true);
      setIsError(false);
      const response  = await axiosInstance.get(
          `/getTokenFromFaucet?accountTo=${accountTo}&amount=${amount}`,
      );
      if (response.status === 200) {
        setIsLoading(false);
        setTxnHash(response.data.hash);
      } else {
        setIsError(true);
        setIsLoading(false);
        setTxnHash('');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  setInterval(() => {
    if (txnHash) {
      setTxnHash('');
    }
  }, 7000);

  function reload(e) {
    window.location.reload();
  }

  return (
    <>
      <div className="min-h- flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={cflLogo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              CFL365 Token Faucet
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <p
                className="font-medium text-primary hover:text-primary"
              >
                Testnet token faucet
              </p>
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
                <CoinSelect onSelection={(value) => setAmount(value)} />
              </div>
            </div>
            <div className="flex justify-space-between">
              <button
                onClick={getToken}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLoading ? (<div>
                  <div style={{'borderTopColor':'transparent'}}
                    className="w-6 h-6 border-4 border-white-400 border-solid rounded-full animate-spin"></div>
                  </div>
                ) : ('Get some token')
                }
              </button>
              <button
                onClick={reload}
                className="group relative w-1/4 flex justify-center py-2 px-4 ml-3 border border-grey text-sm font-medium rounded-md text-black bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
          {
            !isLoading && (txnHash || isError ) && 
            < div className = {
              `flex flex-col bg-${isError ? 'red' : 'green'}-100 border-l-4 border-${isError ? 'red' : 'green'}-500 text-${isError ? 'red' : 'green'}-700 p-4`
            }
            role = "alert" >
                <p className="font-bold">{isError ? 'Error' : 'Success'}</p>
                {
                  isError ? 'Token Request Failed' : 
                  <a style={{wordBreak: 'break-all'}} href={`https://rinkeby.etherscan.io/tx/${txnHash}`} target="_blank" rel="noreferrer">Your Txn hash : {txnHash}</a>
                }
          </div>
          }
          <div className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-700 p-4" role="alert">
            <p className="font-bold">Notice</p>
            <p>Rinkeby CFL365 Token : 0x1b7B8a7869D141fd036Be5ae7012DC2098fAE4D8</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
