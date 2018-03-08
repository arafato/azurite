'use strict';

const AzuriteTableResponse = require('./../../model/table/AzuriteTableResponse'),
    tableStorageManager = require('./../../core/table/TableStorageManager'),
    N = require('./../../core/HttpHeaderNames');

class QueryTables {
    constructor() {
    }

    process(request, res) {
        tableStorageManager.queryTables(request)
            .then((response) => {
                res.set(request.httpProps);
                if (request.httpProps[N.PREFER] === 'return-no-content') {
                    response.addHttpProperty(N.PREFERENCE_APPLIED, 'return-no-content');
                    res.status(204).send();
                    return;
                }
                response.addHttpProperty(N.PREFERENCE_APPLIED, 'return-content');
                res.status(200).send(response.proxy.odata(request.accept));
            });
    }
}

module.exports = new QueryTables;
