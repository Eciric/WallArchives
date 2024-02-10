import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreComponent } from './explore.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from '../search/search.component';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ExploreComponent, NavigationComponent, SearchComponent],
    });
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
