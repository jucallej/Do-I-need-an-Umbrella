import { getCurrentPosition } from '../utils';

describe('Utils', () => {
    describe('getCurrentPosition', () => {
        const mockNavigator = (fn: jest.Mock): void => {
            global.window.navigator = {
                geolocation: { getCurrentPosition: fn },
            };
        };

        beforeEach(() => {
            delete global.window.navigator;
        });

        it('rejects the promise if the browser does not support it', () => {
            global.window.navigator = {};
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
