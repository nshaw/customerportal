import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import projectType from 'components/__types__/project';

const ProjectFieldTable = ({ t, i18n: { language }, project }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{t('common.name')}</TableCell>
        <TableCell>{t('common.value')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <span>{t('entities.project.id')}</span>
        </TableCell>
        <TableCell>
          <span>{project.id}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.project.projectName')}</span>
        </TableCell>
        <TableCell>
          <span>{project.projectName}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.project.subscriptionVersion')}</span>
        </TableCell>
        <TableCell>
          <span>{project.subscriptionVersion}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.project.subscriptionStartDate')}</span>
        </TableCell>
        <TableCell>
          <span>
            {project.subscriptionStartDate &&
              new Date(project.subscriptionStartDate).toLocaleDateString(language)}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.project.subscriptionEndDate')}</span>
        </TableCell>
        <TableCell>
          <span>
            {project.subscriptionEndDate &&
              new Date(project.subscriptionEndDate).toLocaleDateString(language)}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.project.notes')}</span>
        </TableCell>
        <TableCell>
          <span>{project.notes}</span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

ProjectFieldTable.propTypes = {
  project: projectType,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
  }).isRequired,
};

ProjectFieldTable.defaultProps = {
  project: [],
};

export default withTranslation()(ProjectFieldTable);
