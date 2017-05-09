import { NavItem } from "./nav-item";

export const NAV_ITEMS: NavItem[] = [
  new NavItem('概览', 'dashboard', '/dashboard'),
  new NavItem('权限管理', 'security', null,
    [
      new NavItem('角色管理', null, '/sys/role'),
      new NavItem('用户管理', null, '/sys/user'),
      new NavItem('权限管理', null, '/sys/permission')
    ]),
  new NavItem('班级管理', 'school', null,
    [
      new NavItem('班级信息列表', null, '/dashboard'),
      new NavItem('活跃班级信息', null, '/dashboard'),
      new NavItem('最近活跃班级', null, '/dashboard')
    ]),
  new NavItem('用户管理', 'person', null,
    [
      new NavItem('用户信息', null, '/dashboard'),
      new NavItem('学校信息', null, '/dashboard'),
      new NavItem('教师邀请反馈', null, '/dashboard'),
      new NavItem('活跃用户信息', null, '/dashboard')
    ]),
  new NavItem('反馈管理', 'feedback', null,
    [
      new NavItem('反馈意见管理', null, '/dashboard'),
      new NavItem('公告管理', null, '/dashboard'),
      new NavItem('公告列表', null, '/dashboard'),
      new NavItem('发送公告', null, '/dashboard')
    ]),
  new NavItem('欢迎消息管理', 'message', null,
    [
      new NavItem('消息列表', null, '/dashboard'),
      new NavItem('发送消息', null, '/dashboard')
    ]),
  new NavItem('培训统计', 'insert_chart', null,
    [
      new NavItem('班级关联', null, '/dashboard'),
      new NavItem('邀请统计', null, '/invitation_statistics')
    ]),
  new NavItem('系统管理', 'settings', null,
    [
      new NavItem('系统用户管理', null, '/dashboard'),
      new NavItem('APP版本管理', null, '/dashboard'),
      new NavItem('Tips管理', null, '/dashboard'),
      new NavItem('服务器检测', null, '/dashboard'),
      new NavItem('热门成长标签管理', null, '/dashboard')
    ]),
  new NavItem('数据动态', 'timeline', null,
    [
      new NavItem('成长记录列表', null, '/dashboard'),
      new NavItem('消息列表', null, '/dashboard'),
      new NavItem('注册用户统计', null, '/dashboard'),
      new NavItem('用户归属地', null, '/dashboard')
    ])
];
