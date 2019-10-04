import { getWeatherData } from '../../client/openWeatherMap/openWeatherClient';
const MIN_VALUE_FOR_GOOD_WEATHER = 700;

export const shouldUseUmbrella = async (
    lat: number,
    lon: number
): Promise<boolean> => {
    const weatherData = await getWeatherData(lat, lon);
    const limitDateChecked = new Date();
    limitDateChecked.setTime(limitDateChecked.getTime() + 12 * 60 * 60 * 1000);

    return !weatherData.list
        .filter(
            (dataPoint: { dt: number }) =>
                new Date(dataPoint.dt * 1000) <= limitDateChecked
        )
        .every((dataPoint: { weather: Array<{ id: number }> }) =>
            dataPoint.weather.every(
                (weatherPoint: { id: number }) =>
                    weatherPoint.id >= MIN_VALUE_FOR_GOOD_WEATHER
            )
        );
};
