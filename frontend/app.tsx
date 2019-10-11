import * as React from "react";
import { useShouldUseUmbrella } from './useShouldUseUmbrella';

const FAKE_LAT = 35;
const FAKE_LONG = 139;

export enum UmbrellaState {
  LOADING,
  USE_UMBRELLA,
  DO_NOT_USE_UMBRELLA,
}

const App = () => {
  const shouldUseUmbrella = useShouldUseUmbrella(FAKE_LAT, FAKE_LONG);

  const umbrellaDescription = shouldUseUmbrella === UmbrellaState.USE_UMBRELLA ? 'Use an umbrella today' :
    shouldUseUmbrella === UmbrellaState.DO_NOT_USE_UMBRELLA ? 'Do not use an umbrella today' :
      'Loading ...';

  return <h1>{ umbrellaDescription }</h1>
};

export default App;
