import { TestBed } from '@angular/core/testing';

import { UserListGuard } from './user-list.guard';

describe('UserListGuard', () => {
  let guard: UserListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
