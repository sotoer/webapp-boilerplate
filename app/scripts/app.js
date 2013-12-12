/*global define */
define([
	'marionette'
], function (
	Marionette
) {
    
    'use strict';

    var SiteManager;

    // Application
    SiteManager = new Marionette.Application();

    SiteManager.views = {};

    // Start App
	SiteManager.start({/*options*/});

    return '\'Allo \'Allo!';
});