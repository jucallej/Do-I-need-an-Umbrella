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
        rain    | snow    | result
        ${0}    | ${0}    | ${false}
        ${0.12} | ${0.12} | ${false}
        ${0.13} | ${0}    | ${true}
        ${0}    | ${0.13} | ${true}
    `(
        'returns true when some rain or snow percentage is higher than 0.13 (in this case the rain was set to $rain ' +
            'and the snow was set to $snow and it should return $result)',
        (args, done) => {
            const { rain, snow, result } = args as NeedUmbrellaEndpoint;
            // Make sure the values before 3 hours are ignored
            OpenWeatherMapResponse.list[0].rain = { '3h': 1000 };
            OpenWeatherMapResponse.list[0].snow = { '3h': 1000 };

            OpenWeatherMapResponse.list[1].rain = { '3h': rain };
            OpenWeatherMapResponse.list[1].snow = { '3h': snow };

            // Make sure the values after 12 + 3 hours are ignored
            OpenWeatherMapResponse.list[6].rain = { '3h': 1000 };
            OpenWeatherMapResponse.list[6].snow = { '3h': 1000 };

            (getWeatherData as jest.Mock).mockImplementation((lat, lon) => {
                if (lat === TEST_LATITUDE && lon === TEST_LONGITUDE) {
                    return Promise.resolve(OpenWeatherMapResponse);
                } else {
                    return Promise.reject();
                }
            });

            shouldUseUmbrella(TEST_LATITUDE, TEST_LONGITUDE).then(
                (useUmbrella) => {
                    expect(useUmbrella).toBe(result);
                    done();
                }
            );
        }
    );
});
