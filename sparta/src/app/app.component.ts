import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { ModalService } from './modal.service';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

@Component({
  standalone: true,
  imports: [HlmButtonDirective, HlmInputDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'sparta';

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    const inputElement = document.querySelector('#phone') as HTMLInputElement;
    const registerButton = document.querySelector('#register-button') as HTMLButtonElement;

    if (inputElement) {
      intlTelInput(inputElement, {
        initialCountry: 'ru',
        separateDialCode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      });

      inputElement.addEventListener('input', this.filterInput);
    }

    if (registerButton) {
      registerButton.addEventListener('click', this.openModal);
    }
  }

  filterInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    if (input.value.length > 9) {
      input.value = input.value.slice(0, 9);
    }
  }

  togglePasswordVisibility(inputId: string) {
    const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  saveData = () => {
    const phoneInput = document.querySelector('#phone') as HTMLInputElement;
    const passwordInput = document.querySelector('#password') as HTMLInputElement;
    const repeatPasswordInput = document.querySelector('#repeat-password') as HTMLInputElement;

    if (!phoneInput.value) {
      alert('Пожалуйста, введите номер телефона');
      return;
    }

    if (!passwordInput.value) {
      alert('Пожалуйста, введите пароль');
      return;
    }

    if (passwordInput.value !== repeatPasswordInput.value) {
      alert('Пароли не совпадают');
      return;
    }
    
    localStorage.setItem('phoneNumber', phoneInput.value);
    localStorage.setItem('password', passwordInput.value);
    alert('Данные успешно сохранены');
  }

  openModal = () => {
    this.saveData(); // Сохранение данных перед открытием модального окна
    this.modalService.open();
  }
}
