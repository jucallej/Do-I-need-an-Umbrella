import { getCurrentPosition } from "../utils";
import { MockParams, MockResponseInitFunction } from "jest-fetch-mock";

describe('Utils', () => {

  describe('getCurrentPosition', () => {
    type mockType = jest.Mock<any, [any]>;
    type promiseFunctionType = (resolve: any, reject: any) => any;
    type MockOrFunction = mockType| promiseFunctionType;

    // @ts-ignore
    const mockNavigator = (fn: MockOrFunction) => window.navigator = { geolocation: { getCurrentPosition: fn } };

    beforeEach(() => {
      // @ts-ignore
      delete window.navigator;
    });

    it('rejects the promise if the browser does not support it', () => {
      // @ts-ignore
      window.navigator = {};
      expect.assertions(1);
      return getCurrentPosition().catch(e => expect(e).toMatch('No browser support'));
    });

    it('rejects the promise if getCurrentPosition fails', () => {
      mockNavigator((_, reject) => reject('GPS error'));
      expect.assertions(1);
      return getCurrentPosition().catch(e => expect(e).toMatch('GPS error'));
    });

    it('passes the options to getCurrentPosition', async () => {
      const getCurrentPositionMock = jest.fn((resolve) => resolve('test'));
      mockNavigator(getCurrentPositionMock);
      await getCurrentPosition({testOption: 'test'});
      expect(getCurrentPositionMock).toHaveBeenCalledWith(expect.anything(), expect.anything(), {testOption: 'test'});
    });

    it('returns the return value of getCurrentPosition if it is successful', async () => {
      const getCurrentPositionMock = jest.fn((resolve) => resolve({coords: {latitude: 1, longitude: 2}}));
      mockNavigator(getCurrentPositionMock);
      const { coords } = await getCurrentPosition({testOption: 'test'});
      expect(coords).toStrictEqual({latitude: 1, longitude: 2});
    });
  });
});
