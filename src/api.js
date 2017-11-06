import { buildRequest } from './util';
import Moment from 'moment';

const API_BASE = 'https://beluga-prod.herokuapp.com';

const api = buildRequest(API_BASE);

const events = api('GET', '/events');
const authToken = api('POST', '/sessions');

// Pulls events from the API.
// `opts` constrains the query
// See BE docs for which params are accepted.
export async function getEvents (opts) {
    try {
        const res = await fetch(...events(opts, null, token));
        const json = await res.json();
        return json.results.map(e => ({
            title: e.title,
            location: e.location,
            distance: e.distance,
            start: Moment(e.start_time),
            end: Moment(e.end_time),
            description: {
                text: e.description_text,
                html: e.description_html
            }
        }));
    } catch (err) {
        /* eslint-disable no-console */
        console.log(err);
        throw err;
    }
}

/*
 * Retrieve an auth token from the backend.
 * This token is good for making other backend requests.
 * `opts` is sent as a JSON payload in the request.
 */
export async function getAuthToken (opts) {
    try {
        const res = await fetch(...authToken(null, opts));
        const res_json = await res.json();
        return res_json.token;
    }
    catch (err) {
        throw err;
    }
}
