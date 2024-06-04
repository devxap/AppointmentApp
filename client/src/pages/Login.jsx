import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { LoginRoute } from '../utils/APIRoutes';

const Login = ({onLogin}) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (handleValidation()) {
                const { email, password } = values;
                const { data } = await axios.post(LoginRoute, {
                    email,
                    password,
                });
    
                if (data.success) {
                    localStorage.setItem('appointment-session', JSON.stringify(data.user));
                    onLogin();                    
                    console.log(data.user);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        }
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleValidation = async () => {
        const { email, password } = values;
        if (password === "") {
            alert("email & Password are required");
            return false;
        }
        else if (email.length === "") {
            alert("email & Password are required");
            return false;
        }
        return true;
    }


    return (
        <>
            <FormContainer>
            <h2>Log in</h2>

                <form onSubmit={(event) => handleSubmit(event)}>
                    <input
                        type="text"
                        placeholder='email'
                        name='email'
                        onChange={(e) => handleChange(e)}
                        min="3"
                    />


                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        onChange={(e) => handleChange(e)}
                    />

                    <button type='submit'>Log In</button>
                    <span>Don't have an account? <Link to='/register'>Register</Link></span>
                </form>
            </FormContainer>
        </>
    );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #f3f3f3;

form{
    display: flex;
    width: 20%;
    height: 40%;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff76;
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 3px 1px 10px -1px #dfdfdf;
    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color:#2a2a2a;
        width: 100%;
        font-size: 1rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
        color: #2a2a2a;
        font-weight: 600;
        text-transform: uppercase;
        a{
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
    
}
`;
export default Login;