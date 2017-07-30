import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationdialogComponent } from './creationdialog.component';

describe('CreationdialogComponent', () => {
  let component: CreationdialogComponent;
  let fixture: ComponentFixture<CreationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
