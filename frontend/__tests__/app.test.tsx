import * as React from 'react';
import { shallow } from 'enzyme';
import App, { UmbrellaState } from '../app';
import { useShouldUseUmbrella } from '../useShouldUseUmbrella';
jest.mock('../useShouldUseUmbrella');

describe('App', () => {
    it('has the correct class name', () => {
        (useShouldUseUmbrella as jest.Mock).mockReturnValue(
            UmbrellaState.LOADING_LOCATION
        );
        const wrapper = shallow(<App />);
        expect(
            wrapper
                .find('section')
                .at(0)
                .hasClass('app')
        ).toBeTruthy();
        expect(wrapper.find('section > section').hasClass('icon')).toBeTruthy();
        expect(
            wrapper.find('section > section > SvgLoading').hasClass('svg')
        ).toBeTruthy();
        expect(wrapper.find('section > h1').hasClass('title')).toBeTruthy();
    });

    it('uses the LOADING_LOCATION state', () => {
        (useShouldUseUmbrella as jest.Mock).mockReturnValue(
            UmbrellaState.LOADING_LOCATION
        );
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1').text()).toBe('Loading your location');
        expect(wrapper.find('SvgLoading')).toHaveLength(1);
    });

    it('uses the LOADING_WEATHER state', () => {
        (useShouldUseUmbrella as jest.Mock).mockReturnValue(
            UmbrellaState.LOADING_WEATHER
        );
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1').text()).toBe(
            'Loading the weather conditions'
        );
        expect(wrapper.find('SvgLoading')).toHaveLength(1);
    });

    it('uses the USE_UMBRELLA state', () => {
        (useShouldUseUmbrella as jest.Mock).mockReturnValue(
            UmbrellaState.USE_UMBRELLA
        );
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1').text()).toBe('Use an umbrella today');
        expect(wrapper.find('SvgUmbrella')).toHaveLength(1);
    });

    it('uses the DO_NOT_USE_UMBRELLA state', () => {
        (useShouldUseUmbrella as jest.Mock).mockReturnValue(
            UmbrellaState.DO_NOT_USE_UMBRELLA
        );
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1').text()).toBe('Do not use an umbrella today');
        expect(wrapper.find('SvgClearWeather')).toHaveLength(1);
    });

    it('uses the ERROR state', () => {
        (useShouldUseUmbrella as jest.Mock).mockReturnValue(
            UmbrellaState.ERROR
        );
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1').text()).toBe(
            'There was an error. Did you allow the location permissions?'
        );
        expect(wrapper.find('SvgError')).toHaveLength(1);
    });
});
