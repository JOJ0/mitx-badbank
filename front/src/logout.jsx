import { useContext, useEffect } from 'react';

import { UserContext, Footer } from './common.jsx'


function Logout() {
  const ctx = useContext(UserContext);

  useEffect(() => {
    // When this component is loaded it simply disables our login stats variables
    ctx.loggedIn = false;
    ctx.email = '';
  }, []);

  return (
    <>
    <h5>You are logged out!</h5>
    <Footer activeUser={ctx.email} logout={true}/>
    </>
  );
}

export default Logout;