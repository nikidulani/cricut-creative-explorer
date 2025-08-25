import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quote {
  q: string; // the quote text
  a: string; // the author
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private apiUrl = 'https://zenquotes.io/api/random'; // Free motivational quotes API

  constructor(private http: HttpClient) {}

  getRandomQuote(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl);
  }
}
