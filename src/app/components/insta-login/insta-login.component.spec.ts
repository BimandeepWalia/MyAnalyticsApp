import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaLoginComponent } from './insta-login.component';

describe('InstaLoginComponent', () => {
  let component: InstaLoginComponent;
  let fixture: ComponentFixture<InstaLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstaLoginComponent]
    });
    fixture = TestBed.createComponent(InstaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
