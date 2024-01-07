import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedInLoginComponent } from './linked-in-login.component';

describe('LinkedInLoginComponent', () => {
  let component: LinkedInLoginComponent;
  let fixture: ComponentFixture<LinkedInLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkedInLoginComponent]
    });
    fixture = TestBed.createComponent(LinkedInLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
