import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  standalone: true,
  imports: [HlmButtonDirective],
  selector: 'app-root',
  template: `<button hlmBtn class="custom-button">hello from {{ title }}</button>`,
  styles: [`
    .custom-button {
      background-color: blue;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
    }
  `]
})
export class AppComponent {
  title = 'sparta';
}
