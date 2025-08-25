import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesService, Quote } from '../../services/quotes.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  // current quote
  quote: Quote | null = null;

  constructor(private quotesService: QuotesService) {
    console.log('QuotesComponent constructed');
  }

  // On component init, load a quote
  ngOnInit(): void {
    this.loadQuote();
  }

  // Fetch a random quote from the service
  loadQuote(): void {
    // Use the QuotesService to get a random quote
    this.quotesService.getRandomQuote().subscribe({
      next: (data: Quote) => {
        this.quote = data;
      },
      // Handle error
      error: (err) => {
        console.error('Error fetching quote:', err);
        // fallback if API fails
        this.quote = {
          quote: 'Creativity takes courage.',
          author: 'Henri Matisse'
        };
      }
    });
  }

  // Share the quote using Web Share API or fallback to copy
  async shareQuote(): Promise<void> {
    if (!this.quote) return;

    const text = `"${this.quote.quote}" — ${this.quote.author}`;

    //Browser supports native sharing
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspirational Quote',
          text,
          url: window.location.href
        });
        console.log('Quote shared successfully!');
        return;
      } catch (err) {
        console.warn('Share cancelled or failed:', err);
      }
    }

    // fallback if no native share
    this.copyQuote();
  }

  //copy to clipboard
  async copyQuote(): Promise<void> {
    if (!this.quote) return;
    const text = `"${this.quote.quote}" — ${this.quote.author}`;

    if (navigator.clipboard) {
        try {
      // Ensure we're inside a user gesture (button click)
      if (document.hasFocus()) {
        await navigator.clipboard.writeText(`"${this.quote.quote}" — ${this.quote.author}`);
        console.log('Quote copied to clipboard!');
        alert('📋 Quote copied to clipboard!');
      } else {
        console.warn('Clipboard write blocked: document not focused.');
        alert('⚠️ Please click on the page before copying.');
      }
    } catch (err) {
      console.error('Clipboard error:', err);
      alert('❌ Failed to copy quote. Try selecting manually.');
    }
    }
  }

  // Twitter share link
  get twitterLink(): string {
    if (!this.quote) return '';
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${this.quote.quote}" — ${this.quote.author}`
    )}`;
  }

  // Facebook share link
  get facebookLink(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
  }
}
