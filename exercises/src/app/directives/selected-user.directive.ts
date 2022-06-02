import { Directive, Input,HostBinding, HostListener,OnInit } from '@angular/core';

@Directive({
  selector: '[appSelectedUser]'
})
export class SelectedUserDirective implements OnInit {
  @Input() defaultColor: string = 'black';
  @Input() highlightColor: string = 'dodgerblue';
  @HostBinding('style.color') backgroundColor: string;

  constructor() { }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }

}
