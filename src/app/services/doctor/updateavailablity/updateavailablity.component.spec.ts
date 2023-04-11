import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateavailablityComponent } from './updateavailablity.component';

describe('UpdateavailablityComponent', () => {
  let component: UpdateavailablityComponent;
  let fixture: ComponentFixture<UpdateavailablityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateavailablityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateavailablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
