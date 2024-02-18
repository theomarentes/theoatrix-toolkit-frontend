import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from "../src/components/LoginForm"

describe('LoginForm', () => {
  const mockLogin = jest.fn((email, password) => {
    return Promise.resolve({ email, password });
  });

  beforeEach(() => {
    render(<LoginForm onLogin={mockLogin} errorMessage="" />);
  });

  it('renders correctly', () => {
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

 
  
  it('displays error message when provided', () => {
    render(<LoginForm onLogin={mockLogin} errorMessage="Login failed" />);
    expect(screen.getByText(/login failed/i)).toBeInTheDocument();
  });
});
