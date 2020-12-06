import { getCurrentPosition } from '../utils';

describe('Utils', () => {
    describe('getCurrentPosition', () => {
        let windowSpy: jest.SpyInstance<unknown>;

        beforeEach(() => {
            windowSpy = jest.spyOn(global, 'window', 'get');
        });

        afterEach(() => {
            windowSpy.mockRestore();
        });

        const mockNavigator = (fn: jest.Mock): void => {
            windowSpy.mockImplementation(() => ({
                navigator: {
                    geolocation: { getCurrentPosition: fn },
                },
            }));
        };

        const COORDINATES_OPTIONS_FIXTURE = {
             accuracy: 1,
             altitude: null,
             altitudeAccuracy: null,
             heading: null,
             latitude: 12,
             longitude: 123,
             speed: null,
        };

        const POSITION_FIXTURE = {
            coords: COORDINATES_OPTIONS_FIXTURE,
            timestamp: 1234,
       };

        const POSITION_OPTIONS_FIXTURE = {
            enableHighAccuracy: false,
            maximumAge: 1,
            timeout: 2,
        };


        it('rejects the promise if the browser does not support it', () => {
            windowSpy.mockImplementation(() => ({ navigator: {} }));
            expect.assertions(1);
            return getCurrentPosition().catch((e) =>
                expect(e).toMatch('No browser support')
            );
        });

        it('rejects the promise if getCurrentPosition fails', () => {
            const getCurrentPositionMock = jest.fn((_, reject) =>
                reject('GPS error')
            );
            mockNavigator(getCurrentPositionMock);
            expect.assertions(1);
            return getCurrentPosition().catch((e) =>
                expect(e).toMatch('GPS error')
            );
        });

        it('passes the options to getCurrentPosition', async () => {
            const getCurrentPositionMock = jest.fn((resolve, _reject, _options) =>
                resolve(POSITION_FIXTURE)
            );
            mockNavigator(getCurrentPositionMock);
            await getCurrentPosition(POSITION_OPTIONS_FIXTURE);
            expect(getCurrentPositionMock).toHaveBeenCalledWith(
                expect.anything(),
                expect.anything(),
                POSITION_OPTIONS_FIXTURE
            );
        });

        it('returns the return value of getCurrentPosition if it is successful', async () => {
            const getCurrentPositionMock = jest.fn((resolve) =>
                resolve(POSITION_FIXTURE)
            );
            mockNavigator(getCurrentPositionMock);
            const { coords } = await getCurrentPosition(POSITION_OPTIONS_FIXTURE);
            expect(coords).toStrictEqual(POSITION_FIXTURE.coords);
        });
    });
});
