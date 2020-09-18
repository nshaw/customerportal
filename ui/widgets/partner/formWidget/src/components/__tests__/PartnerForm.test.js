import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import partnerMock from 'components/__mocks__/partnerMocks';
import PartnerForm from 'components/PartnerForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Partner Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <PartnerForm partner={partnerMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.partner.partnerName').value).toBe(
      'Aut rerum est molestias. Omnis ratione cumque repellendus omnis nihil. Quis error deleniti non eos.'
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PartnerForm partner={partnerMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('partner-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
