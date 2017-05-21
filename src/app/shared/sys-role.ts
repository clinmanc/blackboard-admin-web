import { SysPermission } from './sys-permission';

export class SysRole {
  roleId: string;
  name: string;
  code: string;
  permissions: SysPermission[] = [];
}
