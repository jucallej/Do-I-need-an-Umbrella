import * as React from "react";
import { useShouldUseUmbrella } from './useShouldUseUmbrella';

export enum UmbrellaState {
  LOADING_LOCATION,
  LOADING_WEATHER,
  USE_UMBRELLA,
  DO_NOT_USE_UMBRELLA,
  ERROR,
}

const DescriptionForUmbrellaStates = new Map<UmbrellaState, string>([
  [UmbrellaState.LOADING_LOCATION, 'Loading you location'],
  [UmbrellaState.LOADING_WEATHER, 'Loading the weather conditions'],
  [UmbrellaState.USE_UMBRELLA, 'Use an umbrella today'],
  [UmbrellaState.DO_NOT_USE_UMBRELLA, 'Do not use an umbrella today'],
  [UmbrellaState.ERROR, 'There was an error. Did you allow the location permissions?']
]);

const App = () => {
  const shouldUseUmbrella = useShouldUseUmbrella();

  return <h1>{ DescriptionForUmbrellaStates.get(shouldUseUmbrella) }</h1>
};

export default App;
