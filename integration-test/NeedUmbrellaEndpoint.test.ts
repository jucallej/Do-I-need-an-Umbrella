import nock from 'nock';
import request from 'supertest';
import App from '../app.js';
import OpenWeatherMapResponse from './mock_responses/5DaysOpenweathermap.json';

describe('NeedUmbrellaEndpoint', () => {
    const TEST_LATITUDE = '35';
    const TEST_LONGITUDE = '139';
    const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

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
        `('returns true when all weather ids are equals or higher than 700 (in this case some weather id was set to ' +
            // @ts-ignore
            '$weatherId and it should return $result)', ({weatherId, result}, done) => {

        OpenWeatherMapResponse.list[3].weather[0].id = weatherId;

        nock('https://api.openweathermap.org')
            .get(`/data/2.5/forecast?lat=${TEST_LATITUDE}&lon=${TEST_LONGITUDE}&APPID=${OPEN_WEATHER_MAP_API_KEY}`)
            .reply(200, OpenWeatherMapResponse);

        request(App)
            .get('/api/needUmbrella')
            .expect(200,
                { shouldUseUmbrella: result },
                done);
    });
});
