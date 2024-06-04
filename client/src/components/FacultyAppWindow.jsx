import React from 'react';
import styled from 'styled-components';
import AppointmentList from '../components/AppointmentList';
import Header from './Header';

const FacultyAppWindow = () =>{
    const user = localStorage.getItem('appointment-session');
    return(
        <Container>
            {user?<AppointmentList/>:"Login First"}
        </Container>
    )
}

 
const Container=styled.div`
    
`;

export default FacultyAppWindow;