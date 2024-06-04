import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { RegisterRoute } from '../utils/APIRoutes';

const StudentRegister = ({ onRegister }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        type: "",
        roll: "",
        branch: "",
        empid: "",
        deptcode: ""
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { name, password, email, type, empid, deptcode, roll, branch } = values;

            try {
                let data;
                if(type.toLowerCase() === 't'){
                    const response = await axios.post(RegisterRoute, {
                        name,
                        email,
                        password,
                        type,
                        empid,
                        deptcode
                    });
                    data = response.data;
                } else if(type.toLowerCase() === 's'){
                    const response = await axios.post(RegisterRoute, {
                        name,
                        email,
                        password,
                        type,
                        roll,
                        branch
                    });
                    data = response.data;
                }

                if (data.success) {
                    localStorage.setItem('appointment-session', JSON.stringify(data.user));
                    onRegister();
                    navigate('/login'); // Redirect to login after successful registration
                } else {
                    toast.error(data.message, toastOptions);
                }
            } catch (error) {
                toast.error("Registration failed. Please try again.", toastOptions);
            }
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleValidation = () => {
        const { email, password, name, type } = values;
        if (!email || !password || !name || !type) {
            toast.error("All fields are required.", toastOptions);
            return false;
        }
        return true;
    }

    const renderStudentFields = () => {
        if (values.type.toLowerCase() === 's') {
            return (
                <>
                    <input
                        type="text"
                        placeholder='Roll Number'
                        name='roll'
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder='Branch'
                        name='branch'
                        onChange={handleChange}
                    />
                </>
            );
        }
        return null;
    };

    const renderFacultyFields = () => {
        if (values.type.toLowerCase() === 't') {
            return (
                <>
                    <input
                        type="text"
                        placeholder='Employee ID'
                        name='empid'
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder='Department Code'
                        name='deptcode'
                        onChange={handleChange}
                    />
                </>
            );
        }
        return null;
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="forminputs">
                        <select
                            name='type'
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select User Type</option>
                            <option value="s">Student</option>
                            <option value="t">Faculty</option>
                        </select>
                        <input
                            type="text"
                            placeholder='Name'
                            name='name'
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            required
                        />
                        {renderStudentFields()}
                        {renderFacultyFields()}
                    </div>
                    <button type='submit'>Register</button>
                    <span>Have an account already? <Link to='/login'>Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
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

form {
    display: flex;
    width: 25%;
    height: 60%;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff76;
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 3px 1px 10px -1px #dfdfdf;

    .forminputs {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        overflow: auto;
        gap: 5px;

        input, select {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: #2a2a2a;
            width: 75%;
            font-size: 1rem;

            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
    }

    button {
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

        &:hover {
            background-color: #4e0eff;
        }
    }

    span {
        color: #2a2a2a;
        font-weight: 600;
        text-transform: uppercase;

        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

export default StudentRegister;
