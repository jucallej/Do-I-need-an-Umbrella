import nock from 'nock';
import request from 'supertest';
import app from '../app';
import OpenWeatherMapResponse from './mock_responses/5DaysOpenweathermap.json';

describe('NeedUmbrellaEndpoint', () => {
    const TEST_LATITUDE = '35';
    const TEST_LONGITUDE = '139';
    const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
    const MOCK_DATE = new Date(2019, 9, 30);

    beforeAll(() => {
        // @ts-ignore
        global.Date = jest.fn(() => MOCK_DATE);
    });

    // https://openweathermap.org/weather-conditions

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
        'returns true when all weather ids are equals or higher than 700 (in this case some weather id was set to ' +
            '$weatherId and it should return $result)',
        // @ts-ignore
        ({ weatherId, result }, done) => {
            OpenWeatherMapResponse.list[3].weather[0].id = weatherId;

            nock('https://api.openweathermap.org')
                .get(
                    `/data/2.5/forecast?lat=${TEST_LATITUDE}&lon=${TEST_LONGITUDE}&APPID=${OPEN_WEATHER_MAP_API_KEY}`
                )
                .reply(200, OpenWeatherMapResponse);

            request(app)
                .get('/api/needUmbrella')
                .expect(200, { shouldUseUmbrella: result }, done);
        }
    );
});
