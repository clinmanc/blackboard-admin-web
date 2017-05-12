import { NavItem } from './nav-item';

export const NAV_ITEMS: NavItem[] = [
  { name: '概览', icon: 'dashboard', url: '/dashboard' },
  {
    name: '权限管理', icon: 'security',
    children: [
      { name: '角色管理', url: '/sys/role' },
      { name: '用户管理', url: '/sys/user' },
      { name: '权限管理', url: '/sys/permission' }
    ]
  },
  {
    name: '班级管理', icon: 'school',
    children: [
      { name: '班级信息列表', url: '/classroom/info' },
      { name: '活跃班级信息', url: '/classroom/active', queryParams: { type: 'active' } },
      { name: '最近活跃班级', url: '/classroom/recent', queryParams: { type: 'recent' } }
    ]
  },
  {
    name: '用户管理', icon: 'person',
    children: [
      { name: '用户信息', url: '/user' },
      { name: '学校信息', url: '/school' },
      { name: '教师邀请反馈', url: '/invitation/record' },
      { name: '活跃用户信息', url: '/dashboard' }
    ]
  },
  {
    name: '反馈管理', icon: 'feedback',
    children: [
      { name: '反馈意见管理', url: '/classroom' },
      { name: '公告管理', url: '/classroom' },
      { name: '公告列表', url: '/dashboard' },
      { name: '发送公告', url: '/dashboard' }
    ]
  },
  {
    name: '欢迎消息管理', icon: 'message',
    children: [
      { name: '消息列表', url: '/dashboard' },
      { name: '发送消息', url: '/dashboard' }
    ]
  },
  {
    name: '培训统计', icon: 'insert_chart',
    children: [
      { name: '消息列表', url: '/dashboard' },
      { name: '邀请统计', url: '/invitation/statistics' }
    ]
  },
  {
    name: '系统管理', icon: 'settings',
    children: [
      { name: '系统用户管理', url: '/dashboard' },
      { name: 'APP版本管理', url: '/dashboard' },
      { name: 'Tips管理', url: '/dashboard' },
      { name: '服务器检测', url: '/dashboard' },
      { name: '热门成长标签管理', url: '/dashboard' }
    ]
  },
  {
    name: '数据动态', icon: 'timeline',
    children: [
      { name: '成长记录列表', url: '/dashboard' },
      { name: '消息列表', url: '/dashboard' },
      { name: '注册用户统计', url: '/dashboard' },
      { name: '用户归属地', url: '/dashboard' },
      { name: '热门成长标签管理', url: '/dashboard' }
    ]
  }
];
