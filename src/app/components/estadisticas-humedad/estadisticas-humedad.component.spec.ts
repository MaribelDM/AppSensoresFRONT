import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasHumedadComponent } from './estadisticas-humedad.component';

describe('EstadisticasHumedadComponent', () => {
  let component: EstadisticasHumedadComponent;
  let fixture: ComponentFixture<EstadisticasHumedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticasHumedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasHumedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
