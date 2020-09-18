import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  projectName: PropTypes.string.isRequired,
  subscriptionVersion: PropTypes.string,
  subscriptionStartDate: PropTypes.string,
  subscriptionEndDate: PropTypes.string,
  notes: PropTypes.string,
});

export const formValues = PropTypes.shape({
  projectName: PropTypes.string,
  subscriptionVersion: PropTypes.string,
  subscriptionStartDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  subscriptionEndDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  notes: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  projectName: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  subscriptionVersion: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  subscriptionStartDate: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  subscriptionEndDate: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  notes: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  projectName: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  subscriptionVersion: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  subscriptionStartDate: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  subscriptionEndDate: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  notes: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
