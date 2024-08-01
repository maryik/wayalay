// src/app/model-verification/model-verification.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-verification',
  templateUrl: './model-verification.component.html',
  styleUrls: ['./model-verification.component.css']
})
export class ModelVerificationComponent implements OnInit {
  phoneNumber: string | null = null;
  formattedPhoneNumber: string = '';
  countdown: number = 60; // 1 минута
  countdownText: string = '01:00';

  ngOnInit(): void {
    this.phoneNumber = localStorage.getItem('phoneNumber');
    if (this.phoneNumber) {
      this.formattedPhoneNumber = this.formatPhoneNumber(this.phoneNumber);
    }
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.countdownText = 'Отправить код повторно';
      } else {
        this.countdown--;
        const minutes = Math.floor(this.countdown / 60);
        const seconds = this.countdown % 60;
        this.countdownText = `${this.pad(minutes)}:${this.pad(seconds)}`;
      }
    }, 1000);
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  formatPhoneNumber(phoneNumber: string): string {
    const firstFourDigits = phoneNumber.slice(0, 2); // первые четыре цифры
    const lastTwoDigits = phoneNumber.slice(-2); // последние 2 цифры
    const stars = '*'.repeat(phoneNumber.length - 6); // количество звездочек между цифрами
    return `${firstFourDigits}${stars}${lastTwoDigits}`;
  }
}
