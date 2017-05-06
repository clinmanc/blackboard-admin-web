export class Page<T> extends Array{
  content: T[] = [];
  first: boolean = true;
  last: boolean = true;
  number: number = 0;
  numberOfElements: number = 0;
  size: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
}
