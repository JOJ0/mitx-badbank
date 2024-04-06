import { Card } from './common.jsx'
import banklogo from '~assets/bank.png'

function Home() {

  return (
    <Card
      txtcolor="black"
      header="Welcome to TermBank"
      title="We terminate your money!"
      text="Quick and hasslefree!"
      body={(<img src={banklogo} className="img-fluid" alt="Responsive image" />)}
    />
  );
}

export default Home;
