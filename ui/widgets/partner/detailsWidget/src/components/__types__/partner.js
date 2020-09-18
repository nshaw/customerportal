import PropTypes from 'prop-types';

const partnerType = PropTypes.shape({
  id: PropTypes.number,

  partnerName: PropTypes.string,
  notes: PropTypes.string,
});

export default partnerType;
