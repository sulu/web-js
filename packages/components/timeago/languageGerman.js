'use strict';

var timeagoJS = require('timeago.js');

/**
 * Registers german locale for timeago component
 */
module.exports = function LanguageGerman() {
    var locale = function(number, index) {
        return [
            ['gerade eben', 'genau jetzt'],
            ['vor %s Sekunden', 'in %s Sekunden'],
            ['vor einer Minute', 'in einer Minute'],
            ['vor %s Minuten', 'in %s Minuten'],
            ['vor einer Stunde', 'in einer Stunde'],
            ['vor %s Stunden', 'in %s Stunden'],
            ['vor einem Tag', 'in einem Tag'],
            ['vor %s Tagen', 'in %s Tagen'],
            ['vor einer Woche', 'in einer Woche'],
            ['vor %s Wochen', 'in %s Wochen'],
            ['vor einem Monat', 'in einem Monat'],
            ['vor %s Monaten', 'in %s Monaten'],
            ['vor einem Jahr', 'in einem Jahr'],
            ['vor %s Jahren', 'in %s Jahren'],
        ][index];
    };

    timeagoJS.register('de', locale);
};
