function useCreateAccountForm(initialValues) {
  const [stateObj, setStateObj] = React.useState(initialValues);
  console.log("We are inside hook useCreateAccountForm. stateObj is:");
  console.log(stateObj);

  function handle(e) {
    if (e.type === "change") {
      // console.log("In custom hook useCreateAccountForm id is:", e.target.id);
      // console.log("In custom hook useCreateAccountForm type:", e.target.type);
      if (e.target.type == "checkbox") {
        console.log("value:", e.target.checked);
        setStateObj({
          ...stateObj,
          [e.target.id]: e.target.checked,
        });
      } else {
        console.log("value:", e.target.value);
        setStateObj({
          ...stateObj,
          [e.target.id]: e.target.value,
        });
        if (stateObj.name == "") console.log("Warning in hook: name empty");
        if (stateObj.email == "") console.log("Warning in hook: email empty");
        if (stateObj.password == "") console.log("Warning in hook: password empty");
      }
    }
  }

  function reset() {
    setStateObj({
      name: '',
      email: '',
      password: ''
    });
  }

  const inputProps = {
    formFields: stateObj,
    handleChange: handle,
    resetForm: reset
  };

  return inputProps;

}
