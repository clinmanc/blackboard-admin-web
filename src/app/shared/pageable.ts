export class Pageable {
  /**
   * 第几页，从0开始，默认为第0页
   * @type {number}
   */
  page?= 0;
  /**
   * 每一页的大小，默认为10
   * @type {number}
   */
  size?= 10;
  /**
   * 排序相关的信息，以property,property(,ASC|DESC)的方式组织，例如
   * sort=firstName&sort=lastName,desc表示在按firstName正序排列基础上按lastName倒序排列。
   * @type {Array}
   */
  sort?: string[] = [];
}
