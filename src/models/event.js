import PropTypes from 'prop-types';

export default PropTypes.shape({
    title: PropTypes.string.isRequired,
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
    location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired
    })
});
