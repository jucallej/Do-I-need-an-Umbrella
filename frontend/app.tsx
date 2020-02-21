import * as React from 'react';
import { useShouldUseUmbrella } from './useShouldUseUmbrella';
import styles from './app.css';
import Umbrella from './images/umbrella.svg';
import ClearWeather from './images/clearWeather.svg';
import Loading from './images/loading.svg';
import Error from './images/error.svg';

export enum UmbrellaState {
    LOADING_LOCATION,
    LOADING_WEATHER,
    USE_UMBRELLA,
    DO_NOT_USE_UMBRELLA,
    ERROR
}

const DescriptionForUmbrellaStates = new Map<UmbrellaState, string>([
    [UmbrellaState.LOADING_LOCATION, 'Loading you location'],
    [UmbrellaState.LOADING_WEATHER, 'Loading the weather conditions'],
    [UmbrellaState.USE_UMBRELLA, 'Use an umbrella today'],
    [UmbrellaState.DO_NOT_USE_UMBRELLA, 'Do not use an umbrella today'],
    [
        UmbrellaState.ERROR,
        'There was an error. Did you allow the location permissions?'
    ]
]);

const IconsForUmbrellaStates = new Map<UmbrellaState, SvgrComponent>([
    [UmbrellaState.LOADING_LOCATION, Loading],
    [UmbrellaState.LOADING_WEATHER, Loading],
    [UmbrellaState.USE_UMBRELLA, Umbrella],
    [UmbrellaState.DO_NOT_USE_UMBRELLA, ClearWeather],
    [UmbrellaState.ERROR, Error]
]);

const App: React.FunctionComponent = () => {
    const shouldUseUmbrella = useShouldUseUmbrella();
    const Icon = IconsForUmbrellaStates.get(shouldUseUmbrella) || Error;
    const describingText = DescriptionForUmbrellaStates.get(shouldUseUmbrella);

    return (
        <section className={styles.app}>
            <section className={styles.icon}>
                <Icon className={styles.svg} />
            </section>
            <h1 className={styles.title}>{describingText}</h1>
        </section>
    );
};

export default App;
