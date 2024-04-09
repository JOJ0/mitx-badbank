import { useState, useContext, useEffect } from 'react';

import { Card, apiPutRequest, Footer, UserContext, getBalance, styleSubmitButton} from './common.jsx'


function Withdraw() {
  const ctx = useContext(UserContext);
  const [withdrawValue, setWithdrawValue] = useState('');
  const [balance, setBalance] = useState(0);  // We want a re-render when this state changes
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('error');  // 'success' styles Card status green instead of red

  useEffect(() => {
    async function fetchData() {
      let apiResult = await getBalance(ctx.email);
      console.log("This is apiResult:", apiResult)
      setBalance(apiResult);
    }
    fetchData();
  }, [ctx.loggedIn]);

  async function handleWithdraw() {
    if (!validate(withdrawValue, 'withdraw')) return;
    // If we made it through here, no errors noted.

    let balanceUpdated = await apiPutRequest(
      `/api/account/update_balance/${ctx.email}`,
      {amount: parseInt(-depositValue)}
    );
    console.log("In handleWithdraw apiPutRequest returned:", balanceUpdated);

    setStatus("Thanks for your withdrawal. Remember? Your money's terminated already!");
    setStatusType('success')
    setBalance(balanceUpdated.data.balance);
  }

  function validate(value, label) {
    console.log('Function validate got value: ', value);
    let err = false;
    let errMsg = ""
    let wouldBeBalance = 0;

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
    else if ((ctx.users[0].balance - parseInt(withdrawValue)) <0) {
      errMsg = `Won't you stop now? Nothing left!`;
      err = true;
    }
    else {
      setStatus('');
      setBalance(ctx.users[0].balance);
    }

  if (err) {
    console.log(errMsg);
    setStatus('Error: ' + errMsg);
    setStatusType('error')
    //setTimeout(() => setStatus('', 3000));
    return false;
  }
  return true;
}

  return (
    <>
    <Card
      showComponent={ctx.loggedIn}
      header="Withdraw"
      title={`Hi ${ctx.email}, try to take money from us!`}
      text={`Current balance: ${balance}`}
      status={status}
      statusType={statusType}
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