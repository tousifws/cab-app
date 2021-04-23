'use strict';
import mapKeysDeep from 'map-keys-deep';
import { snakeCase, camelCase } from 'lodash';
import { redisCache } from 'utils/cacheConstants';
import '@babel/register';
import Hapi from '@hapi/hapi';
import path from 'path';
import wurst from 'wurst';

export const init = async () => {
    try {
        const server = Hapi.server({
            port: 8000,
            host: 'localhost',
            cache: [redisCache]
        });
        await server.register({
            plugin: wurst,
            options: {
                routes: '**/routes.js',
                cwd: path.join(__dirname, 'routes'),
                log: true
            }
        });
        const onPreHandler = (request, h) => {
            const requestQueryParams = request.query;
            const requestPayload = request.payload;
            request.query = mapKeysDeep(requestQueryParams, keys =>
                camelCase(keys)
            );
            request.payload = mapKeysDeep(requestPayload, keys =>
                camelCase(keys)
            );
            return h.continue;
        };

        const onPreResponse = (request, h) => {
            const response = request.response;
            const responseSource = response.source;
            response.source = mapKeysDeep(responseSource, keys =>
                snakeCase(keys)
            );
            return h.continue;
        };

        server.ext('onPreHandler', onPreHandler);
        server.ext('onPreResponse', onPreResponse);
        return server;
    } catch (error) {
        console.log(error);
    }
};

export default init;
