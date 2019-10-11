import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { UmbrellaState } from './app';

export const useShouldUseUmbrella = (
    lat: number,
    long: number
): UmbrellaState => {
    const [shouldUseUmbrella, setShouldUseUmbrella] = useState<UmbrellaState>(
        UmbrellaState.LOADING
    );

    useAsyncEffect(
        async isMounted => {
            if (shouldUseUmbrella === UmbrellaState.LOADING) {
                const response = await fetch(
                    `/api/needUmbrella?lat=${lat}&lon=${long}`
                );
                const json = await response.json();
                if (!isMounted()) return;

                setShouldUseUmbrella(
                    json.shouldUseUmbrella
                        ? UmbrellaState.USE_UMBRELLA
                        : UmbrellaState.DO_NOT_USE_UMBRELLA
                );
            }
        },
        [shouldUseUmbrella]
    );

    return shouldUseUmbrella;
};
