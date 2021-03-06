import { buildRequest } from './util';
import Moment from 'moment';

const API_BASE = 'https://beluga-prod.herokuapp.com';

const api = buildRequest(API_BASE);

const events = api('GET', '/events');
const authToken = api('POST', '/sessions');
const categories = api('GET', '/categories');

// This is a huge hack. We just set this whenever we get a successful
// response from getAuthToken :-)
let token = 'eyJ0eXBlIjoiYmVhcmVyIiwidmFsIjozfS4xclU2X0JoWFlLbXcwc3NCM3N5dTVMRWpCT28=';

// Pulls events from the API.
// `opts` constrains the query
// See BE docs for which params are accepted.
export async function getEvents (opts) {
    try {
        const args = events(opts, null, {}, token);
        const res = await fetch(...args);
        const json = await res.json();
        console.log("Collected " + json.results.length + " events");
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
        const resJson = await res.json();
        if (resJson.token) {
            token = resJson.token;
        }
        return resJson.token;
    }
    catch (err) {
        throw err;
    }
}

export async function getCategories () {
    try {
        const res = await fetch(...categories());
        const json = await res.json();
        console.log(json.results);
        return json.results;
    }
    catch (err) {
        throw err;
    }
}
