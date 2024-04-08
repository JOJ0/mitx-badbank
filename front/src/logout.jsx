import { useNavigate } from 'react-router-dom';

function Logout() {
  const Navigate = useNavigate();
  return (
    <>
      <h5>You are logged out!</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => Navigate('/login')}
      >
        Login
      </button>
    </>
  );
}

export default Logout;