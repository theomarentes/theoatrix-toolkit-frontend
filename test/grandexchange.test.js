import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import ItemDetails from '../src/components/GrandExchangeDisplay';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});


const mockTop10Items = {
  items: [
    { id: 4151, high: 3000000, low: 2800000 },
    
  ]
};

describe('ItemDetails Component', () => {
  
  it('displays top 10 items on initial load', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockTop10Items));

    render(<ItemDetails />);

    await waitFor(() => {
      expect(screen.getByText('Top 10 Items')).toBeInTheDocument();
      
    });
  });

  
});
