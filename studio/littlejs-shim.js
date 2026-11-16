// The studio splash (copied from the Putus repo, studio/splash/; this copy of splash.js imports this file
// instead of littlejsengine) uses LittleJS only for its sounds.
// The site plays it silently, so this stands in for the two names it uses.
export class Sound { play() {} }
export const audioIsRunning = () => true; // no "tap to start": it plays as soon as it is on screen
