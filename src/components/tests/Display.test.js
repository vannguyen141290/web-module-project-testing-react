import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Display from '../Display';
import fetchShow from '../../api/fetchShow';
import userEvent from '@testing-library/user-event';

jest.mock('../../api/fetchShow');
const mockFunc = jest.fn();

const baseRender = () => {
    render(<Display />)
}

const mockFetch = () => {
    return (
        fetchShow.mockResolvedValueOnce({
            name: 'Stranger Things',
            summary: 'this is summary',
            seasons: [
                {
                    id: 1,
                    name: 'Season 1',
                    episodes: []
                },
                {
                    id: 2,
                    name: 'Season 2',
                    episodes: []
                },
                {
                    id: 3,
                    name: 'Season 3',
                    episodes: []
                },
            ],

        })
    )
}

test('Display Component renders without any props passed in', () => {
    baseRender();
})



test('test when the fetch button is pressed, the show component will display', async () => {
    mockFetch();
    baseRender();

    const button = screen.getByRole('button');
    userEvent.click(button);
    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();

})

test('when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data', async () => {
    mockFetch();
    baseRender();
    userEvent.click(screen.getByRole('button'));
    const optionsQuantity = await screen.findAllByRole('option');
    expect(optionsQuantity).toHaveLength(4)
})

test('displayFunc is called when pressing button', async () => {
    mockFetch();
    render(<Display displayFunc={mockFunc} />);
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(mockFunc).toBeCalledTimes(1));
})

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.