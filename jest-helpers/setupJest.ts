import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {GlobalWithFetchMock} from "jest-fetch-mock";
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

process.env.OPEN_WEATHER_MAP_API_KEY = 'OPEN_WEATHER_MAP_API_KEY';
