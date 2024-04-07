import React from 'react'
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader } from '../assets';
import CustomButton from './CustomButton';

const DisplayProgram = ({ title, isLoading, programs }) => {
    const navigate = useNavigate();

    const handleNavigate = (program) => {
        navigate(`/program-details/${program.title}`, { state: program })
      }

  return (
    <div >
      <h1 className="font-epilogue font-semibold text-[18px] text-black text-left">{title} ({programs.length})</h1>
    
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
                <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}

            {!isLoading && programs.length === 0 && (
                <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not created any programs yet
                </p>
            )}

            {!isLoading && programs.length > 0 && programs.map((program) => <FundCard 
                key={program.id}
                {...program}
                handleClick={() => handleNavigate(program)}
            />)}

        </div>
    
    </div>
  )
}

export default DisplayProgram
