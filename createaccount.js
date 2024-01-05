function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitAllowed, setSubmitAllowed] = React.useState(false);
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      const errMsg = `Field '${label}' is empty!`;
      console.log(errMsg);
      setStatus('Error: ' + errMsg);
      //setTimeout(() => setStatus('', 3000));
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log("handleCreate received:", name, email, password);
    if (!validate(name, 'name')) return;
    if (!validate(email, 'email')) return;
    if (!validate(password, 'password')) return;
    // If we made it to here, no errors noted.
    setStatus('');
    ctx.users.push({name, email, password, balance:100})
    setShow(false);
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setStatus('');
    setShow(true);
    setSubmitAllowed(false);
  }

  function handleChange(event) {
    console.log(`handleChange received ${event.target.value} from field ${event.target.id}`);
    // console.log(event)  // prints all data of the event object, use for detailed debugging
    let fieldName = event.target.id;
    let fieldValue = event.target.value;
    // We have to update the state variable since the input field's "value"
    // property uses it (otherwise it would stay empty)
    if (fieldName == 'name') setName(fieldValue);
    if (fieldName == 'email') setEmail(fieldValue);
    if (fieldName == 'password') setPassword(fieldValue);
    // No matter which field, if it's empty, disable submit button; sufficient for now...
    if (fieldValue == '') {
      setSubmitAllowed(false);
    }
    else {
      setSubmitAllowed(true);
    }
  };

  function styleSubmitButton() {
    let classes = "btn btn-light";
    if (! submitAllowed) classes += " disabled";
    console.log("In styleSubmitButton classes is: " + classes)
    return classes
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (
        <>
        Name<br/>
        <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={handleChange} /><br/>
        Email address<br/>
        <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={handleChange} /><br/>
        Password<br/>
        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={handleChange} /><br/>

        <button type="submit" className={styleSubmitButton()} onClick={handleCreate}>Create account</button>
        </>
      ):(
        <>
        <h5>Success</h5>
        <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
        </>
      )}
    / >
  );
}