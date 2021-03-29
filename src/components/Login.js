import React, { useState } from 'react';
import logo from '../logo.svg';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

const Login = (props) => {
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('https://polar-bastion-36432.herokuapp.com/users/signin', { username: username.value, password: password.value }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('/home');
            window.location.reload();
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div className="login text-center">
            <img src={logo} alt="logo" />
            <h2 className="mt-5 mb-5">Login</h2>
            <form>
                <input
                    className="form-control mb-4"
                    type="text"
                    placeholder="username"
                    {...username} autoComplete="new-username" /> 
                <input
                    className="form-control mb-4"
                    type="password"
                    placeholder="password"
                    {...password} autoComplete="new-password" />
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                <input type="submit" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} />
            </form>
        
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }


export default Login