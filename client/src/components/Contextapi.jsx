import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { host } from '../utils/APIRoutes';

const AppointmentContext = createContext();

export const useAppointments = () => {
    return useContext(AppointmentContext);
};

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [count, setCount] = useState(0);

    const fetchAppointments = async (userId) => {
        try {
            const response = await axios.get(`${host}/appointments/${userId}`);
            setAppointments(response.data.users);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchAppointmentCount = async (userID) => {
        try {
            const response = await axios.get(`${host}/countDocuments/${userID}`);
            setCount(response.data.count);
        } catch (error) {
            console.error('Error fetching appointment count:', error);
        }
    };

    return (
        <AppointmentContext.Provider value={{ appointments, fetchAppointments, count, fetchAppointmentCount }}>
            {children}
        </AppointmentContext.Provider>
    );
};
