import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import customerMocks from 'components/__mocks__/customerMocks';
import CustomerTable from 'components/CustomerTable';

describe('CustomerTable', () => {
  it('shows customers', () => {
    const { getByText } = render(<CustomerTable items={customerMocks} />);
    expect(
      getByText(
        'Veritatis minus sequi vel perferendis ullam est est qui. Sed quaerat consequatur omnis corporis commodi perferendis. Blanditiis ex consequatur explicabo sint. Mollitia quis eligendi molestiae autem debitis aut ut nihil.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Dolorem voluptate omnis. Harum quis in nisi id deserunt nihil unde. Architecto vel eligendi maiores neque cupiditate quasi dolorem.'
      )
    ).toBeInTheDocument();
  });

  it('shows no customers message', () => {
    const { queryByText } = render(<CustomerTable items={[]} />);
    expect(
      queryByText(
        'Veritatis minus sequi vel perferendis ullam est est qui. Sed quaerat consequatur omnis corporis commodi perferendis. Blanditiis ex consequatur explicabo sint. Mollitia quis eligendi molestiae autem debitis aut ut nihil.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Dolorem voluptate omnis. Harum quis in nisi id deserunt nihil unde. Architecto vel eligendi maiores neque cupiditate quasi dolorem.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.customer.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<CustomerTable items={customerMocks} onSelect={onSelectMock} />);
    fireEvent.click(
      getByText(
        'Veritatis minus sequi vel perferendis ullam est est qui. Sed quaerat consequatur omnis corporis commodi perferendis. Blanditiis ex consequatur explicabo sint. Mollitia quis eligendi molestiae autem debitis aut ut nihil.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
