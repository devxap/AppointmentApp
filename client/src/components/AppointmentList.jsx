import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "../utils/axiosConfig";
import { host } from '../utils/APIRoutes';
import { useAppointments } from "./Contextapi";
import approve from '../assests/approve.png';
import disapprove from '../assests/reject.png';

const AppointmentList = () => {
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
            fetchUserDetails(f.student);
            fetchUserDetails(f.teacher);
        });

    }, [appointments]);

    const appoint = async (fID) => {
        try {
            await axios.patch(`${host}/appoint`, { appointmentID: fID });
            await fetchAppointments(loggedinuser._id);
        } catch (error) {
            console.error('Error updating approval:', error);
        }
    };

    const reject = async (fID) => {
        try {
            await axios.patch(`${host}/reject`, { appointmentID: fID });
            await fetchAppointments(loggedinuser._id);
        } catch (error) {
            console.error('Error updating approval:', error);
        }
    };

    if (loggedinuser) {
        return (
            <Container>
                <Content>
                    <div>
                        <h2>Appointment List</h2>
                    </div>
                    <AppointmentContainer>
                        {appointments.map((f) => (
                            <Card key={f._id}>
                                <div>Appointment ID: {f._id}</div>
                                <div>Student ID: {f.student}</div>
                                <div>Student Name: {userDetails[f.student]?.user.name || 'Loading...'}</div>
                                <div>Date: {f.date}</div>
                                <div>Time: {f.time}</div>
                                <ActionButtons>
                                    {f.approvalStatus ? (
                                        <>
                                            <span>Reject</span>
                                            <ActionIcon src={disapprove} onClick={() => reject(f._id)} alt="Reject" />
                                        </>
                                    ) : (
                                        <>
                                            <span>Approve</span>
                                            <ActionIcon src={approve} onClick={() => appoint(f._id)} alt="Approve" />
                                        </>
                                    )}
                                </ActionButtons>
                            </Card>
                        ))}
                    </AppointmentContainer>
                </Content>
            </Container>
        );
    } else {
        return (
            <div>Null</div>
        );
    }
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
`;

const AppointmentContainer = styled.div`
    max-height: 400px; /* Adjust the max height as needed */
    overflow-y: auto;
`;

const Card = styled.div`
    border-bottom: 1px solid #e0e0e0;
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    &:last-child {
        border-bottom: none;
    }

    div {
        margin-bottom: 10px;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

    span {
        font-size: 14px;
        font-weight: bold;
    }
`;

const ActionIcon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`;

export default AppointmentList;
