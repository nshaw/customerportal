import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import partnerMocks from 'components/__mocks__/partnerMocks';
import PartnerTable from 'components/PartnerTable';

describe('PartnerTable', () => {
  it('shows partners', () => {
    const { getByText } = render(<PartnerTable items={partnerMocks} />);
    expect(
      getByText(
        'Aut rerum est molestias. Omnis ratione cumque repellendus omnis nihil. Quis error deleniti non eos.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Ab aut velit magnam. Tempora occaecati non ut a laboriosam rem. Ea ullam iste autem beatae quis non sed. Vel non rerum architecto modi quasi et fuga placeat. Est commodi non deleniti repudiandae omnis.'
      )
    ).toBeInTheDocument();
  });

  it('shows no partners message', () => {
    const { queryByText } = render(<PartnerTable items={[]} />);
    expect(
      queryByText(
        'Aut rerum est molestias. Omnis ratione cumque repellendus omnis nihil. Quis error deleniti non eos.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Ab aut velit magnam. Tempora occaecati non ut a laboriosam rem. Ea ullam iste autem beatae quis non sed. Vel non rerum architecto modi quasi et fuga placeat. Est commodi non deleniti repudiandae omnis.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.partner.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<PartnerTable items={partnerMocks} onSelect={onSelectMock} />);
    fireEvent.click(
      getByText(
        'Aut rerum est molestias. Omnis ratione cumque repellendus omnis nihil. Quis error deleniti non eos.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
