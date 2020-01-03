import { NeedUmbrellaControllerParams } from './api/needUmbrella/controller/__tests__/needUmbrellaController.test';
import { NeedUmbrellaEndpoint } from './integration-test/NeedUmbrellaEndpoint.test';

export type JestEachArgument = NeedUmbrellaControllerParams | NeedUmbrellaEndpoint

declare global {
  namespace jest {
    interface Each {
      (strings: TemplateStringsArray, ...placeholders: any[]): (
        name: string,
        fn: (args: JestEachArgument, done: () => any) => any
      ) => void;
    }
  }
}
