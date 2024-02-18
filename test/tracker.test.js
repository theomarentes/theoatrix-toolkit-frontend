import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TrackerDisplay from '../src/components/TrackerDisplay';
import { TrackerContext } from '../src/contexts/TrackerProvider';
import { MemoryRouter } from 'react-router-dom';
import TrackerForm from '../src/components/TrackerForm';

const mockTrackerData = {
  data: {
    displayName: 'TestUser',
    type: 'regular',
    combatLevel: 99,
    latestSnapshot: {
      data: {
        skills: {
          overall: { level: 2051 }
        },
        bosses: {},
        activities: {}
      }
    }
  }
};

describe('TrackerDisplay', () => {
  it('renders user data correctly', () => {
    render(
      <TrackerContext.Provider value={{ trackerData: mockTrackerData }}>
        <TrackerDisplay />
      </TrackerContext.Provider>
    );

    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('Regular')).toBeInTheDocument();
    expect(screen.getByText('Combat Level')).toBeInTheDocument();
  });


});
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('TrackerForm', () => {
  it('submits the form and navigates correctly', () => {
    const mockSetTrackerData = jest.fn();

    render(
      <MemoryRouter>
        <TrackerContext.Provider value={{ trackerData: {}, setTrackerData: mockSetTrackerData }}>
          <TrackerForm />
        </TrackerContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter Your RuneScape Name'), { target: { value: 'TestUser' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(mockedNavigate).toHaveBeenCalledWith('/tracker/TestUser');
  });

  // You can add more tests related to UI changes or context updates
});