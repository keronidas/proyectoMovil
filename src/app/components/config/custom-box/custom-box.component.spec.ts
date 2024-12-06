import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBoxComponent } from './custom-box.component';

describe('CustomBoxComponent', () => {
  let component: CustomBoxComponent;
  let fixture: ComponentFixture<CustomBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
