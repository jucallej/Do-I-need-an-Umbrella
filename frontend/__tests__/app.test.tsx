import * as React from "react";
import { shallow } from 'enzyme';
import App, { UmbrellaState } from '../App';
import { useShouldUseUmbrella } from '../useShouldUseUmbrella';
jest.mock('../useShouldUseUmbrella');

describe('App', () => {

  const generateUmbrellaDescription = () => shallow(<App/>).find('h1').text();

  it('uses the LOADING state', () => {
    (useShouldUseUmbrella as jest.Mock).mockReturnValue(UmbrellaState.LOADING);
    expect(generateUmbrellaDescription()).toBe('Loading ...');
  });

  it('uses the USE_UMBRELLA state', () => {
    (useShouldUseUmbrella as jest.Mock).mockReturnValue(UmbrellaState.USE_UMBRELLA);
    expect(generateUmbrellaDescription()).toBe('Use an umbrella today');
  });

  it('uses the DO_NOT_USE_UMBRELLA state', () => {
    (useShouldUseUmbrella as jest.Mock).mockReturnValue(UmbrellaState.DO_NOT_USE_UMBRELLA);
    expect(generateUmbrellaDescription()).toBe('Do not use an umbrella today');
  });
});
