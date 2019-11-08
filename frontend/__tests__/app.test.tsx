import * as React from "react";
import { shallow } from 'enzyme';
import App, { UmbrellaState } from '../app';
import { useShouldUseUmbrella } from '../useShouldUseUmbrella';
jest.mock('../useShouldUseUmbrella');

describe('App', () => {

  const generateUmbrellaDescription = () => shallow(<App/>).find('h1').text();

  it('uses the LOADING_LOCATION state', () => {
    (useShouldUseUmbrella as jest.Mock).mockReturnValue(UmbrellaState.LOADING_LOCATION);
    expect(generateUmbrellaDescription()).toBe('Loading you location');
  });

  it('uses the LOADING_WEATHER state', () => {
    (useShouldUseUmbrella as jest.Mock).mockReturnValue(UmbrellaState.LOADING_WEATHER);
    expect(generateUmbrellaDescription()).toBe('Loading the weather conditions');
  });

  it('uses the USE_UMBRELLA state', () => {
    (useShouldUseUmbrella as jest.Mock).mockReturnValue(UmbrellaState.USE_UMBRELLA);
    expect(generateUmbrellaDescription()).toBe('Use an umbrella today');
  });

  it('uses the DO_NOT_USE_UMBRELLA state', () => {
    (useShouldUseUmbrella as jest.Mock).mockReturnValue(UmbrellaState.DO_NOT_USE_UMBRELLA);
    expect(generateUmbrellaDescription()).toBe('Do not use an umbrella today');
  });

  it('uses the ERROR state', () => {
    (useShouldUseUmbrella as jest.Mock).mockReturnValue(UmbrellaState.ERROR);
    expect(generateUmbrellaDescription()).toBe('There was an error. Did you allow the location permissions?');
  });
});
