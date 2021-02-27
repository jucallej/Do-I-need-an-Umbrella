import { devices } from 'puppeteer';
import { Permission } from 'puppeteer';
const phone = devices['Pixel 2'];
const FRONT_END_URL = 'http://localhost:8080';

export default class LandingPage {
    // TODO: waiting on https://github.com/prettier/prettier/issues/7263
    // eslint-disable-next-line prettier/prettier
    #page = page;

    #setPermission = async (permissions: Permission[] = []): Promise<void> => {
        const context = browser.defaultBrowserContext();
        await context.overridePermissions(FRONT_END_URL, permissions);
    };

    start = async (
        permissions: Permission[] = ['geolocation']
    ): Promise<void> => {
        await this.#setPermission(permissions);
        await this.#page.emulate(phone);
        await this.#page.setGeolocation({ latitude: 1, longitude: 2 });

        await this.#page.goto(`${FRONT_END_URL}/Do-I-need-an-Umbrella`);
    };

    screenshot = async (): Promise<string | void | Buffer> => {
        return await this.#page.screenshot();
    };

    title = async (): Promise<string> => {
        return await this.#page.title();
    };
}
