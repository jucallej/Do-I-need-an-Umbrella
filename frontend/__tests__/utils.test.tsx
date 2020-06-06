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
            const getCurrentPositionMock = jest.fn((resolve) =>
                resolve('test')
            );
            mockNavigator(getCurrentPositionMock);
            await getCurrentPosition({ testOption: 'test' });
            expect(getCurrentPositionMock).toHaveBeenCalledWith(
                expect.anything(),
                expect.anything(),
                {
                    testOption: 'test',
                }
            );
        });

        it('returns the return value of getCurrentPosition if it is successful', async () => {
            const getCurrentPositionMock = jest.fn((resolve) =>
                resolve({ coords: { latitude: 1, longitude: 2 } })
            );
            mockNavigator(getCurrentPositionMock);
            const { coords } = await getCurrentPosition({ testOption: 'test' });
            expect(coords).toStrictEqual({ latitude: 1, longitude: 2 });
        });
    });
});
