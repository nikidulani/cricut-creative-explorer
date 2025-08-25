import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuotesComponent } from './quotes.component';
import { QuotesService } from '../../services/quotes.service';

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, QuotesComponent], // ✅ standalone component
      providers: [QuotesService]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges(); // triggers ngOnInit → loadQuote()
    const req = httpMock.expectOne('https://quoteslate.vercel.app/api/quotes/random');
    req.flush({ quote: 'Init Quote', author: 'Init Author' });
    expect(component).toBeTruthy();
  });

  it('should load a quote from API', () => {
    fixture.detectChanges();

    const mockQuote = { quote: 'Be yourself; everyone else is already taken.', author: 'Oscar Wilde' };
    const req = httpMock.expectOne('https://quoteslate.vercel.app/api/quotes/random');
    expect(req.request.method).toBe('GET');
    req.flush(mockQuote);

    expect(component.quote?.quote).toBe(mockQuote.quote);
    expect(component.quote?.author).toBe(mockQuote.author);
  });

  it('should handle API error and set fallback quote', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('https://quoteslate.vercel.app/api/quotes/random');
    req.error(new ErrorEvent('Network error'));

    expect(component.quote).toEqual({
      quote: 'Creativity takes courage.',
      author: 'Henri Matisse'
    } as any);
  });
});
