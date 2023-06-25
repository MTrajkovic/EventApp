import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAdmin]'
})
export class AdminDirective {
  numberOfChar: number | undefined;

  constructor(private element: ElementRef) {
  }


  @HostListener('keyup') onKeyUp() {
    this.numberOfChar = (
      this.element.nativeElement as HTMLInputElement
    ).value.length;
    console.log(this.numberOfChar);
    if (this.numberOfChar <= 10) {
      this.borderColor('orange');
} else if (this.numberOfChar > 10 && this.numberOfChar <= 30) {
  this.borderColor('yellow');
} else {
  this.borderColor('green');
}
}

private borderColor(color: string) {
  this.element.nativeElement.style.borderColor = color;
  this.element.nativeElement.style.borderStyle = 'solid';
  this.element.nativeElement.style.borderWidth = '4px';
}
}
