import { NavItem } from './nav-item';

export const NAV_ITEMS: NavItem[] = [
    { name: '概览', icon: 'dashboard', url: '/dashboard', roles: ['ROLE_ADMIN'] },
    {
        name: '班级管理', icon: 'school', roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
        children: [
            { name: '班级信息', url: '/classroom' },
        ]
    },
    {
        name: '用户管理', icon: 'person', roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
        children: [
            { name: '用户信息', url: '/user' },
            { name: '学校信息', url: '/school' }
        ]
    },
    {
        name: '反馈管理', icon: 'feedback', roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
        children: [
            { name: '反馈意见管理', url: '/feedback' }
        ]
    },
    {
        name: '消息管理', icon: 'notifications', roles: ['ROLE_ADMIN'],
        children: [
            { name: '欢迎消息', url: '/message/welcome' },
            { name: '公告消息', url: '/message/announcement' }
        ]
    },
    {
        name: '培训统计', icon: 'insert_chart', roles: ['ROLE_ADMIN', 'ROLE_TRAINER', 'ROLE_OPERATOR', 'ROLE_SUPERTRAINER'],
        children: [
            { name: '班级关联', url: '/classroom/associated' },
            { name: '邀请统计', url: '/invitation/statistics' },
            { name: '教师邀请反馈', url: '/invitation/record' },
            { name: '邀请码负责人', url: '/promotersInfo' }
        ]
    },
    {
        name: '权限管理', icon: 'security', roles: ['ROLE_ADMIN'],
        children: [
            { name: '用户管理', url: '/sys/user' },
            { name: '角色管理', url: '/sys/role' },
            { name: '权限管理', url: '/sys/permission' }
        ]
    },
    {
        name: '系统管理', icon: 'settings', roles: ['ROLE_ADMIN'],
        children: [
            { name: '批量任务', url: '/sys/batch' },
            { name: 'APP版本管理', url: '/blackboard/version' },
            { name: 'Tips管理', url: '/tip' },
            { name: '服务器检测', url: '/server/detection' },
            { name: '热门成长标签管理', url: '/growth/tag' }
        ]
    },
    {
        name: '数据动态', icon: 'timeline', roles: ['ROLE_ADMIN', 'ROLE_OPERATOR'],
        children: [
            { name: '成长记录列表', url: '/growth/record' },
            { name: '消息列表', url: '/message/common' },
            { name: '注册用户统计', url: '/user/registered_statistics' },
            { name: '用户归属地', url: '/user/location_statistics' },
            { name: '数据导出', url: '/export' }
        ]
    }
];
