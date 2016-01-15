// package metadata file for Meteor.js
'use strict';

var packageName = 'driftyco:ionicons';
var version = JSON.parse(Npm.require("fs").readFileSync('component.json')).version;

Package.describe({
    name: packageName,
    summary: 'ionicons (official): The premium icon font for Ionic',
    version: version,
    git: 'https://github.com/driftyco/ionicons.git'
});

Package.onUse(function (api) {
    api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
    api.addFiles([
        'fonts/ionicons.eot',
        'fonts/ionicons.svg',
        'fonts/ionicons.ttf',
        'fonts/ionicons.woff',
        'css/ionicons.css'
    ], 'client');
});
