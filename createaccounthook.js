function useCreateAccountForm(initialValues){
  const [formFields, setFormFields] = React.useState(initialValues);
  console.log("We are inside hook useCreateAccountForm.")

  return [
      formFields,
      e => {
          if (e.type === 'change'){
              console.log('In custom hook useCreateAccountForm id is:',e.target.id);
              console.log('In custom hook useCreateAccountForm type:',e.target.type);
              if (e.target.type == "checkbox") {
                  console.log('value:',e.target.checked);
                  setFormFields({
                      ...formFields,
                      [e.target.id]: e.target.checked
                  });
              } else {
                  console.log('value:',e.target.value);
                  setFormFields({
                      ...formFields,
                      [e.target.id]: e.target.value
                  });
                  if (formFields.name == '') console.log("Warning in hook: name empty");
                  if (formFields.email == '') console.log("Warning in hook: email empty");
                  if (formFields.password == '') console.log("Warning in hook: password empty");
              }
              console.log('');
          }
      }
  ];
}