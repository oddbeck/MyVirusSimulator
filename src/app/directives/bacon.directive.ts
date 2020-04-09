import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appBacon]'
})
export class BaconDirective implements OnInit{

  renderer2;
  element;

  constructor( elem: ElementRef,  renderer: Renderer2) {
    this.renderer2 = renderer;
    this.element = elem;
  }

  ngOnInit(): void {
    let bacon = this.renderer2.createText('🥓🥓🥓 ');
    let div = this.renderer2.createElement('div');
    this.renderer2.appendChild(div, bacon);
    this.renderer2.appendChild(this.element.nativeElement, div);
  }
}
