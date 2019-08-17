import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpaquesComponent } from './tipo-empaques.component';

describe('TipoEmpaquesComponent', () => {
  let component: TipoEmpaquesComponent;
  let fixture: ComponentFixture<TipoEmpaquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoEmpaquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
