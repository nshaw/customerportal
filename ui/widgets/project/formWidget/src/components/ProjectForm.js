import 'date-fns';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formValues, formTouched, formErrors } from 'components/__types__/project';
import { withFormik } from 'formik';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import dateFnsLocales from 'i18n/dateFnsLocales';
import ConfirmationDialogTrigger from 'components/common/ConfirmationDialogTrigger';

const styles = (theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
});
class ProjectForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleConfirmationDialogAction = this.handleConfirmationDialogAction.bind(this);
  }

  handleConfirmationDialogAction(action) {
    const { onDelete, values } = this.props;
    switch (action) {
      case ConfirmationDialogTrigger.CONFIRM: {
        onDelete(values);
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {
      classes,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit: formikHandleSubmit,
      onDelete,
      onCancelEditing,
      isSubmitting,
      setFieldValue,
      t,
      i18n,
    } = this.props;

    const handleDateChange = (field) => (value) => {
      setFieldValue(field, value);
    };

    const dateLabelFn = (date) => (date ? new Date(date).toLocaleDateString(i18n.language) : '');
    const getHelperText = (field) => (errors[field] && touched[field] ? errors[field] : '');

    const handleSubmit = (e) => {
      e.stopPropagation(); // avoids double submission caused by react-shadow-dom-retarget-events
      formikHandleSubmit(e);
    };

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateFnsLocales[i18n.language]}>
        <form onSubmit={handleSubmit} className={classes.root} data-testid="project-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="project-projectName"
                error={errors.projectName && touched.projectName}
                helperText={getHelperText('projectName')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.projectName}
                name="projectName"
                label={t('entities.project.projectName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="project-subscriptionVersion"
                error={errors.subscriptionVersion && touched.subscriptionVersion}
                helperText={getHelperText('subscriptionVersion')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subscriptionVersion}
                name="subscriptionVersion"
                label={t('entities.project.subscriptionVersion')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                id="project-subscriptionStartDate"
                error={errors.subscriptionStartDate && touched.subscriptionStartDate}
                helperText={getHelperText('subscriptionStartDate')}
                className={classes.textField}
                onChange={handleDateChange('subscriptionStartDate')}
                value={values.subscriptionStartDate}
                labelFunc={dateLabelFn}
                name="subscriptionStartDate"
                label={t('entities.project.subscriptionStartDate')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                id="project-subscriptionEndDate"
                error={errors.subscriptionEndDate && touched.subscriptionEndDate}
                helperText={getHelperText('subscriptionEndDate')}
                className={classes.textField}
                onChange={handleDateChange('subscriptionEndDate')}
                value={values.subscriptionEndDate}
                labelFunc={dateLabelFn}
                name="subscriptionEndDate"
                label={t('entities.project.subscriptionEndDate')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="project-notes"
                error={errors.notes && touched.notes}
                helperText={getHelperText('notes')}
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.notes}
                name="notes"
                label={t('entities.project.notes')}
              />
            </Grid>
            {onDelete && (
              <ConfirmationDialogTrigger
                onCloseDialog={this.handleConfirmationDialogAction}
                dialog={{
                  title: t('entities.project.deleteDialog.title'),
                  description: t('entities.project.deleteDialog.description'),
                  confirmLabel: t('common.yes'),
                  discardLabel: t('common.no'),
                }}
                Renderer={({ onClick }) => (
                  <Button onClick={onClick} disabled={isSubmitting}>
                    {t('common.delete')}
                  </Button>
                )}
              />
            )}

            <Button onClick={onCancelEditing} disabled={isSubmitting} data-testid="cancel-btn">
              {t('common.cancel')}
            </Button>

            <Button type="submit" color="primary" disabled={isSubmitting} data-testid="submit-btn">
              {t('common.save')}
            </Button>
          </Grid>
        </form>
      </MuiPickersUtilsProvider>
    );
  }
}

ProjectForm.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    textField: PropTypes.string,
    submitButton: PropTypes.string,
    button: PropTypes.string,
    downloadAnchor: PropTypes.string,
  }),
  values: formValues,
  touched: formTouched,
  errors: formErrors,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onCancelEditing: PropTypes.func,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({ language: PropTypes.string }).isRequired,
};

ProjectForm.defaultProps = {
  onCancelEditing: () => {},
  classes: {},
  values: {},
  touched: {},
  errors: {},
  onDelete: null,
};

const emptyProject = {
  projectName: '',
  subscriptionVersion: '',
  subscriptionStartDate: null,
  subscriptionEndDate: null,
  notes: '',
};

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required(),
  subscriptionVersion: Yup.string(),
  subscriptionStartDate: Yup.date().nullable(),
  subscriptionEndDate: Yup.date().nullable(),
  notes: Yup.string(),
});

const formikBag = {
  mapPropsToValues: ({ project }) => project || emptyProject,

  enableReinitialize: true,

  validationSchema,

  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values);
    setSubmitting(false);
  },

  displayName: 'ProjectForm',
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withTranslation(),
  withFormik(formikBag)
)(ProjectForm);
