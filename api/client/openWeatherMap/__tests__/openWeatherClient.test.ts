import nock from 'nock';
import OpenWeatherMapResponse from '../../../../integration-test/mock_responses/5DaysOpenweathermap.json';
import { getWeatherData } from '../openWeatherClient';

describe('Need Umbrella Controller', () => {
    const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
    const TEST_LATITUDE = 35;
    const TEST_LONGITUDE = 139;

    it('returns the fetched response from open weather', async () => {
        nock('https://api.openweathermap.org')
            .get(
                `/data/2.5/forecast?lat=${TEST_LATITUDE}&lon=${TEST_LONGITUDE}&APPID=${OPEN_WEATHER_MAP_API_KEY}`
            )
            .reply(200, OpenWeatherMapResponse);

        const weatherData = await getWeatherData(TEST_LATITUDE, TEST_LONGITUDE);
        expect(weatherData).toStrictEqual(OpenWeatherMapResponse);
    });
});
