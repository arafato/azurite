'use strict';

const BaseProxy = require('./BaseProxy');

class TableCollectionProxy extends BaseProxy {
    constructor(entity) {
        super(entity);
        this.name = 'tables';
    }
}

module.exports = TableCollectionProxy;
