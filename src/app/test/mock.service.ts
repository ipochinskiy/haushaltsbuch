import {
    SinonStub,
    stub
} from 'sinon';

export interface MockService {
    [ name: string ]: SinonStub;
}

export class MockServiceProvider {
    static with(...names: string[]): MockService {
        const service: MockService = {};
        names.forEach(name => service[name] = stub());
        return service;
    }
}
