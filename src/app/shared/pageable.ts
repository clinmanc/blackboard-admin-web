export class Pageable {
  size ? = 10;
  page ? = 0;
  sort?: string[] = [];
  direction ? = 'asc';
}
