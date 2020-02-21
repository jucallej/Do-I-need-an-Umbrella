import { renderHook } from '@testing-library/react-hooks';
import { useShouldUseUmbrella } from '../useShouldUseUmbrella';
import { UmbrellaState } from '../app';
import { getCurrentPosition } from '../utils';
import { MockResponseInit } from 'jest-fetch-mock';
jest.mock('../utils');

describe('shouldUseUmbrella', () => {
    beforeAll(() => {
        window.API_GW_URL = 'https://test.com';
    });

    beforeEach(() => {
        fetchMock.resetMocks();
        (getCurrentPosition as jest.Mock).mockReturnValue(
            Promise.resolve({ coords: { latitude: 1, longitude: 2 } })
        );
    });

    it('returns by default LOADING_LOCATION', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ shouldUseUmbrella: true }));

        const { result, waitForNextUpdate } = renderHook(() =>
            useShouldUseUmbrella()
        );
        expect(result.current).toBe(UmbrellaState.LOADING_LOCATION);
        await waitForNextUpdate();
    });

    it('changes from LOADING_LOCATION to LOADING_WEATHER to USE_UMBRELLA using getCurrentPosition and fetching the data', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useShouldUseUmbrella()
        );
        expect(result.current).toBe(UmbrellaState.LOADING_LOCATION);

        fetchMock.mockResponseOnce(
            (): Promise<MockResponseInit> => {
                expect(result.current).toBe(UmbrellaState.LOADING_WEATHER);
                return Promise.resolve({
                    body: JSON.stringify({ shouldUseUmbrella: true })
                });
            }
        );

        await waitForNextUpdate();
        expect(result.current).toBe(UmbrellaState.USE_UMBRELLA);
        expect(getCurrentPosition).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith(
            'https://test.com/api/needUmbrella?lat=1&lon=2'
        );
    });

    it('changes from LOADING_LOCATION to LOADING_WEATHER to DO_NOT_USE_UMBRELLA using getCurrentPosition and fetching the data', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useShouldUseUmbrella()
        );
        expect(result.current).toBe(UmbrellaState.LOADING_LOCATION);

        fetchMock.mockResponseOnce(
            (): Promise<MockResponseInit> => {
                expect(result.current).toBe(UmbrellaState.LOADING_WEATHER);
                return Promise.resolve({
                    body: JSON.stringify({ shouldUseUmbrella: false })
                });
            }
        );

        await waitForNextUpdate();
        expect(result.current).toBe(UmbrellaState.DO_NOT_USE_UMBRELLA);
        expect(getCurrentPosition).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith(
            'https://test.com/api/needUmbrella?lat=1&lon=2'
        );
    });

    it('changes from LOADING_LOCATION to ERROR when getCurrentPosition returns an error', async () => {
        (getCurrentPosition as jest.Mock).mockReturnValue(
            Promise.reject('some error')
        );

        const { result, waitForNextUpdate } = renderHook(() =>
            useShouldUseUmbrella()
        );
        expect(result.current).toBe(UmbrellaState.LOADING_LOCATION);

        await waitForNextUpdate();
        expect(result.current).toBe(UmbrellaState.ERROR);
        expect(getCurrentPosition).toHaveBeenCalled();
    });

    it('changes from LOADING_LOCATION to LOADING_WEATHER to ERROR when fetching returns an error', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useShouldUseUmbrella()
        );
        expect(result.current).toBe(UmbrellaState.LOADING_LOCATION);

        fetchMock.mockResponseOnce(
            (): Promise<MockResponseInit> => {
                expect(result.current).toBe(UmbrellaState.LOADING_WEATHER);
                return Promise.reject('some error');
            }
        );

        await waitForNextUpdate();
        expect(result.current).toBe(UmbrellaState.ERROR);
        expect(getCurrentPosition).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith(
            'https://test.com/api/needUmbrella?lat=1&lon=2'
        );
    });
});
