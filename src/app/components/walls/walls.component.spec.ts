import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallsComponent } from './walls.component';

describe('WallsComponent', () => {
  let component: WallsComponent;
  let fixture: ComponentFixture<WallsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WallsComponent]
    });
    fixture = TestBed.createComponent(WallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
