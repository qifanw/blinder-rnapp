export default class Config {
  constructor(config) {
    this.config = {...config};
  }

  /**
   * 获取配置中key对应的value，返回this的
   */
  getConfig(key) {
    if (!key) {
      throw new Error('缺少参数key');
    }
  
    return this.config[key];
  }
}