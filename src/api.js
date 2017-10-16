const API_URL = 'http://beluga-prod.herokuapp.com';

export const getEvents = () => fetch(`${API_URL}/events`);
