import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TrackerForm from '../src/components/TrackerForm';

describe('TrackerForm', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<TrackerForm />);
    const inputElement = getByPlaceholderText('Enter Your RuneScape Name');
    const buttonElement = getByText('Search');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    const { getByPlaceholderText } = render(<TrackerForm />);
    const inputElement = getByPlaceholderText('Enter Your RuneScape Name');

    fireEvent.change(inputElement, { target: { value: 'testUsername' } });

    expect(inputElement.value).toBe('testUsername');
  });

  test('shows loading image when searching', () => {
    const { getByPlaceholderText, getByAltText } = render(<TrackerForm />);
    const inputElement = getByPlaceholderText('Enter Your RuneScape Name');

    fireEvent.change(inputElement, { target: { value: 'testUsername' } });
    fireEvent.click(getByAltText('loading...'));

    expect(getByAltText('loading...')).toBeInTheDocument();
  });
});
