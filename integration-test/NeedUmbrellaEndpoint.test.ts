import nock from 'nock';
import request from 'supertest';
import app from '../api/app';
import OpenWeatherMapResponse from './mock_responses/5DaysOpenweathermap.json';

export interface NeedUmbrellaEndpoint {
    rain: number;
    snow: number;
    result: boolean;
}

describe('NeedUmbrellaEndpoint', () => {
    const TEST_LATITUDE = 35;
    const TEST_LONGITUDE = 139;
    const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
    const MOCK_DATE = new Date('2019-09-27T15:00:00.000Z');

    beforeAll(() => {
        const mock = jest.spyOn(Date, 'now');
        mock.mockImplementation(() => MOCK_DATE.getTime());
    });

    // https://openweathermap.org/weather-conditions

    it.each`
        rain    | snow    | result
        ${0}    | ${0}    | ${false}
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

            nock('https://api.openweathermap.org')
                .get(
                    `/data/2.5/forecast?lat=${TEST_LATITUDE}&lon=${TEST_LONGITUDE}&APPID=${OPEN_WEATHER_MAP_API_KEY}`
                )
                .reply(200, OpenWeatherMapResponse);

            request(app)
                .get(
                    `/api/needUmbrella?lat=${TEST_LATITUDE}&lon=${TEST_LONGITUDE}`
                )
                .expect('access-control-allow-origin', '*')
                .expect(200, { shouldUseUmbrella: result }, done);
        }
    );
});
