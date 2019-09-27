import nock from 'nock';
import OpenWeatherMapResponse from './mock_responses/5DaysOpenweathermap.json';
const request = require('supertest');
import App from '../app.js';

describe('NeedUmbrellaEndpoint', () => {
    const TEST_LATITUDE = '35';
    const TEST_LONGITUDE = '139';
    const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

    it('returns true', (done) => {
        const scope = nock('https://api.openweathermap.org')
            .get(`/data/2.5/forecast?lat=${TEST_LATITUDE}&lon=${TEST_LONGITUDE}&APPID=${OPEN_WEATHER_MAP_API_KEY}`)
            .reply(200, OpenWeatherMapResponse);

        request(App)
            .get('/api/needUmbrella')
            .expect(200,
                { shouldUseUmbrella: false },
                done);
    });
});
