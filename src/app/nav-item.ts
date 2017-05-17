export class NavItem {
  name: string;
  icon?: string;
  url?: string;
  roles?: string[] = [];
  queryParams?: any;
  children?: NavItem[];
}
