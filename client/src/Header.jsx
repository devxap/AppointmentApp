import React from 'react';
import Account from '../components/Account.jsx';
import styled from 'styled-components';


const Header = () => {
    const online="Online"
    return (
        <Container>
            <div className="user-options">
                <div className="status-options">
                    <button>online</button>
                    <button>offline</button>
                </div>
                <div className="status">
                    Status :<span>{online}</span>
                </div>
                <div className="account-options">
                    <Account />
                </div>
            </div>
        </Container>
    );
}


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 12vh;
    box-shadow: 0px 0px 10px 3px #ededed;
    .user-options{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        align-items: center;
        .status-options{
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        gap: 10px;
        margin-left: 45px;
        button{
            width: 80px;
            height: 25px;
            border-radius: 12px;
            border: none;
            align-items: center;
            cursor: pointer;
        }
        button:nth-child(1){
            background-color: #B7F3B2;
            font-weight: 700;
            color: #4e4e4e;
        }
        button:nth-child(2){
            background-color: #D6C5F2;
            font-weight: 700;
            color: #4e4e4e;
        }
        }
        .status{
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        gap: 10px;
        margin-left: 450px;
        color: #4e4e4e;
        font-weight: 700;
        align-items: center;
        span{
            color: #35EA47;
        }
        }
        .account-options{
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        width: 350px;
        height: 50%;
        align-items: center;
        margin-left: 400px;
        color: #4e4e4e;
        font-weight: 700;
        }
    }
`;

export default Header;