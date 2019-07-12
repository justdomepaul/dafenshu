import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSetComponent } from './class-set.component';

describe('ClassSetComponent', () => {
  let component: ClassSetComponent;
  let fixture: ComponentFixture<ClassSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
