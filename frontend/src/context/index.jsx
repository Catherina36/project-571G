import React, { useContext, createContext } from 'react';

import { useAddress, useContract, metamaskWallet, useContractWrite, useConnect, useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xF6d22628B94d2871Fc69969522ae9620F0Aba8c8');
    const { mutateAsync: createProgram } = useContractWrite(contract, 'createProgram');

    const address = useAddress();
    const metamaskConfig = metamaskWallet();
    const connect = useConnect();
    const disconnect = useDisconnect();
    const connectWallet = async() =>{
      const wallet = await connect(metamaskConfig);
    }

    const publishProgram = async(form) => {
        try {
            const data = await createProgram({
                args: [
                    address,
                    form.title, //title
                    form.description, //description
                    form.image,
                    form.target,
                    new Date(form.deadline).getTime() //deadline
                ]
            });

            console.log("contract call success", data)
        } catch (error){
            console.log("contract call failure", error)
        }
    }

    const getPrograms = async () => {
      const programs = await contract.call('getAllPrograms');
  
      const parsedPrograms = programs.map((program, i) => ({
        owner: program.receiverAddress,
        title: program.title,
        description: program.description,
        target: ethers.utils.formatEther(program.targetAmount.toString()),
        deadline: program.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(program.collectedAmount.toString()),
        image: program.image,
        pId: i,
        index: program.index,
        active: program.active
      }));
      
      return parsedPrograms;
    }

    const getUserPrograms = async () => {
      const allPrograms = await getPrograms();
  
      const filteredPrograms = allPrograms.filter((program) => program.owner === address);
  
      return filteredPrograms;
    }

    const donate = async (owner, amount) => {
      
      console.log(owner)
      const data = await contract.call('sendDonation', [owner], { value: ethers.utils.parseEther(amount)});
      return data;
    }

    const getDonations = async (owner, index) => {
      const donations = await contract.call('getDonations', [owner, index]);
      const numberOfDonations = donations.length;
  
      const parsedDonations = [];
      for(let i = 0; i < numberOfDonations; i++) {
        console.log(donations)
        parsedDonations.push({
          donator: donations[i][0],
          donation: ethers.utils.formatEther(donations[i][1].toString())
        })
      }
  
      return parsedDonations;
    }

    const completeProgram = async () => {
      
      //console.log(owner)
      const data = await contract.call('completeProgram');
      return data;
    }

    return (
        <StateContext.Provider
          value={{ 
            address,
            contract,
            connectWallet,
            disconnect,
            createProgram: publishProgram,
            getPrograms,
            getUserPrograms,
            donate,
            getDonations
          }}
        >
          {children}
        </StateContext.Provider>
      )

}

export const useStateContext = () => useContext(StateContext);