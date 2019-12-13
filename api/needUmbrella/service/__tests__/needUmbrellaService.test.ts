import OpenWeatherMapResponse from '../../../../integration-test/mock_responses/5DaysOpenweathermap.json';
import { getWeatherData } from '../../../client/openWeatherMap/openWeatherClient';
import { shouldUseUmbrella } from '../needUmbrellaService';
import { NeedUmbrellaEndpoint } from '../../../../integration-test/NeedUmbrellaEndpoint.test';
jest.mock('../../../client/openWeatherMap/openWeatherClient');

describe('Need Umbrella Service', () => {
    const TEST_LATITUDE = 35;
    const TEST_LONGITUDE = 139;
    const MOCK_DATE = new Date('2019-09-27T15:00:00.000Z');

    beforeAll(() => {
        const mock = jest.spyOn(Date, 'now');
        mock.mockImplementation(() => MOCK_DATE.getTime());
    });

    it.each`
        weatherId | result
        ${200}    | ${true}
        ${300}    | ${true}
        ${400}    | ${true}
        ${500}    | ${true}
        ${600}    | ${true}
        ${699}    | ${true}
        ${700}    | ${false}
        ${800}    | ${false}
    `(
        'returns true when all weather ids in the next 12 hours are equals or higher than 700 (in this case some weather id was set to ' +
            '$weatherId and it should return $result)',
        (args, done) => {
            const { weatherId, result } = args as NeedUmbrellaEndpoint;
            OpenWeatherMapResponse.list[3].weather[0].id = weatherId;
            // Make sure the values after 12 hours are ignored
            OpenWeatherMapResponse.list[38].weather[0].id = 200;
            (getWeatherData as jest.Mock).mockImplementation((lat, lon) => {
                if (lat === TEST_LATITUDE && lon === TEST_LONGITUDE) {
                    return Promise.resolve(OpenWeatherMapResponse);
                } else {
                    return Promise.reject();
                }
            });

            shouldUseUmbrella(TEST_LATITUDE, TEST_LONGITUDE).then(
                useUmbrella => {
                    expect(useUmbrella).toBe(result);
                    done();
                }
            );
        }
    );
});
