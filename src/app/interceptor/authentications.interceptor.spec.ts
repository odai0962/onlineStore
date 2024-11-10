import { TestBed } from '@angular/core/testing';

import { AuthenticationsInterceptor } from './authentications.interceptor';

describe('AuthenticationsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenticationsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenticationsInterceptor = TestBed.inject(AuthenticationsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
