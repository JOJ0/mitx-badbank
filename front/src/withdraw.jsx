function Withdraw() {
  const ctx = React.useContext(UserContext);
  const [withdrawValue, setWithdrawValue] = React.useState('');
  const [balance, setBalance]     = React.useState(0);  // We want a re-render when this state changes
  const [status, setStatus]     = React.useState('');
  const [statusType, setStatusType]     = React.useState('error');  // 'success' styles Card status green instead of red

  function handleWithdraw() {
    console.log("handleWithdraw received:", withdraw);
    if (!validate(withdrawValue, 'withdraw')) return;
    // If we made it through here, no errors noted.
    ctx.users[0].balance = ctx.users[0].balance - parseInt(withdrawValue);
    setStatus("Thanks for your withdrawal. Remember? Your money's terminated already!");
    setStatusType('success')
    setBalance(ctx.users[0].balance);
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
    <Card
      header="Withdraw"
      title={`Hi ${ctx.users[0].name}, try to take money from us!`}
      text={"(Assuming User 0 - as soon will be your money too)"}
      status={status}
      statusType={statusType}
      body={
        <>
        <div className="card-title">Current balance: ${getBalance(balance)}</div>
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
  );
}

export default Withdraw;