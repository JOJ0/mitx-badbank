import { useContext } from 'react';

import { UserContext, Footer } from './common.jsx'


function Logout() {
  const ctx = useContext(UserContext);
  return (
    <>
    <h5>You are logged out!</h5>
    <Footer activeUser={ctx.email} />
    </>
  );
}

export default Logout;