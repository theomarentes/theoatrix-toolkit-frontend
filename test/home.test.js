import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomeForm from '../src/components/HomeForm';
import '@testing-library/jest-dom';


const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockedNavigate, 
}));

describe('HomeForm', () => {
  const setup = () => render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<HomeForm />} />
      </Routes>
    </MemoryRouter>
  );

  it('renders correctly', () => {
    setup();
    expect(screen.getByPlaceholderText('Enter Your RuneScape Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('updates input field correctly', () => {
    setup();
    const input = screen.getByPlaceholderText('Enter Your RuneScape Name');
    fireEvent.change(input, { target: { value: 'testUser' } });
    expect(input.value).toBe('testUser');
  });

  it('navigates to the tracker page on form submission', () => {
    setup();
    const input = screen.getByPlaceholderText('Enter Your RuneScape Name');
    fireEvent.change(input, { target: { value: 'testUser' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(mockedNavigate).toHaveBeenCalledWith('/tracker/testUser');
  });
});
