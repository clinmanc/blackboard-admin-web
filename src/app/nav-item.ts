export class NavItem {
  constructor(
    public name: string,
    public icon?: string,
    public url?: string,
    public children?: NavItem[]
  ) { }
}
