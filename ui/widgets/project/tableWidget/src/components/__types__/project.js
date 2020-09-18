import PropTypes from 'prop-types';

const projectType = PropTypes.shape({
  id: PropTypes.number,

  projectName: PropTypes.string,
  subscriptionVersion: PropTypes.string,
  subscriptionStartDate: PropTypes.string,
  subscriptionEndDate: PropTypes.string,
  notes: PropTypes.string,
});

export default projectType;
