const BACK_END_URL = 'http://localhost:3000/api';

export enum FETCH_STATUS {
    ERROR = 1,
    NEED_UMBRELLA,
    DO_NOT_NEED_UMBRELLA,
}

export default class RequestInterceptor {
    #fetchStatus = FETCH_STATUS.NEED_UMBRELLA;
    #page = page;
    #callBackOnUmbrellaFetch = async (): Promise<void> => Promise.resolve();

    start = async (): Promise<void> => {
        await this.#page.setRequestInterception(true);
        this.#page.on('request', async (interceptedRequest) => {
            if (
                interceptedRequest.url() ===
                `${BACK_END_URL}/needUmbrella?lat=1&lon=2`
            ) {
                await this.#callBackOnUmbrellaFetch();
                await interceptedRequest.respond({
                    headers: {
                        'access-control-allow-origin': '*',
                    },
                    status:
                        this.#fetchStatus !== FETCH_STATUS.ERROR ? 200 : 400,
                    body: JSON.stringify({
                        shouldUseUmbrella:
                            this.#fetchStatus === FETCH_STATUS.NEED_UMBRELLA,
                    }),
                });
            } else {
                await interceptedRequest.continue();
            }
        });
    };

    setUmbrellaFetchStatus = (umbrellaFetchStatus: FETCH_STATUS): void => {
        this.#fetchStatus = umbrellaFetchStatus;
    };

    setCallBackOnUmbrellaFetch(callback: () => Promise<void>): void {
        this.#callBackOnUmbrellaFetch = callback;
    }
}
