import React from 'react'
export const UserContext = React.createContext(null);
// const Route = ReactRouterDOM.Route;
// const HashRouter = ReactRouterDOM.HashRouter;
// const Link = ReactRouterDOM.Link;

export async function apiGetRequest(url) {
  let jsonData;
  console.log("apiGetRequest accessing url:", url);

  try {
    let response = await fetch(url, {mode: 'no-cors'});
    jsonData = await response.json();
  }
  catch (error) {
    if (error instanceof SyntaxError) {
      console.log('In apiGetRequest, SyntaxError:', error);  // Eg Unexpected token in JSON
    } else {
      console.log('In apiGetRequest, Error:', error);
    }
  }

  if (jsonData) {
    console.log("apiGetRequest returns jsonData:" + JSON.stringify(jsonData));
    return jsonData;
  }
  console.log("apiGetRequest returns empty object.");
  return {};
}

export function styleSubmitButton(depositValue) {
  let classes = "btn btn-light";
  if (depositValue === '') {  // Catch empty AND string (triple equal sign) - we don't want to
                              // prevent inputting 0, we have another check for that in validate function)
    console.log("Warning in common styleSubmitButton: Input field empty. Submit disabled.");
    classes += " disabled"
  }
  return classes
}

export async function getBalance(email) {
  // Fetch via API
  const url = `/api/account/details/${email}`;
  console.log("In getBalance url is:", url);
  let userFetched = await apiGetRequest(url);
  console.log("In getBalance received from API:", userFetched);
  return userFetched.data.balance;
}

export function Card(props) {
  function classes() {
    const bg = props.bgcolor ? 'bg-' + props.bgcolor : ' ';
    const text = props.txtcolor ? 'text-' + props.txtcolor : 'text-white';
    return 'card mb-3' + bg + text;
  }

  function statusClasses () {
    let style = 'card-footer card-status-error'
    if (props.statusType == 'success') style = 'card-footer card-status-success'
    return style

  }

  return(
    <div className={classes()} style={{maxWidth: "28rem"}}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
      </div>
      {props.status && props.status !== '' && (<div className={statusClasses()}>{props.status}</div>)}
    </div>
  )
}
