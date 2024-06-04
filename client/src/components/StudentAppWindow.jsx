import React from 'react';
import styled from 'styled-components';
import FacultyList from '../components/FacultyList';
import Header from './Header';
import ApprovalStatus from './ApprovalStatus';

const StudentAppWindow = () =>{
    const user = localStorage.getItem('appointment-session');

    return(
        <Container>
            {user?<FacultyList/>:"Login First"}
            <ApprovalStatus/>
        </Container>
    )
}

 
const Container=styled.div`
    display:flex;
    flex-direction: row;
`;

export default StudentAppWindow;