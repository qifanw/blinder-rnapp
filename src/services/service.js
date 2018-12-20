import HttpClient from '@jhjr/fetch-http-client';
import HttpService from '@jhjr/http-service';
import URI from 'urijs'

import { ENV, httpUrl, appKey, appSecret } from '../communication/constants'

import MineService from './mine'

global.fetch = fetch;


const Service = HttpService.$initService(HttpClient, httpUrl, null, appKey, appSecret);

// Service.$setLogger(logger);


Service._mineService = new MineService(Service.client)
Service.$getMineService = function() {
    return this._mineService
}

export const service = Service;
