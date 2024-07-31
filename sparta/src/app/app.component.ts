import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import intlTelInputModule from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

@Component({
  standalone: true,
  imports: [HlmButtonDirective, HlmInputDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
ngOnInit(): void {
  const inputElement = document.querySelector('#phone') as HTMLInputElement;
  if (inputElement) {
    intlTelInputModule(inputElement, {
      initialCountry: 'ru',
      separateDialCode: true,
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
    });
  }
}
  title = 'sparta';
}
