import { getWeatherData } from '../../client/openWeatherMap/openWeatherClient';
const MIN_VALUE_NEEDED_AN_UMBRELLA = 0.13;
const ADD_HOURS_PADDING = 3;

const getDateAddingHoursToCurrentTime = (hours: number): Date => {
    const dateExtended = new Date(Date.now());
    dateExtended.setTime(dateExtended.getTime() + hours * 60 * 60 * 1000);

    return dateExtended;
};

export const shouldUseUmbrella = async (
    lat: number,
    lon: number
): Promise<boolean> => {
    const weatherData = await getWeatherData(lat, lon);
    const limitDateChecked = getDateAddingHoursToCurrentTime(
        12 + ADD_HOURS_PADDING
    );
    const minimumDateChecked = getDateAddingHoursToCurrentTime(
        ADD_HOURS_PADDING
    );

    return weatherData.list
        .filter(dataPoint => {
            const dateOfDataPoint = new Date(dataPoint.dt * 1000);
            return (
                minimumDateChecked <= dateOfDataPoint &&
                dateOfDataPoint <= limitDateChecked
            );
        })
        .some(
            ({ rain, snow }) =>
                (rain && rain['3h'] >= MIN_VALUE_NEEDED_AN_UMBRELLA) ||
                (snow && snow['3h'] >= MIN_VALUE_NEEDED_AN_UMBRELLA)
        );
};
