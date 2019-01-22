import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatsComponent } from './sub-cats.component';

describe('SubCatsComponent', () => {
  let component: SubCatsComponent;
  let fixture: ComponentFixture<SubCatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
