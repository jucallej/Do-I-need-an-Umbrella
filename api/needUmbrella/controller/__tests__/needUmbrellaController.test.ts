import express, { Express } from 'express';
import request from 'supertest';
import { shouldUseUmbrella } from '../../service/needUmbrellaService';
import needUmbrellaController from '../needUmbrellaController';
jest.mock('../../service/needUmbrellaService');

describe('Need Umbrella Controller', () => {
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
            (shouldUseUmbrella as jest.Mock).mockReturnValue(
                shouldUseUmbrellaReturnValue
            );

            request(app)
                .get('/test/needUmbrella')
                .expect(
                    200,
                    { shouldUseUmbrella: shouldUseUmbrellaReturnValue },
                    done
                );
        }
    );
});
