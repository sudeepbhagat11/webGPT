
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivalteRoute = () => {
    // @ts-ignore
  const { userInfo } = useSelector((state) => state.auth);


  return userInfo? <Outlet /> :<Navigate to='/login' />
}

export default PrivalteRoute