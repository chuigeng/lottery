'use strict';

const fieldUtil = require('field-checker');
const uuidv1 = require('uuid/v1');

const Controller = require('egg').Controller;

class KenoController extends Controller {
  
  async get() {
    const ctx = this.ctx;
    // 获取 ID
    const { kenoId } = fieldUtil.extract(ctx.params, [
      { field: 'kenoId', isRequired: true }
    ]);
    // 获取对象
    const keno = await this.service.keno.get(kenoId);
    // 返回数据
    ctx.body = {
      data: {
        keno
      }
    };
  };

  async getByCountryDrawNo() {
    const ctx = this.ctx;
    // 提取参数
    const {
      country,
      drawNo
    } = fieldUtil.extract(ctx.params, [
      { field: 'country', isRequired: true },
      { field: 'drawNo', isRequired: true },
    ]);

    // 获取对象
    const keno = await this.service.keno.getByCountryDrawNo(country, drawNo);
    // 返回数据
    ctx.body = {
      data: {
        keno
      }
    };
  }

  async search() {
    const ctx = this.ctx;
    // 参数校验
    const data = fieldUtil.extract(ctx.query, [
      'kenoId',
      'country',
      'drawNo',
      { field: 'total', type: 'number' },
      'bigSmall',
      'oddEven',
      'oddsEvens',
      'upperLower',
      'fiveElements',
      { field: 'drawAt', type: 'string' },
      { field: 'createAt', type: 'string' },
      { field: 'updateAt', type: 'string' },
      { field: 'orderBy', defaultValue: 'drawAt' },
      { field: 'order', defaultValue: 'desc' },
      { field: 'offset', type: 'number', defaultValue: 0 },
      { field: 'limit', type: 'number', defaultValue: 20 },
    ]);

    // 获取对象
    const kenos = await this.service.keno.search(data);

    // 返回
    ctx.body = {
      data: {
        kenos
      }
    };
  }

  async create() {
    const ctx = this.ctx;

    const data = fieldUtil.extract(ctx.request.body, [
      { field: 'country', isRequired: true },
      { field: 'drawNo', isRequired: true },
      { field: 'result', type: 'array', isRequired: true },
      { field: 'drawAt', type: 'number', isRequired: true },
    ]);

    if (data.result.length !== 20) {
      throw new Error('开奖号码不为 20 个');
    }

    // 数值计算规则：http://www.esball-onlinebet.com/keno8.htm
    // 总和
    data.total = 0;
    data.result.forEach(number => data.total += number);

    // 总和大小
    let middleValue = 810;
    if (data.total > middleValue) {
      data.bigSmall = 'BIG';
    } else if (data.total < middleValue) {
      data.bigSmall = 'SMALL';
    } else {
      data.bigSmall = '810';
    }

    // 总和奇偶
    if (data.total%2) {
      data.oddEven = 'ODD';
    } else {
      data.oddEven = 'EVEN';
    }

    // 奇数数值个数和偶数数值个数数量比较
    let oddCount = data.result.filter(number => number%2).length;
    let evenCount = data.result.filter(number => !(number%2)).length;
    if (oddCount > evenCount) {
      data.oddsEvens = 'ODDS';
    } else if (oddCount < evenCount) {
      data.oddsEvens = 'EVENS';
    } else {
      data.oddsEvens = 'DRAW';
    }

    // 大数数值个数和小数数值个数数量比较
    let lowerCount = data.result.filter(number => number >= 41 && number <= 80).length;
    let upperCount = data.result.filter(number => number >= 1 && number <= 40).length;
    if (upperCount > lowerCount) {
      data.upperLower = 'UPPER';
    } else if (upperCount < lowerCount) {
      data.upperLower = 'LOWER';
    } else {
      data.upperLower = 'MIDDLE';
    }

    // 五行
    if (data.total >= 210 && data.total <= 695) {
      data.fiveElements = 'METAL';
    } else if (data.total >= 696 && data.total <= 763) {
      data.fiveElements = 'WOOD';
    } else if (data.total >= 764 && data.total <= 855) {
      data.fiveElements = 'WATER';
    } else if (data.total >= 856 && data.total <= 923) {
      data.fiveElements = 'FIRE';
    } else {
      data.fiveElements = 'EARTH';
    }

    data.result = data.result.join(',');

    data.kenoId = uuidv1();
    const keno = await this.service.keno.create(data);

    ctx.body = {
      data: {
        keno
      }
    };
  }

  async update() {

  }
}

module.exports = KenoController;
