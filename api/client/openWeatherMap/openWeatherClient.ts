import fetch from 'node-fetch';
const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

export const getWeatherData = async (
    lat: number,
    long: number
): Promise<{
    list: Array<{ dt: number; weather: Array<{ id: number }> }>;
    city: { name: string };
}> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${OPEN_WEATHER_MAP_API_KEY}`
    );
    return await response.json();
};
