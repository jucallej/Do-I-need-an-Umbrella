import express, { Express } from 'express';
import request from 'supertest';
import { shouldUseUmbrella } from '../../service/needUmbrellaService';
import needUmbrellaController from '../needUmbrellaController';
jest.mock('../../service/needUmbrellaService');

describe('Need Umbrella Controller', () => {
    const TEST_LATITUDE = 35;
    const TEST_LONGITUDE = 139;
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use('/test', needUmbrellaController);
    });

    it.each`
        shouldUseUmbrellaReturnValue
        ${true}
        ${false}
    `(
        'returns shouldUseUmbrellaReturnValue in the json response when shouldUseUmbrellaReturnValue returns $shouldUseUmbrella',
        // @ts-ignore
        ({ shouldUseUmbrellaReturnValue }, done) => {
            (shouldUseUmbrella as jest.Mock).mockImplementation((lat, lon) => {
                if (lat === TEST_LATITUDE && lon === TEST_LONGITUDE) {
                    return Promise.resolve(shouldUseUmbrellaReturnValue);
                } else {
                    return Promise.reject();
                }
            });

            request(app)
                .get(
                    `/test/needUmbrella?lat=${TEST_LATITUDE}&lon=${TEST_LONGITUDE}`
                )
                .expect(
                    200,
                    { shouldUseUmbrella: shouldUseUmbrellaReturnValue },
                    done
                );
        }
    );
});
