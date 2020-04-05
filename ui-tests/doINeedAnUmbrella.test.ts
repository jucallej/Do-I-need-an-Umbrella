import { toMatchImageSnapshot } from 'jest-image-snapshot';
import LandingPage from './pages/landingPage';
import RequestInterceptor, {
    FETCH_STATUS,
} from './requests/requestInterceptor';
expect.extend({ toMatchImageSnapshot });

const customConfig = {
    customDiffConfig: { threshold: 1.6 },
};

describe('do I need an umbrella', () => {
    let requestInterceptor: RequestInterceptor;

    beforeAll(async () => {
        requestInterceptor = new RequestInterceptor();
        await requestInterceptor.start();
    });

    beforeEach(() => {
        requestInterceptor.setUmbrellaFetchStatus(FETCH_STATUS.NEED_UMBRELLA);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        requestInterceptor.setCallBackOnUmbrellaFetch(async () => {});
    });

    describe('main flows', () => {
        it('shows the need for an umbrella', async () => {
            const landingPage = new LandingPage();
            await landingPage.start();

            await expect(await landingPage.screenshot()).toMatchImageSnapshot(
                customConfig
            );
            await expect(await landingPage.title()).toMatch(
                'Do I need an Umbrella'
            );
        });

        it('shows the not need of an umbrella', async () => {
            requestInterceptor.setUmbrellaFetchStatus(
                FETCH_STATUS.DO_NOT_NEED_UMBRELLA
            );

            const landingPage = new LandingPage();
            await landingPage.start();

            await expect(await landingPage.screenshot()).toMatchImageSnapshot(
                customConfig
            );
        });
    });

    describe('loading', () => {
        it('shows loading while it loads the response from the back end', (done) => {
            const landingPage = new LandingPage();

            requestInterceptor.setCallBackOnUmbrellaFetch(async () => {
                await expect(
                    await landingPage.screenshot()
                ).toMatchImageSnapshot(customConfig);
                done();
            });

            landingPage.start();
        });
    });

    describe('errors', () => {
        it('shows an error when there is a fetch error', async () => {
            requestInterceptor.setUmbrellaFetchStatus(FETCH_STATUS.ERROR);

            const landingPage = new LandingPage();
            await landingPage.start([]);

            await expect(await landingPage.screenshot()).toMatchImageSnapshot(
                customConfig
            );
        });

        it('shows an error when there are no permissions', async () => {
            const landingPage = new LandingPage();
            await landingPage.start([]);

            await expect(await landingPage.screenshot()).toMatchImageSnapshot(
                customConfig
            );
        });
    });
});
