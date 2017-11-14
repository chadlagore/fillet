import Moment from 'moment';

export default {
    title: 'Steve\'s BBQ',
    location: {
        lat: 49.2827,
        lon: -123.1207
    },
    distance: 10,
    description: {
        text: `
        I got 10,000 steaks in an Air Miles scam gone wrong so 
        I'm sharing them with all you wonderful people.
        Don't worry about bringing salad, it's going to be great.
        My wife made a potato salad for veggies. We'll be starting
        around 4PM, just give me a shout if you can't make it.
        Cheers
        - Steve`,
        html: `
        <p>I got 10,000 steaks in an Air Miles scam gone wrong so 
        I'm sharing them with all you wonderful people.
        Don't worry about bringing salad, it's going to be great.
        My wife made a potato salad for veggies. We'll be starting
        around 4PM, just give me a shout if you can't make it.
        Cheers<\p>
        <br />
        - Steve`
    },
    venue: 'Steve\'s House',
    start: Moment(),
    end: Moment().add(2, 'hours')
};
