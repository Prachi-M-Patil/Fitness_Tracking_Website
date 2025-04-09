import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverhighlight]',
  standalone: false
})
export class HoverhighlightDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transform = 'scale(1.05)';
    this.el.nativeElement.style.boxShadow = '0px 15px 25px rgba(0, 0, 0, 0.2)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
    this.el.nativeElement.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)';
  }

}
