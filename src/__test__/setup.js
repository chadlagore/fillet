jest.mock('react-native-maps');
jest.mock('react-native-modal-datetime-picker');
jest.mock('./../api', () => ({
    getEvents: jest.fn(() => (async function () {})())
}));
