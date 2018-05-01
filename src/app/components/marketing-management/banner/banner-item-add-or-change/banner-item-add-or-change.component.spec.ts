import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerItemAddOrChangeComponent } from './banner-item-add-or-change.component';

describe('BannerItemAddOrChangeComponent', () => {
  let component: BannerItemAddOrChangeComponent;
  let fixture: ComponentFixture<BannerItemAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerItemAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerItemAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
