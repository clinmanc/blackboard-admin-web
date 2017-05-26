import { animate, state, style, transition, trigger } from '@angular/animations';

export const scaleAnimation = trigger('scaleAnimation', [
  state('in', style({ transform: 'scale(1, 1)', opacity: 1 })),
  transition('void => *', [
    style({ transform: 'scale(1, 1)', opacity: 1 }),
    animate('0.3s 0.1s ease', style({
      transform: 'scale(0, 0)', opacity: 0
    }))
  ]),
  transition('* => void', [
    style({ transform: 'scale(1, 1)', opacity: 1 }),
    animate('0.3s 0.1s ease', style({
      transform: 'scale(0, 0)', opacity: 0
    }))
  ])
]);
