import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "../utils/axiosConfig";
import { host } from '../utils/APIRoutes';
import { useAppointments } from "./Contextapi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FacultyList = () => {
    const { appointments, fetchAppointments } = useAppointments();
    const { count, fetchAppointmentCount } = useAppointments();
    const [teacherslist, setTeacherslist] = useState([]);
    const loggedinuser = JSON.parse(localStorage.getItem('appointment-session'));
    const [values, setValues] = useState({
        time: "",
        date: "",
    });

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const resp = await axios.get(`${host}/teachers`);
                setTeacherslist(resp.data.users);
            } catch (error) {
                console.error('Error fetching list:', error);
            }
        };
        fetchdata();
    }, []);

    if (!loggedinuser) {
        console.error('No logged in user found in localStorage');
        return null;
    }

    const studentID = loggedinuser._id;
    const request = async (teacherID) => {
        try {
            const timeString = values.time;
            await axios.post(`${host}/request`, { studentID, teacherID, time: timeString, date: values.date });
            fetchAppointments(loggedinuser._id); // Refresh appointments
            fetchAppointmentCount(loggedinuser._id); // Refresh count
            toast.success('Request sent successfully!');
        } catch (error) {
            console.error('Error updating approval:', error);
            toast.error('Failed to send request.');
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        <Container>
            <FormContainer>
                <div>
                    <h1>Request Appointment</h1>
                </div>
                <Input
                    type="time"
                    placeholder='Time'
                    name='time'
                    value={values.time}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    type="date"
                    placeholder='Date'
                    name='date'
                    value={values.date}
                    onChange={(e) => handleChange(e)}
                />
            </FormContainer>
            <ListContainer>
                <List>
                    {teacherslist.map((f) => (
                        <Card key={f._id}>
                            <div>Faculty ID: {f._id}</div>
                            <div>Facuty Name: {f.name} </div>
                            <div>Faculty Email: {f.email} </div>
                            <Button onClick={() => request(f._id)}>Request Appointment</Button>
                        </Card>
                    ))}
                </List>
            </ListContainer>
            <ToastContainer position="bottom-right" />
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f9fa;
    padding: 20px;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline: none;
    &:focus {
        border-color: #80bdff;
        box-shadow: 0 0 5px rgba(128, 189, 255, 0.5);
    }
`;

const ListContainer = styled.div`
    width: 100%;
    max-width: 800px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto; /* Make the list scrollable */
`;

const List = styled.div`
    max-height: 350px; /* Set a max height for the list */
    overflow-y: auto; /* Make the list scrollable */
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

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

export default FacultyList;
