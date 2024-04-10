import { useState, useContext, useEffect } from 'react';

import { Card, apiPutRequest, Footer, UserContext, getBalance, styleSubmitButton} from './common.jsx'


function Deposit() {
  const ctx = useContext(UserContext);
  const [depositValue, setDepositValue] = useState('');
  const [balance, setBalance] = useState(0);  // We want a re-render when this state changes
  const [status, setStatus] = useState({
    "msg": "",
    "type": "error"
  });

  useEffect(() => {
    async function fetchData() {
      let apiResult = await getBalance(ctx.email);
      console.log("This is apiResult:", apiResult)
      setBalance(apiResult);
    }
    fetchData();
  }, [status]);

  async function handleDeposit(e) {
    e.preventDefault();
    if (!validate(depositValue, 'deposit')) return;
    // If we made it to here, no errors noted.

    let balanceUpdated = await apiPutRequest(
      `/api/account/update_balance/${ctx.email}`,
      {amount: parseInt(depositValue)}
    );
    console.log("In handleDeposit apiPutRequest returned:", balanceUpdated);
    setStatus({
      "msg": "Thanks for your deposit. Consider your money terminated!",
      "type": "success"
    });
  }

  function validate(value, label) {
    console.log('Function validate got value: ', value);
    let err = false;
    let errMsg = ""
    if (value == 0) {
      errMsg = `C'mon, that is not enough! (Zero Amount Warning)`;
      err = true;
    }
    else if (value < 0) {
      errMsg = `That's a negative value! You can't be serious!`;
      err = true;
    }
    else if (isNaN(value)) {
      errMsg = `You don't get it, do you? We want money money money (NaN Warning)!`;
      err = true;
    }

  if (err) {
    console.log(errMsg);
    setStatus({
      "msg": "Error: " + errMsg,
      "type": "error"
    });
    //setTimeout(() => setStatus('', 3000));
    return false;
  }
  setStatus({
    "msg": "",
    "type": "success"
  });
  return true;
}

  return (
    <>
    <Card
      showComponent={ctx.loggedIn}  // Depending on this boolean hide or show
      header="Deposit"
      title={`Hi ${ctx.email}, please throw money at us!`}
      text={`Current balance: ${balance}`}
      status={status.msg}
      statusType={status.type}
      body={
        <>
        <form>
          How much to throw?<br/>
          <input type="input" className="form-control" id="deposit" placeholder="Enter Amount" value={depositValue}
            onChange={e => setDepositValue(e.currentTarget.value)} /><br/>

          <button type="submit" className={styleSubmitButton(depositValue)} onClick={handleDeposit}>Deposit</button>
        </form>
        </>
      }
      txtcolor="black"
    />
    <Footer activeUser={ctx.email} />
    </>
  );
}

export default Deposit;