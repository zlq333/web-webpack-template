// 配置文件
import publicKey from './publicKey';
const NODE_ENV = process.env.NODE_ENV;
console.log('this node_env is ' + NODE_ENV);

const VUE_APP_BUILDENV = process.env.VUE_APP_BUILDENV;
console.log('this vite_build_env is ' + VUE_APP_BUILDENV);

const VUE_APP_SYSTEM_NAME = process.env.VUE_APP_SYSTEM_NAME; // 项目名称
const systemLayout = 'TB'; // 布局类型:none无layout  LR左右布局 TB上下布局

const config = {
  // 内网配置
  dev: {
    publicKey: publicKey.dev,
    // baseURL: 'http://192.168.12.15:9194',
    baseURL: 'http://192.168.6.12:9199',
    uploadURL: 'http://192.168.6.40:8155',
    env: 'dev',
    system: {
      permission: true, // 是否校验权限
      tab: true, // 是否启用tab
      keepAlive: true, // 是否启用页面缓存
      name: VUE_APP_SYSTEM_NAME, // 项目名称
      layoutType: systemLayout
    }
  },
  // 测试配置
  test: {
    publicKey: publicKey.test,
    baseURL: 'http://192.168.6.12:9199',
    uploadURL: 'http://192.168.6.40:8155',
    env: 'test',
    system: {
      permission: true, // 是否校验权限
      tab: true, // 是否启用tab
      keepAlive: true, // 是否启用页面缓存
      name: VUE_APP_SYSTEM_NAME,
      layoutType: systemLayout
    }
  },
  // 生产配置
  prod: {
    publicKey: publicKey.dev,
    baseURL: 'http://192.168.6.12:9199',
    uploadURL: 'http://192.168.6.40:8155',
    env: 'prod',
    system: {
      permission: true, // 是否校验权限
      tab: true, // 是否启用tab
      keepAlive: true, // 是否启用页面缓存
      name: VUE_APP_SYSTEM_NAME,
      layoutType: systemLayout
    }
  }
};

// 根据环境变量 导出对应配置
let envConfig: Config;
if (NODE_ENV === 'development' || VUE_APP_BUILDENV === 'dev') {
  /**
   * debug_server -> 调试服务器
   * 在开发模式下 为方便调试  开发者可自行修改debug_server 用本地项目连接不同的目标服务器
   * debug_server：dev  开发服务器(默认)
   * debug_server：test 测试服务器
   * debug_server：prod 生产服务器
   */

  let envkey = localStorage.getItem('debug_server') || 'dev';
  if (envkey != 'dev' && envkey != 'test' && envkey != 'prod') envkey = 'dev';

  envConfig = config[envkey];

  if (envkey === 'dev') {
    // 本机开发模式默认连接内网服务器
    // 若本地localStorage存在dev_host 则覆盖默认目标
    const dev_host = localStorage.getItem('dev_host') || '';

    if (dev_host) envConfig.baseURL = dev_host;
  }
} else {
  envConfig = config[VUE_APP_BUILDENV as string];
}

export default envConfig;
