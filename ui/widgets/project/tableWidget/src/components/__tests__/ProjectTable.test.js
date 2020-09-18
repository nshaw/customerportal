import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import projectMocks from 'components/__mocks__/projectMocks';
import ProjectTable from 'components/ProjectTable';

describe('ProjectTable', () => {
  it('shows projects', () => {
    const { getByText } = render(<ProjectTable items={projectMocks} />);
    expect(
      getByText(
        'Est unde quia voluptatem asperiores minima molestiae. Consectetur enim omnis quia et. Aliquid doloremque delectus quo unde est accusantium. Facere animi quia et iusto. Sunt voluptatem repellendus.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Culpa laudantium dolor reprehenderit est consequatur ea et fugit. Quidem voluptate molestiae ut quibusdam dolorem dolorem quia saepe. Id qui et quis nobis voluptatum et sint.'
      )
    ).toBeInTheDocument();
  });

  it('shows no projects message', () => {
    const { queryByText } = render(<ProjectTable items={[]} />);
    expect(
      queryByText(
        'Est unde quia voluptatem asperiores minima molestiae. Consectetur enim omnis quia et. Aliquid doloremque delectus quo unde est accusantium. Facere animi quia et iusto. Sunt voluptatem repellendus.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Culpa laudantium dolor reprehenderit est consequatur ea et fugit. Quidem voluptate molestiae ut quibusdam dolorem dolorem quia saepe. Id qui et quis nobis voluptatum et sint.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.project.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<ProjectTable items={projectMocks} onSelect={onSelectMock} />);
    fireEvent.click(
      getByText(
        'Est unde quia voluptatem asperiores minima molestiae. Consectetur enim omnis quia et. Aliquid doloremque delectus quo unde est accusantium. Facere animi quia et iusto. Sunt voluptatem repellendus.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
