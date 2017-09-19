importScripts('workbox-sw.prod.v2.0.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "assets/icon/favicon.ico",
    "revision": "7aa40cf9dba1fd293fc8bd890106acce"
  },
  {
    "url": "build/docssite.js",
    "revision": "d794e6a83ac34908f56810310244ea5a"
  },
  {
    "url": "build/docssite.registry.json",
    "revision": "7dbfe23e8ad014ed68ee82173ce65f8d"
  },
  {
    "url": "build/docssite/docssite.e26hcszc.pf.js",
    "revision": "bedae075ced0f95086a839c9a86d019a"
  },
  {
    "url": "build/docssite/docssite.ypzmzpql.js",
    "revision": "279da5e7fc84d233c5c51a86cf93b127"
  },
  {
    "url": "build/docssite/oeqibtl5.css",
    "revision": "66591f2b35f95ab0aa69523ab9a72281"
  },
  {
    "url": "build/docssite/uabply83.js",
    "revision": "a2068d23ef1e39c6af82fbb38eacfd89"
  },
  {
    "url": "cheatsheet.html",
    "revision": "a6c4cbf944eda6a03a326167bdc2c7f9"
  },
  {
    "url": "icon-comparison.html",
    "revision": "8a270930bf610473e48bed0d00f0766e"
  },
  {
    "url": "index.html",
    "revision": "3d61dd22a9eae97a13285cead1009cbb"
  },
  {
    "url": "mode-cheatsheet.html",
    "revision": "f5bc10012725f26fffa3c49f7877fbc0"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
