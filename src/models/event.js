import PropTypes from 'prop-types';

export default PropTypes.shape({
    title: PropTypes.string.isRequired,
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
    location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired
    }),
    distance: PropTypes.number.isRequired,
    description: PropTypes.shape({
        text: PropTypes.string,
        html: PropTypes.string
    }),
    venue: PropTypes.string
});
