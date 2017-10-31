import { buildURL } from './util';
import Moment from 'moment';

const API_BASE = 'http://beluga-prod.herokuapp.com';

const api = buildURL(API_BASE);

const events = api('/events');
// const users = api('/users');

// Pulls events from the API.
// `opts` constrains the query
// See BE docs for which params are accepted.
export async function getEvents (opts) {
    try {
        const res = await fetch(events(opts));
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

