import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallCreateComponent } from './wall-create.component';

describe('WallCreateComponent', () => {
  let component: WallCreateComponent;
  let fixture: ComponentFixture<WallCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WallCreateComponent]
    });
    fixture = TestBed.createComponent(WallCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
