import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaSetComponent } from './area-set.component';

describe('AreaSetComponent', () => {
  let component: AreaSetComponent;
  let fixture: ComponentFixture<AreaSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
