import React from 'react';
import Account from '../components/Account.jsx';
import styled from 'styled-components';

const Header = () => {
    const online = "Online";
    const loggedinuser = JSON.parse(localStorage.getItem("appointment-session"))

    return (
        <Container>
            <div className="status-options">
                <h3>Welcome {loggedinuser.name}</h3>
            </div>
            <div className="status">
                Status: <span>{online}</span>
            </div>
            <div className="account-options">
                <Account />
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    .status-options {
        display: flex;
        gap: 10px;

        button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            font-size: 20px;
            cursor: pointer;
            background-color: transparent;
            color: #5f6368;
            transition: background-color 0.2s;

            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
        }
    }

    .status {
        margin-left: auto;
        color: #5f6368;
        font-size: 20px;
        font-weight: 500;

        span {
            color: #34a853;
        }
    }

    .account-options {
        margin-left: 20px;
    }
`;

export default Header;
