import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiProjectPost } from 'api/projects';
import ProjectAddFormContainer from 'components/ProjectAddFormContainer';
import 'i18n/__mocks__/i18nMock';
import projectMock from 'components/__mocks__/projectMocks';

jest.mock('api/projects');
jest.mock('@material-ui/pickers', () => {
  // eslint-disable-next-line react/prop-types
  const MockPicker = ({ id, value, name, label, onChange }) => {
    const handleChange = (event) => onChange(event.currentTarget.value);
    return (
      <span>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} value={value || ''} onChange={handleChange} />
      </span>
    );
  };
  return {
    ...jest.requireActual('@material-ui/pickers'),
    DateTimePicker: MockPicker,
    DatePicker: MockPicker,
  };
});

jest.mock('auth/withKeycloak', () => {
  const withKeycloak = (Component) => {
    return (props) => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        keycloak={{
          initialized: true,
          authenticated: true,
        }}
      />
    );
  };

  return withKeycloak;
});

describe('ProjectAddFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onCreateMock = jest.fn();

  it('saves data', async () => {
    apiProjectPost.mockImplementation((data) => Promise.resolve(data));

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <ProjectAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />
    );

    const projectNameField = await findByLabelText('entities.project.projectName');
    fireEvent.change(projectNameField, { target: { value: projectMock.projectName } });
    const subscriptionVersionField = await findByLabelText('entities.project.subscriptionVersion');
    fireEvent.change(subscriptionVersionField, {
      target: { value: projectMock.subscriptionVersion },
    });
    const subscriptionStartDateField = await findByLabelText(
      'entities.project.subscriptionStartDate'
    );
    fireEvent.change(subscriptionStartDateField, {
      target: { value: projectMock.subscriptionStartDate },
    });
    const subscriptionEndDateField = await findByLabelText('entities.project.subscriptionEndDate');
    fireEvent.change(subscriptionEndDateField, {
      target: { value: projectMock.subscriptionEndDate },
    });
    const notesField = await findByLabelText('entities.project.notes');
    fireEvent.change(notesField, { target: { value: projectMock.notes } });
    rerender(<ProjectAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiProjectPost).toHaveBeenCalledTimes(1);
      expect(apiProjectPost).toHaveBeenCalledWith('', projectMock);

      expect(queryByText(successMessageKey)).toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiProjectPost.mockImplementation(() => Promise.reject());

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <ProjectAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />
    );

    const projectNameField = await findByLabelText('entities.project.projectName');
    fireEvent.change(projectNameField, { target: { value: projectMock.projectName } });
    const subscriptionVersionField = await findByLabelText('entities.project.subscriptionVersion');
    fireEvent.change(subscriptionVersionField, {
      target: { value: projectMock.subscriptionVersion },
    });
    const subscriptionStartDateField = await findByLabelText(
      'entities.project.subscriptionStartDate'
    );
    fireEvent.change(subscriptionStartDateField, {
      target: { value: projectMock.subscriptionStartDate },
    });
    const subscriptionEndDateField = await findByLabelText('entities.project.subscriptionEndDate');
    fireEvent.change(subscriptionEndDateField, {
      target: { value: projectMock.subscriptionEndDate },
    });
    const notesField = await findByLabelText('entities.project.notes');
    fireEvent.change(notesField, { target: { value: projectMock.notes } });
    rerender(<ProjectAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiProjectPost).toHaveBeenCalledTimes(1);
      expect(apiProjectPost).toHaveBeenCalledWith('', projectMock);

      expect(queryByText(successMessageKey)).not.toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
