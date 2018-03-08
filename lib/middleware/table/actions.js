'use strict';

const BbPromise = require('bluebird'),
    Operations = require('./../../core/Constants').Operations.Table,
    queryTables = require('./../../actions/table/QueryTables'),
    insertEntity = require('./../../actions/table/InsertEntity'),
    deleteTable = require('./../../actions/table/DeleteTable'),
    deleteEntity = require('./../../actions/table/DeleteEntity'),
    createTable = require('./../../actions/table/CreateTable');

module.exports = (req, res) => {
    BbPromise.try(() => {
        actions[req.azuriteOperation](req.azuriteRequest, res);
    }).catch((e) => {
        res.status(e.statusCode || 500).send(e.message);
        if (!e.statusCode) throw e;
    });
}

const actions = {};

actions[undefined] = (request, res) => {
    res.status(501).send('Not Implemented yet.');
}

actions[Operations.QUERY_TABLES] = (request, res) =>{
    queryTables.process(request, res);
}

actions[Operations.CREATE_TABLE] = (request, res) => {
    createTable.process(request, res);
}

actions[Operations.INSERT_ENTITY] = (request, res) => {
    insertEntity.process(request, res);
}

actions[Operations.DELETE_TABLE] = (request, res) => {
    deleteTable.process(request, res);
}

actions[Operations.DELETE_ENTITY] = (request, res) => {
    deleteEntity.process(request, res);
}