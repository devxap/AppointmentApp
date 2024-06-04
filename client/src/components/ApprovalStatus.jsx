import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "../utils/axiosConfig";
import { host } from '../utils/APIRoutes';
import { useAppointments } from "./Contextapi";

const ApprovalStatus = () => {
    const { appointments, fetchAppointments } = useAppointments();
    const [userDetails, setUserDetails] = useState({});
    const loggedinuser = JSON.parse(localStorage.getItem('appointment-session'));

    useEffect(() => {
        if (loggedinuser) {
            fetchAppointments(loggedinuser._id);
        }
    }, [loggedinuser, fetchAppointments]);

    useEffect(() => {
        const fetchUserDetails = async (id) => {
            if (!userDetails[id]) {
                try {
                    const resp = await axios.get(`${host}/userdetails/${id}`);
                    setUserDetails(prevDetails => ({
                        ...prevDetails,
                        [id]: resp.data
                    }));
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        appointments.forEach(f => {
            fetchUserDetails(f.teacher);
        });
    }, [appointments, userDetails]);

    return (
        <Container>
            <Content>
                <div>
                    <h1>Appointment Status</h1>
                </div>
                <CardsContainer>
                    {appointments.map((f) => (
                        <Card key={f._id}>
                            <InfoWrapper>
                                <InfoTitle>Appointment ID:</InfoTitle>
                                <InfoValue>{f._id}</InfoValue>
                            </InfoWrapper>
                            <InfoWrapper>
                                <InfoTitle>Faculty ID:</InfoTitle>
                                <InfoValue>{f.teacher}</InfoValue>
                            </InfoWrapper>
                            <InfoWrapper>
                                <InfoTitle>Faculty Name:</InfoTitle>
                                <InfoValue>{userDetails[f.teacher]?.user.name || 'Loading...'}</InfoValue>
                            </InfoWrapper>
                            <InfoWrapper>
                                <InfoTitle>Status:</InfoTitle>
                                <InfoValue>{JSON.stringify(f.approvalStatus)}</InfoValue>
                            </InfoWrapper>
                        </Card>
                    ))}
                </CardsContainer>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    padding: 20px;
`;

const Content = styled.div`
    width: 100%;
    max-width: 800px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    max-height: 492px; /* Adjust as needed */
`;

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Card = styled.div`
    border-bottom: 1px solid #e0e0e0;
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    &:last-child {
        border-bottom: none;
    }
`;

const InfoWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const InfoTitle = styled.div`
    font-weight: bold;
    margin-right: 10px;
`;

const InfoValue = styled.div`
    flex: 1;
`;

export default ApprovalStatus;
