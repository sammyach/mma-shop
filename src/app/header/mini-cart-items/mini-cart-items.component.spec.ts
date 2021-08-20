import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCartItemsComponent } from './mini-cart-items.component';

describe('MiniCartItemsComponent', () => {
  let component: MiniCartItemsComponent;
  let fixture: ComponentFixture<MiniCartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCartItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
