const interval = require('rxjs').interval;
const take = require('rxjs/operators').take;
const map = require('rxjs/operators').map;
const mergeMap = require('rxjs/operators').mergeMap;
const constants = require('./constants');
const fetchActivityIds = require('./fetchActivityIds');
const fetchActivity = require('./fetchActivity');

const PAGE_COUNT = Math.ceil(constants.COUNT / constants.PAGE_SIZE);

const source = interval(constants.ACTIVITY_IDS_INTERVAL);
const pages = source.pipe(take(PAGE_COUNT));
const pageStarts = pages.pipe(map(x => x * constants.PAGE_SIZE));
const activityIdPages = pageStarts.pipe(mergeMap(start => fetchActivityIds(constants.PAGE_SIZE, start)));
const activityIds = activityIdPages.pipe(mergeMap(activityIdPage => activityIdPage));
const files = activityIds.pipe(mergeMap(activityId => fetchActivity(activityId, constants.OUTPUT_DIR)));
files.subscribe(console.log);
