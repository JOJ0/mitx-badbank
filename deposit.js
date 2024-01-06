function Deposit() {
  const ctx = React.useContext(UserContext);
  const [depositValue, setDepositValue] = React.useState(0);
  const [status, setStatus]     = React.useState('');

  function validate(value, label) {
    console.log('Function validate got value: ', value);
    let err = false;
    let errMsg = ""
    if (value === 0) {
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
      //setTimeout(() => setStatus('', 3000));
      return false;
    }
    return true;
  }

  function handleDeposit() {
    console.log("handleDeposit received:", deposit);
    if (!validate(depositValue, 'deposit')) return;
    // If we made it to here, no errors noted.
    ctx.users[0].balance += parseInt(depositValue);
  }

  return (
    <Card
      header="Deposit"
      title="Throw money at us!"
      text={"Assuming User ID zero (as soon will be your money too). Hi " + JSON.stringify(ctx.users[0].name)}
      status={status}
      body={
        <>
        <h4>Current balance: ${ctx.users[0].balance}</h4>
        How much to throw?<br/>
        <input type="input" className="form-control" id="deposit" placeholder="Enter Amount" value={depositValue}
          onChange={e => setDepositValue(e.currentTarget.value)} /><br/>

        <button type="submit" className="btn btn-light" onClick={handleDeposit}>Deposit</button>
        </>
      }
      txtcolor="black"
    />
  );
}
