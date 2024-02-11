import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { WallService } from './wall.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Wall } from 'src/app/interfaces/wall';
import { isEqual } from 'lodash';

describe('WallService', () => {
  let service: WallService;
  let httpSpy: Spy<HttpClient>;

  let fakeWalls: Wall[] = [
    {
      _id: '65c3f07e1b69e02d19a415fb',
      _uid: '65c3f07e1b69e02d19a415fb',
      title: 'A test wallpaper',
      path: '/test.png',
      tags: 'sky, tree, forest, urban, colorful',
      date: new Date(),
    },
    {
      _id: '65c3f07e1b69e02d19a415fc',
      _uid: '65c3f07e1b69e02d19a415fc',
      title: 'A test wallpaper 1',
      path: '/test1.png',
      tags: 'sky, tree, forest, urban, colorful',
      date: new Date(),
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ],
    });
    service = TestBed.inject(WallService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('httpSpy should be created', () => {
    expect(httpSpy).toBeTruthy();
  });

  it('should return the expected wallpapers', () => {
    httpSpy.get.and.nextWith(fakeWalls);

    service.fetchAllImages().subscribe((walls) => {
      expect(walls).toHaveSize(fakeWalls.length);
      walls.forEach((wall, index) => {
        expect(isEqual(wall, fakeWalls[index])).toBeTruthy();
      });
    });

    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
