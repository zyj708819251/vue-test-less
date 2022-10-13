/**
 * 服务器相关配置
 */
const SERVER_CONFIG = {
    dev: {
        id: 'dev',
        name: '测试环境',
        host: '10.17.74.243',
        port: 80,
        username: 'Administrator',
        password: 'Huawei12#$',
        path: 'd:/server/test/dist',
    },
    prod: {
        id: 'prod',
        name: '开发环境',
       host: '10.17.74.213',
       port: 80,
        username: 'root',
        password: 'user*****',
        path: '/root/user/test/prod/',
    }
};
module.exports = SERVER_CONFIG;