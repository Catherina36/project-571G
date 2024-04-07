import React, { useState, useEffect } from 'react'

import { DisplayProgram } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  const { address, contract, getUserPrograms } = useStateContext();

  const fetchPrograms = async () => {
    setIsLoading(true);
    const data = await getUserPrograms();
    setPrograms(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchPrograms();
  }, [address, contract]);

  return (
    <DisplayProgram 
      title="Your Programs"
      isLoading={isLoading}
      programs={programs}
    />
  )
}

export default Profile
