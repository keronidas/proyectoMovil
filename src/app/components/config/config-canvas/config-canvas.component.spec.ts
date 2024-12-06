import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCanvasComponent } from './config-canvas.component';

describe('ConfigCanvasComponent', () => {
  let component: ConfigCanvasComponent;
  let fixture: ComponentFixture<ConfigCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
