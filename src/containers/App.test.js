import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const sampleUsers = [
    { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
    { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
];

beforeEach(() => {
    global.fetch = jest.fn();
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('loads users and filters the cards by name', async () => {
    global.fetch.mockResolvedValue({
        ok: true,
        json: async () => sampleUsers,
    });

    render(<App />);

    expect(await screen.findByText('2 robots found')).toBeInTheDocument();
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search robots by name' }), {
        target: { value: 'leanne' },
    });

    expect(screen.getByText('1 robot found')).toBeInTheDocument();
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search robots by name' }), {
        target: { value: 'nobody' },
    });
    expect(screen.getByText('No robots match “nobody”. Try another name.')).toBeInTheDocument();
});

test('reports a failed request and retries successfully', async () => {
    global.fetch
        .mockRejectedValueOnce(new Error('Network unavailable'))
        .mockResolvedValueOnce({
            ok: true,
            json: async () => sampleUsers,
        });

    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
        'Could not load the robots. Check your connection and try again.'
    );

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByText('2 robots found')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);
});

test('shows a loading message until the request settles', () => {
    global.fetch.mockReturnValue(new Promise(() => {}));

    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading robots…');
});
