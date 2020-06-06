import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

require('jest-fetch-mock').enableMocks();

process.env.OPEN_WEATHER_MAP_API_KEY = 'OPEN_WEATHER_MAP_API_KEY';
