type PositionCallbackType = Parameters<
    typeof window.navigator.geolocation.getCurrentPosition
>[0];
type PositionType = Parameters<PositionCallbackType>[0];
type CoordinateType = PositionType['coords'];

export const getCurrentPosition = (
    options = {}
): Promise<{ coords: CoordinateType }> => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in window.navigator) {
            window.navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                options
            );
        } else {
            reject('No browser support');
        }
    });
};
