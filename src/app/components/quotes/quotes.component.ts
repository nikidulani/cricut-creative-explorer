import { Component, OnInit } from '@angular/core';
import { QuotesService, Quote } from '../../services/quotes.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent implements OnInit {
  quote: Quote | null = null;

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.loadQuote();
  }

  loadQuote(): void {
    this.quotesService.getRandomQuote().subscribe({
      next: (data : any) => {
        if (Array.isArray(data) && data.length > 0) {
          this.quote = data[0];
        }
      },
      error: (err) => {
        console.error('Error fetching quote:', err);
      }
    });
  }
}
