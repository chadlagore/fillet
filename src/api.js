import { buildURL } from './util';
import Moment from 'moment';

const API_BASE = 'http://beluga-prod.herokuapp.com';

const api = buildURL(API_BASE);

const events = api('/events');
// const users = api('/users');

// Pulls events from the API.
// `opts` constrains the query, accepts keys:
// lat, lon, start_time, end_time
export async function getEvents (opts) {
    console.log(events(opts));
    try {
        const res = await fetch(events(opts));
        const json = await res.json();
        return json.results.map(e => ({
            title: e.title,
            location: e.location,
            start: Moment(e.start_time),
            end: Moment(e.end_time)
        }));
    } catch (err) {
        /* eslint-disable no-console */
        console.log(err);
        return err;
    }
}

