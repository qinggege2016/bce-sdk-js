/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

var util = require('util');

var u = require('underscore');

var config = require('./config');

/**
 * @constructor
 * @param {Object} client_config The bce client configuration.
 * @param {string} service_id The service id.
 * @param {boolean} opt_region_supported The service supported region or not.
 */
function BceBaseClient(client_config, service_id, opt_region_supported) {
    this.config = u.extend({}, config.DEFAULT_CONFIG, client_config);
    this.service_id = service_id;
    this.region_supported = !!opt_region_supported;

    this.config.endpoint = this._computeEndpoint();
}

/**
 * @return {string} The bce client endpoint.
 */
BceBaseClient.prototype._computeEndpoint = function () {
    if (this.config.endpoint) {
        return this.config.endpoint;
    }

    if (this.region_supported) {
        return util.format('%s://%s.%s.%s',
            this.config.protocol,
            this.service_id,
            this.config.region,
            config.DEFAULT_SERVICE_DOMAIN);
    }
    return util.format('%s://%s.%s',
        this.config.protocol,
        this.service_id,
        config.DEFAULT_SERVICE_DOMAIN);
};


module.exports = BceBaseClient;









/* vim: set ts=4 sw=4 sts=4 tw=120: */