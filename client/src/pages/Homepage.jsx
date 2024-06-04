import React from 'react';
import styled from 'styled-components';
import StudentAppWindow from '../components/StudentAppWindow';
import FacultyAppWindow from '../components/FacultyAppWindow';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Homepage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('appointment-session'));
    
    React.useEffect(() => {
        if (!user) {
            window.location.reload();
        }
    }, [user]);

    if (!user) {
        return null; // or a loading spinner if you prefer
    }

    if (user.type === "t") {
        return (
            <Container>
                <Header/>
                <FacultyAppWindow />
            </Container>
        );
    } else if (user.type === "s") {
        return (
            <Container>
                <Header/>
                <StudentAppWindow />
            </Container>
        );
    } else {
        navigate("/login");
        return null;
    }
};

const Container = styled.div`
    // Your styles here
`;

export default Homepage;
