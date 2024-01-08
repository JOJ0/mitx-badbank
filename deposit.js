function Deposit() {
  const ctx = React.useContext(UserContext);
  const [depositValue, setDepositValue] = React.useState('');
  const [balance, setBalance]     = React.useState(0);  // We want a re-render when this state changes
  const [status, setStatus]     = React.useState('');
  const [statusType, setStatusType]     = React.useState('error');  // 'success' styles Card status green instead of red

  function styleSubmitButton() {
    let classes = "btn btn-light";
    if (depositValue === '') {  // Catch empty AND string (triple equal sign) - we don't want to
                                // prevent inputting 0, we have another check for that in handleDeposit)
      console.log("Warning in Deposit styleSubmitButton: Input field empty. Submit disabled.");
      classes += " disabled"
    }
    return classes
  }

  function getBalance() {
    if (balance) return balance;
    return ctx.users[0].balance;
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

  function handleDeposit() {
    console.log("handleDeposit received:", deposit);
    if (!validate(depositValue, 'deposit')) return;
    // If we made it to here, no errors noted.
    ctx.users[0].balance += parseInt(depositValue);
    setStatus("Thanks for your deposit. Consider your money terminated!");
    setStatusType('success')
    setBalance(ctx.users[0].balance);
  }

  return (
    <Card
      header="Deposit"
      title={`Hi ${ctx.users[0].name}, please throw money at us!`}
      text={"(Assuming User 0 - as soon will be your money too)"}
      status={status}
      statusType={statusType}
      body={
        <>
        <div className="card-title">Current balance: ${getBalance()}</div>
        <form>
          How much to throw?<br/>
          <input type="input" className="form-control" id="deposit" placeholder="Enter Amount" value={depositValue}
            onChange={e => setDepositValue(e.currentTarget.value)} /><br/>

          <button type="submit" className={styleSubmitButton()} onClick={handleDeposit}>Deposit</button>
        </form>
        </>
      }
      txtcolor="black"
    />
  );
}
