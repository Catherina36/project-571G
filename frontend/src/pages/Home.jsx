import React, { useState, useEffect } from 'react'

import { DisplayProgram } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  const { address, contract, getPrograms } = useStateContext();

  const fetchPrograms = async () => {
    setIsLoading(true);
    const data = await getPrograms();
    setPrograms(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchPrograms();
  }, [address, contract]);

  return (
    <DisplayProgram 
      title="All Programs"
      isLoading={isLoading}
      programs={programs}
    />
  )
}

export default Home
