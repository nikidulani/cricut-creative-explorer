import { Component } from '@angular/core';
import { QuotesComponent } from './components/quotes/quotes.component';
import { CommonModule } from '@angular/common';

// Root component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuotesComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}
