function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const {formFields, handleChange, resetForm} = useCreateAccountForm({
    name: '',
    email: '',
    password: '',
  });
  // fetch api

  async function createViaApi(url) {
    let response = await fetch(url);
    let data = await response.json();
    console.log("CreateAccount component createViaApi got back:");
    console.log(data);
    return data;
  }

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
    if (!validate(formFields.name, 'name')) return;
    if (!validate(formFields.email, 'email')) return;
    if (!validate(formFields.password, 'password')) return;
    // If we made it to here, no errors noted.
    setStatus('');
    const url = `/account/create/${formFields.name}/${formFields.email}/${formFields.password}`;
    console.log("In handleCreate url is:" + url);
    // FIXME endpoint does't handle yet: balance:100
    try {
      let created = createViaApi(url);
      console.log("create function returned:", created);
    }
    catch (error) {
      console.error("create function error:", error);
      setStatus('Error: ' + error)
    }
    setShow(false);
  }

  function clearForm() {
    // Since we are using a custom hook for saving our form values we are
    // required to provide a reset functionality within that hook. (see
    // destructuring statement on top of this file)
    resetForm({
      name: '',
      email: '',
      password: '',
    });
    setStatus('');
    setShow(true);
  }

  function styleSubmitButton() {
    let classes = "btn btn-light";
    if (formFields.name == '' && formFields.email == '' && formFields.password == '') {
      console.log("Warning in styleSubmitButton: All input fields empty. Submit disabled.");
      // Note that this could easily be changed to disable if at least one
      // input field is empty by using OR (||) instead of AND (&&).
      classes += " disabled"
    }
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
        <form>
          Name<br/>
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={formFields.name} onChange={handleChange} /><br/>
          Email address<br/>
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={formFields.email} onChange={handleChange} /><br/>
          Password<br/>
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={formFields.password} onChange={handleChange} /><br/>

          <button type="submit" className={styleSubmitButton()} onClick={handleCreate}>Create account</button>
        </form>
        </>
      ):(
        <>
        <form>
          <h5>Success</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
          </form>
        </>
      )}
    / >
  );
}