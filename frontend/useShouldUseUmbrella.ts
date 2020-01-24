import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { UmbrellaState } from './app';
import { getCurrentPosition } from './utils';

interface Coordinates {
    latitude: number;
    longitude: number;
}

export const useShouldUseUmbrella = (): UmbrellaState => {
    const [shouldUseUmbrella, setShouldUseUmbrella] = useState<UmbrellaState>(
        UmbrellaState.LOADING_LOCATION
    );

    const [locationCoordinates, setLocationCoordinates] = useState<Coordinates>(
        { latitude: 0, longitude: 0 }
    );

    useAsyncEffect(
        async isMounted => {
            try {
                switch (shouldUseUmbrella) {
                    case UmbrellaState.LOADING_LOCATION:
                        {
                            const { coords } = await getCurrentPosition();
                            if (!isMounted()) return;
                            setLocationCoordinates(coords);
                            setShouldUseUmbrella(UmbrellaState.LOADING_WEATHER);
                        }
                        break;
                    case UmbrellaState.LOADING_WEATHER:
                        {
                            const response = await fetch(
                                `${window.API_GW_URL}/api/needUmbrella?lat=${locationCoordinates.latitude}&lon=${locationCoordinates.longitude}`
                            );
                            const json = await response.json();
                            if (!isMounted()) return;

                            setShouldUseUmbrella(
                                json.shouldUseUmbrella
                                    ? UmbrellaState.USE_UMBRELLA
                                    : UmbrellaState.DO_NOT_USE_UMBRELLA
                            );
                        }
                        break;
                }
            } catch (e) {
                setShouldUseUmbrella(UmbrellaState.ERROR);
            }
        },
        [shouldUseUmbrella]
    );

    return shouldUseUmbrella;
};
