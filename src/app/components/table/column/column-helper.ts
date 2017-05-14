import { TableColumnDirective } from './table-column.directive';
/**
 * Translates templates definitions to objects
 *
 * @export
 * @param {TableColumnDirective[]} templates
 * @returns {any[]}
 */
export function translateTemplates(templates: TableColumnDirective[]): any[] {
  const result: any[] = [];

  for (const temp of templates) {
    const col: any = {};

    const props = Object.getOwnPropertyNames(temp);
    for (const prop of props) {
      col[prop] = temp[prop];
    }

    if (temp.headerTemplate) {
      col.headerTemplate = temp.headerTemplate;
    }

    if (temp.cellTemplate) {
      col.cellTemplate = temp.cellTemplate;
    }

    result.push(col);
  }

  return result;
}
