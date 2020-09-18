import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  partnerName: PropTypes.string.isRequired,
  notes: PropTypes.string,
});

export const formValues = PropTypes.shape({
  partnerName: PropTypes.string,
  notes: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  partnerName: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  notes: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  partnerName: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  notes: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
