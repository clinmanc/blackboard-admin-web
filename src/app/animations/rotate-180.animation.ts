import { animate, state, style, transition, trigger } from "@angular/animations";

export const rotate180Animation = trigger('rotate180Animation', [
  state('expanded', style({ transform: 'rotate(180deg)' })),
  state('collapsed', style({ transform: 'rotate(0)' })),
  transition('* => *', animate('.5s cubic-bezier(.25, .8, .25, 1)'))
]);

