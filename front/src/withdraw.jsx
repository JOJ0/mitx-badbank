import { useState, useContext, useEffect } from 'react';

import { Card, apiPutRequest, Footer, UserContext, getBalance, styleSubmitButton} from './common.jsx'


function Withdraw() {
  const ctx = useContext(UserContext);
  const [withdrawValue, setWithdrawValue] = useState('');
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
    if (ctx.loggedIn) fetchData();
  }, [status]);

  async function handleWithdraw(e) {
    e.preventDefault();
    if (!validate(withdrawValue, 'withdraw')) return;
    // If we made it through here, no errors noted.

    let balanceUpdated = await apiPutRequest(
      `/api/account/update_balance/${ctx.email}`,
      {amount: parseInt(-withdrawValue)}
    );
    console.log("In handleWithdraw apiPutRequest returned:", balanceUpdated);
    setStatus({
      "msg": "Thanks for your withdrawal. Remember? Your money's terminated already!",
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
      errMsg = `You don't get it, do you? You want money money money (NaN Warning)!`;
      err = true;
    }
    else if ((balance - parseInt(withdrawValue)) < 0) {
      errMsg = `Won't you stop now? Nothing left!`;
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
      showComponent={ctx.loggedIn}
      header="Withdraw"
      title={`Hi ${ctx.email}, try to take money from us!`}
      text={`Current balance: ${balance}`}
      status={status.msg}
      statusType={status.type}
      body={
        <>
        <form>
          How much to get?<br/>
          <input type="input" className="form-control" id="withdraw" placeholder="Enter Amount" value={withdrawValue}
            onChange={e => setWithdrawValue(e.currentTarget.value)} /><br/>

          <button type="submit" className={styleSubmitButton(withdrawValue)} onClick={handleWithdraw}>Withdraw</button>
        </form>
        </>
      }
      txtcolor="black"
    />
    <Footer activeUser={ctx.email} />
    </>
  );
}

export default Withdraw;