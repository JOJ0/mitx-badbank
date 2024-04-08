import { useState, useContext, useEffect } from 'react';
import { Card, apiPutRequest } from './common.jsx'
import { UserContext, getBalance, styleSubmitButton } from './common.jsx'

function Deposit() {
  const ctx = useContext(UserContext);
  const [depositValue, setDepositValue] = useState('');
  const [balance, setBalance] = useState(0);  // We want a re-render when this state changes
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('error');  // 'success' styles Card status green instead of red

  useEffect(() => {
    async function fetchData() {
      let apiResult = await getBalance(ctx.users[0].email);
      console.log("This is apiResult:", apiResult)
      setBalance(apiResult);
    }
    fetchData();
  }, []);

  async function handleDeposit() {
    if (!validate(depositValue, 'deposit')) return;
    // If we made it to here, no errors noted.

    let balanceUpdated = await apiPutRequest(
      `/api/account/update_balance/${ctx.users[0].email}`,
      {amount: parseInt(depositValue)}
    );
    console.log("In handleDeposit apiPutRequest returned:", balanceUpdated);

    setStatus("Thanks for your deposit. Consider your money terminated!");
    setStatusType('success')
    setBalance(balanceUpdated.data.balance);
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
    else {
      setStatus('');
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
    <Card
      header="Deposit"
      title={`Hi ${ctx.users[0].name}, please throw money at us!`}
      text={`Current balance: ${balance}`}
      status={status}
      statusType={statusType}
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
  );
}

export default Deposit;