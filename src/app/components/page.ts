export class Page<T> extends Array {
  content: T[] = [];
  first = true;
  last = true;
  number = 0;
  numberOfElements = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;
}
