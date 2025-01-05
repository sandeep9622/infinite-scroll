import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.sass'
})
export class LoaderComponent {
// Variables to control color widths dynamically
blueWidth = 25;
greenWidth = 25;
yellowWidth = 25;
redWidth = 25;
@Input()
isLoading:boolean = false;

// Spinner background style using dynamic values
spinnerBackground = '';

ngOnInit(): void {
  this.updateSpinner();
}

updateSpinner() {
  this.spinnerBackground = `conic-gradient(
    #4285F4 0% 25%,        /* Blue: First quarter */
    #34A853 25% 50%,       /* Green: Second quarter */
    #FBBC05 50% 75%,       /* Yellow: Third quarter */
    #EA4335 75% 100%       /* Red: Fourth quarter */
  )`;
}
}
