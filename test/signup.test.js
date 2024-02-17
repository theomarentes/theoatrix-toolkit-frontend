import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../src/components/SignUpForm';

describe('SignUpForm', () => {
  const mockSignUp = jest.fn((email, password) => {
    return Promise.resolve({ email, password });
  });

  beforeEach(() => {
    render(<SignUpForm onSignUp={mockSignUp} />);
  });

  it('renders correctly', () => {
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

 
 
});
