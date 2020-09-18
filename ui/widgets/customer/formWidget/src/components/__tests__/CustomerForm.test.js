import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import customerMock from 'components/__mocks__/customerMocks';
import CustomerForm from 'components/CustomerForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Customer Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <CustomerForm customer={customerMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.customer.customerName').value).toBe(
      'Veritatis minus sequi vel perferendis ullam est est qui. Sed quaerat consequatur omnis corporis commodi perferendis. Blanditiis ex consequatur explicabo sint. Mollitia quis eligendi molestiae autem debitis aut ut nihil.'
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <CustomerForm customer={customerMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('customer-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
