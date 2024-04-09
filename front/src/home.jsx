import { useContext } from 'react';

import banklogo from '~assets/bank.png'
import { Card, UserContext, Footer } from './common.jsx'


function Home() {
  const ctx = useContext(UserContext);

  return (
    <>
    <Card
      showComponent={true} // Home should always be shown. Footer takes care of login status
      txtcolor="black"
      header="Welcome to TermBank"
      title="We terminate your money!"
      text="Quick and hasslefree!"
      body={(<img src={banklogo} className="img-fluid" alt="Responsive image" />)}
    />
    <Footer activeUser={ctx.email} />
    </>
  );
}

export default Home;
