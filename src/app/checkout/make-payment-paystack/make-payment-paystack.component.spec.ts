import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentPaystackComponent } from './make-payment-paystack.component';

describe('MakePaymentPaystackComponent', () => {
  let component: MakePaymentPaystackComponent;
  let fixture: ComponentFixture<MakePaymentPaystackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentPaystackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePaymentPaystackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
