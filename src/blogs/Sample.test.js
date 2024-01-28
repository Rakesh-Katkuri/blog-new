import React from 'react';
import { render } from '@testing-library/react';
import Sample from './Sample';

describe('Sample Component', () => {
  it('renders without error', () => {
    render(<Sample />);
  });
});
