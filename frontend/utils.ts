export const getCurrentPosition = (
    options = {}
): Promise<{ coords: Coordinates }> => {
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
