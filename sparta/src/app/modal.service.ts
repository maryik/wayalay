// src/app/modal.service.ts
import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModelVerificationComponent } from './model-verification/model-verification.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  open() {
    if (this.overlayRef) {
      return;
    }

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    const modalPortal = new ComponentPortal(ModelVerificationComponent);
    overlayRef.attach(modalPortal);

    overlayRef.backdropClick().subscribe(() => this.close());

    this.overlayRef = overlayRef;
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
