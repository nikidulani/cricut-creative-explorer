import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quote {
  quote: string;  // the quote text
  author: string;  // the author
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  // API endpoint
  private apiUrl = 'https://quoteslate.vercel.app/api/quotes/random'; 

  constructor(private http: HttpClient) {}

  // Fetch a random quote from the API
  getRandomQuote(): Observable<Quote> {
    return this.http.get<Quote>(this.apiUrl);
  }
}

