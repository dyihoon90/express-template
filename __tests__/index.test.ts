import { testService } from '../src/app/service/test.service';

describe('Hello world', () => {
  it('should return hello world', () => {
    expect(testService()).toEqual('hi');
  });
});
