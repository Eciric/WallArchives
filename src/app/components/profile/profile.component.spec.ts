import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileControlComponent } from './profile-control/profile-control.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [
        ProfileComponent,
        NavigationComponent,
        ProfileControlComponent,
      ],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
