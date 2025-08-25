import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesComponent } from './quotes.component';

// Test suite for QuotesComponent
describe('Quotes', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;

  // Setup before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotesComponent]
    })
    .compileComponents();

    // Create component instance
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case to check component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
