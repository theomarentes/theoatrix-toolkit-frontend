
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SimulatorSearch from '../src/components/SimulatorSearch'; 
import SimulatorDisplay from '../src/components/SimulatorDisplay'; 
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('SimulatorSearch and SimulatorDisplay', () => {
  it('renders SimulatorSearch and submits form', async () => {
    render(<SimulatorSearch />);
    const input = screen.getByPlaceholderText('Enter A Boss Name');
    const quantityInput = screen.getByPlaceholderText('Enter Quantity');
    const button = screen.getByRole('button', { name: 'Simulate' });

    fireEvent.change(input, { target: { value: 'Zulrah' } });
    fireEvent.change(quantityInput, { target: { value: '100' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(input.value).toBe('Zulrah');
      // expect(quantityInput.value).toBe('100');
    });
  });

  it('fetches data and displays loot for a given monster', async () => {
    const mockMonsterData = {
      monster: {
        name: 'Zulrah',
        drops: [
          { id: 1, name: 'Magic logs', quantity: '100-200', rarity: 0.5, rolls: 1 },
          
        ],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockMonsterData));

    render(<SimulatorDisplay monsterName="Zulrah" quantity="100" />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('Zulrah'));
      // expect(screen.getByText('Zulrah x100')).toBeInTheDocument();
      
    });
  });

  
});
