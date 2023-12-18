import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FBloginComponent } from './fblogin.component';

describe('FBloginComponent', () => {
  let component: FBloginComponent;
  let fixture: ComponentFixture<FBloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FBloginComponent]
    });
    fixture = TestBed.createComponent(FBloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
