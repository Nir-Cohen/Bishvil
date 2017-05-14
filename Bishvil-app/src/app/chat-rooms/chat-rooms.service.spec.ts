/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatRoomsService } from './chat-rooms.service';

describe('ChatRoomsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatRoomsService]
    });
  });

  it('should ...', inject([ChatRoomsService], (service: ChatRoomsService) => {
    expect(service).toBeTruthy();
  }));
});
