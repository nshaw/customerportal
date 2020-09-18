import PropTypes from 'prop-types';

const customerType = PropTypes.shape({
  id: PropTypes.number,

  customerName: PropTypes.string,
  notes: PropTypes.string,
});

export default customerType;
