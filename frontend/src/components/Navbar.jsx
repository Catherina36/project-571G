import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { search } from '../assets';


const Navbar = () => {
  const navigate = useNavigate();
  const { connectWallet, address, disconnect } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#ebf4fc] rounded-[100px]">   
        <input type="text" placeholder="Search for programs" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton 
          btnType="button"
          title='Create my program'
          styles={address ? 'bg-transparent' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('create-program')
            else connectWallet()
          }}
        />

        <CustomButton 
          btnType="button"
          title='Manage my program'
          styles={address ? 'bg-transparent' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(address) navigate('profile')
            else connectWallet()
          }}
        />

        { address == undefined ? (
          <CustomButton 
            btnType="button"
            title='Connect'
            styles='bg-[#8c6dfd]'
            handleClick={() => {
              connectWallet()
            }}
          />
        ) : (
          <CustomButton 
            btnType="button"
            title='Disconnect'
            styles='bg-[#8c6dfd]'
            handleClick={() => {
              disconnect()
            }}
          />            
        ) }

      </div>

    </div>
  )
}

export default Navbar
