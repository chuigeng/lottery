const Service = require('egg').Service;

class KenoService extends Service {

  constructor(ctx) {
    super(ctx);

    this.mysql = this.app.mysql;
    this.tableName = 'keno';
  }

  async get(kenoId) {
    return await this.mysql.get(this.tableName, { kenoId });
  }

  async getByCountryDrawNo(country, drawNo) {
    return await this.mysql.get(this.tableName, {country, drawNo});
  }

  async search(data) {

    let opstions = {
      equal: [
        'kenoId',
        'country',
        'drawNo',
        'total',
        'bigSmall',
        'oddEven',
        'oddsEvens',
        'upperLower',
        'fiveElements',
      ],
      between: [
        'drawAt',
        'createAt',
        'updateAt',
      ],
      order: {
        orderBy: 'drawAt',
        order: 'desc',
      },
      limit: {
        offset: 0,
        limit: 20
      }
    };

    data = Object.assign({}, opstions.order, opstions.limit, data);

    // 拼接查询参数
    let values = [];
    let wheres = [];

    for (let equalField of opstions.equal) {
      if (data[equalField] !== null && data[equalField] !== undefined) {
        wheres.push(`${equalField} = ?`);
        values.push(data[equalField]);
      }
    }
    for (let betweenField of opstions.between) {
      if (data[betweenField] !== null && data[betweenField] !== undefined) {
        const [start, end] = data[betweenField].split(',');
        if (start) {
          wheres.push(`${betweenField} > ?`);
          values.push(start);
        }
        if (end) {
          wheres.push(`${betweenField} < ?`);
          values.push(end);
        }
      }
    }
    wheres.push('0 = 0');

    let sql = `SELECT * FROM ${this.tableName} WHERE ${wheres.join(' AND ')} ORDER BY ${data.orderBy} ${data.order} LIMIT ${data.offset}, ${data.limit}`;



    return await this.mysql.query(sql, values);
  }

  async create(keno) {
    keno.createAt = Date.now();
    keno.updateAt = Date.now();
    await this.mysql.insert(this.tableName, keno);
    return await this.get(keno.kenoId);
  }

  async update(keno) {
    keno.updateAt = Date.now();
    await this.mysql.update(this.tableName, keno, { kenoId: keno.kenoId });
    return await this.get(keno.kenoId);
  }
}

module.exports = KenoService;
