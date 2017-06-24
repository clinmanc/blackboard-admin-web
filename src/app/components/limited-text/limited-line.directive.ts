import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLimitedLine]'
})
export class LimitedLineDirective implements OnInit {
  @HostBinding('style.max-width')
  _maxWidth: string;
  active = false;

  @HostListener('click')
  onClick(event) {
    this.active = !this.active;
    if (this.active) {
      this.el.nativeElement.style.whiteSpace = 'normal';
    } else {
      this.el.nativeElement.style.whiteSpace = 'nowrap';
    }
  }

  @Input()
  set maxWidth(maxWidth: string) {
    this._maxWidth = maxWidth + 'px';
  }

  get maxWidth(): string { return this._maxWidth; }

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.overflow = 'hidden';
    this.el.nativeElement.style.textOverflow = 'ellipsis';
    this.el.nativeElement.style.whiteSpace = 'nowrap';
  }

  ngOnInit() { }
}
