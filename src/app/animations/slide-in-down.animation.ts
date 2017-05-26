import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideInDownAnimation = trigger('routeAnimation', [
  state('*',
    style({
      opacity: 1
    })
  ),
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('0.2s ease-in')
  ]),
  transition(':leave', [
    animate('0.5s ease-out', style({
      opacity: 0
    }))
  ])
]);
