import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import mockAxios from "axios";

beforeEach(() => {
    (mockAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
            data: {
                feed: {
                    entry: [
                        {
                            title: {
                                label: 'Doolittle - Pixies',
                            },
                            "im:image": [
                                {
                                    label: "image.url",
                                },
                                {
                                    label: "image.url",
                                },
                                {
                                    label: "image.url",
                                }
                            ]
                        },
                        {
                            title: {
                                label: 'Joyland - TR/ST'
                            },
                            "im:image": [
                                {
                                    label: "image.url",
                                },
                                {
                                    label: "image.url",
                                },
                                {
                                    label: "image.url",
                                }
                            ]
                        },
                        {
                            title: {
                                label: 'Geidi Primes - Grimes'
                            },
                            "im:image": [
                                {
                                    label: "image.url",
                                },
                                {
                                    label: "image.url",
                                },
                                {
                                    label: "image.url",
                                }
                            ]
                        }
                    ]
                }
            }
        })
    );

});



test('updates albums on searchbox change', async () => {

    act(() => {
        render(<App/>);
    });

    const loadingMessage = screen.queryByText(/Loading.../i);

    expect(loadingMessage).toBeTruthy();

    const albumTitle = await screen.findByText(/Doolittle - Pixies/i);

    expect(albumTitle).toBeTruthy();

    const searchbox = screen.getByLabelText('search-input');

    fireEvent.change(searchbox, {target: {value: 'Joy'}});
    const anotherAlbumTitle = await screen.findByText(/Joyland - TR\/ST/i);
    const albumTitleAgain = screen.queryByText(/Doolittle - Pixies/i);

    expect(albumTitleAgain).toBeNull();
    expect(anotherAlbumTitle).toBeTruthy();

});

test('updates list on filter change', async () => {

    act(() => {
        render(<App/>);
    });

    const loadingMessage = screen.queryByText(/Loading.../i);

    expect(loadingMessage).toBeTruthy();

    const albumTitle = await screen.findByText(/Doolittle - Pixies/i);

    expect(albumTitle).toBeTruthy();

    const filterMin = screen.getByLabelText('filter-min');
    const filterMax = screen.getByLabelText('filter-max');

    fireEvent.change(filterMin, {target: {value: '2'}});
    const firstAlbumTitle = await screen.findByText(/Joyland - TR\/ST/i);
    const secondAlbumTitle = screen.queryByText(/Doolittle - Pixies/i);
    const thirdAlbumTitle = screen.queryByText(/Geidi Primes - Grimes/i);

    expect(secondAlbumTitle).toBeNull();
    expect(firstAlbumTitle).toBeTruthy();
    expect(thirdAlbumTitle).toBeTruthy();

    fireEvent.change(filterMin, {target: {value: '1'}});
    fireEvent.change(filterMax, {target: {value: '2'}});

    const firstAlbumTitleAgain = await screen.findByText(/Doolittle - Pixies/i);
    const secondAlbumTitleAgain = screen.queryByText(/Joyland - TR\/ST/i);
    const thirdAlbumTitleAgain = screen.queryByText(/Geidi Primes - Grimes/i);

    expect(thirdAlbumTitleAgain).toBeNull();
    expect(firstAlbumTitleAgain).toBeTruthy();
    expect(secondAlbumTitleAgain).toBeTruthy();

});
