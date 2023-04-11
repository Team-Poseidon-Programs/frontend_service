import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowComplainsComponent } from './admin-show-complains.component';

describe('AdminShowComplainsComponent', () => {
  let component: AdminShowComplainsComponent;
  let fixture: ComponentFixture<AdminShowComplainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowComplainsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
