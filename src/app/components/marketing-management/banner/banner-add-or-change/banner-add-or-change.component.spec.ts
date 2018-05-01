import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAddOrChangeComponent } from './banner-add-or-change.component';

describe('BannerAddOrChangeComponent', () => {
  let component: BannerAddOrChangeComponent;
  let fixture: ComponentFixture<BannerAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
