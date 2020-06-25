## [5.1.2](https://github.com/ionic-team/ionicons/compare/v5.1.1...v5.1.2) (2020-06-25)


### Bug Fixes

* **types:** temporary fix for projects using older typescript versions ([3aed6ee](https://github.com/ionic-team/ionicons/commit/3aed6eee317a5de367416e7529028a650e2617d3))



## [5.1.1](https://github.com/ionic-team/ionicons/compare/v5.1.0...v5.1.1) (2020-06-25)


### Bug Fixes

* **types:** add "type" to type exports so it's not added to the transpiled js file ([3a2ab6e](https://github.com/ionic-team/ionicons/commit/3a2ab6ec277234e49adfe7ed35ce1fb9d5fe7133))



# [5.1.0](https://github.com/ionic-team/ionicons/compare/5.0.0...5.1.0) (2020-06-23)


### Features

* add behance ([14fd26b](https://github.com/ionic-team/ionicons/commit/14fd26b38f7d4c4628f75fa65bc3247abb152ab8))
* add docker ([91fa34e](https://github.com/ionic-team/ionicons/commit/91fa34ebc7b21eb013b19499ce5b73a1b67b4542))
* add gitlab ([fa8d76e](https://github.com/ionic-team/ionicons/commit/fa8d76e20c3bbc138a5976edb0465aa8da34a5f3))
* add medium ([8983749](https://github.com/ionic-team/ionicons/commit/89837496004a1102156a4554cfff66623c5c98f2))
* add paypal ([1b07d10](https://github.com/ionic-team/ionicons/commit/1b07d10212b602b532e887409623370b4df9b96d))
* add soundcloud ([7ce073d](https://github.com/ionic-team/ionicons/commit/7ce073d3fe4e3ec10cd28cac15de63215433100e))
* add tiktok ([73526e4](https://github.com/ionic-team/ionicons/commit/73526e40b8095d692679405ecb39500f9bf5d343))
* add venmo ([922f433](https://github.com/ionic-team/ionicons/commit/922f43387be72c69780f29eb95081c77c91b2c5b))
* update edge ([f61e47c](https://github.com/ionic-team/ionicons/commit/f61e47c698f10e31ee804984b64c4166284a441f))
* update facebook ([2e7fe14](https://github.com/ionic-team/ionicons/commit/2e7fe1431528c053621515e8f8d57eb8194b0c5b))
* update firebase ([63c9ee0](https://github.com/ionic-team/ionicons/commit/63c9ee02a51bb6a2e2528c05a427cfb85e7c27be))



## [5.0.1](https://github.com/ionic-team/ionicons/compare/v5.0.0...v5.0.1) (2020-03-05)


### Bug Fixes

* fixes for ssr support ([51a431e](https://github.com/ionic-team/ionicons/commit/51a431e6adc8f1f60902350ee07e76303dc72d3f))



# [5.0.0](https://github.com/ionic-team/ionicons/releases) (2020-02-06)

It's here! Please enjoy 🎈

### What's new
* Top to bottom re-draw of every icon to better match the latest iOS and Material platform styles.
* Plenty of additions to help you get icons you need for your project.
* Instead of platform specific variants for each icon we are providing appearance variants (filled, outline, and sharp) for each icon.
  * Using appearance variants:
  ```html
  <ion-icon name="heart"></ion-icon> <!--filled variant-->
  <ion-icon name="heart-outline"></ion-icon> <!--outline variant-->
  <ion-icon name="heart-sharp"></ion-icon> <!--sharp variant-->
  ```
  * There will no longer be auto-switching for platform specificity when using Ionicons in an Ionic Framework app. If you'd like to switch icon styles based on the platform in Ionic use the `md` and `ios` attributes and provide the platform specific icon/variant name.
  ```html
  <ion-icon ios="heart-outline" md="heart-sharp"></ion-icon>
  ```
* Adjust the stroke weight via CSS for icons that use the outline variant.

### BREAKING CHANGES
The table below outlines icons that were removed or renamed.

| Icon Name                    |             | Status      | Notes                                                                 |
| -----------------------------| ------------| ------------| ----------------------------------------------------------------------|
| add-circle            	     | :x:         | deleted     | re-added as "circled" icon                                            |
| alert                  	     | :pencil2:   | renamed     | renamed to "alert-circle"                                            |
| appstore                     | :x:         | deleted     | added as google play & apple app store logos                          |
| arrow-dropdown-circle        | :pencil2:   | renamed     | `md` version added as "caret-down-circle", `ios` version added as "chevron-down-circle"         |
| arrow-dropdown               | :pencil2:   | renamed     | `md` version added as "caret-down", `ios` version added as "chevron-down-circle-outline"        |
| arrow-dropleft-circle        | :pencil2:   | renamed     | `md` version added as "caret-back-circle", `ios` version added as "chevron-back-circle"         |
| arrow-dropleft               | :pencil2:   | renamed     | `md` version added as "caret-back", `ios` version added as "chevron-back-circle-outline"        |
| arrow-dropright-circle       | :pencil2:   | renamed     | `md` version added as "caret-forward-circle", `ios` version added as "chevron-forward-circle"   |
| arrow-dropright              | :pencil2:   | renamed     | `md` version added as "caret-forward", `ios` version added as "chevron-forward-circle-outline"  |
| arrow-dropup-circle          | :pencil2:   | renamed     | `md` version added as "caret-up-circle", `ios` version added as "chevron-up-circle"             |
| arrow-dropup                 | :pencil2:   | renamed     | `md` version added as "caret-up", `ios` version added as "chevron-up-circle-outline"            |
| arrow-round-back             | :x:         | deleted     | becomes "arrow-back"                                                  |
| arrow-round-down             | :x:         | deleted     | becomes "arrow-down"                                                  |
| arrow-round-forward          | :x:         | deleted     | becomes "arrow-forward"                                               |
| arrow-round-up               | :x:         | deleted     | becomes "arrow-up"                                                    |
| at                           | :pencil2:   | renamed     | becomes "at-circle"                                                   |
| bowtie                       | :x:         | deleted     |                                                                       |
| chatboxes                    | :pencil2:   | renamed     | renamed to "chatbox"                                                  |
| clock                        | :x:         | deleted     |                                                                       |
| contact                      | :pencil2:   | renamed     | renamed to "person-circle"                                            |
| contacts                     | :pencil2:   | renamed     | renamed to "person-circle"                                            |
| done-all                     | :pencil2:   | renamed     | renamed to "checkmark-done"                                           |
| fastforward	                 | :pencil2:   | renamed     | renamed to "play-forward"                                             |
| filing                       | :pencil2:   | renamed     | renamed to "file-tray"                                                |
| logo-freebsd-devil                | :x:         | deleted     |                                                                       |
| logo-game-controller-a            | :x:         | deleted     |                                                                       |
| logo-game-controller-b            | :x:         | deleted     | added as "game-controller"                                            |
| logo-googleplus                   | :x:         | deleted     |                                                                       |
| hand                         | :x:         | deleted     | split into "hand-left" and "hand-right"                               |
| heart-empty                  | :pencil2:   | renamed     | renamed to "heart-outline"                                            |
| jet                          | :x:         | deleted     | use "airplane"                                                        |
| list-box                     | :x:         | deleted     |                                                                       |
| lock                         | :pencil2:   | renamed     | renamed to "lock-closed"                                              |
| microphone                   | :x:         | deleted     |                                                                       |
| model-s                      | :x:         | deleted     | added as "car-sport"                                                  |
| more                         | :x:         | deleted     | use "ellipsis-horizontal" for `ios` and "ellipsis-vertical" for `md`  |
| notifications-outline        | :x:         | deleted     | exists as circled version                                             |
| outlet                       | :x:         | deleted     |                                                                       |
| paper                        | :pencil2:   | renamed     | renamed to "newspaper"                                                |
| logo-polymer                      | :x:         | deleted     |                                                                       |
| pie                          | :pencil2:   | renamed     | renamed to "pie-chart"                                                |
| photos                       | :x:         | deleted     | use "image" or "images"                                               |
| qr-scanner                      | :pencil2:   | renamed     | renamed to "qr-code"                                               |
| quote                        | :x:         | deleted     |                                                                       |
| redo                         | :pencil2:   | renamed     | renamed to "arrow-redo"                                               |
| reorder                      | :x:         | deleted     | added as "reorder-two", "reorder-three", "reorder-four"               |
| return-left                  | :pencil2:   | renamed     | renamed to "return-down-back"                                         |
| return-right                 | :pencil2:   | renamed     | renamed to "return-down-forward"                                      |
| rewind                       | :pencil2:   | renamed     | renamed to "play-back"                                                |
| reverse-camera               | :pencil2:   | renamed     | renamed to "camera-reverse"                                           |
| share-alt                    | :x:         | deleted     |                                                                       |
| skip-backward	               | :pencil2:   | renamed     | renamed to "play-skip-back"					                                 |
| skip-forward	               | :pencil2:   | renamed     | renamed to "play-skip-forward"					                               |
| stats	                       | :pencil2:   | renamed     | renamed to "stats-chart"                                              |
| swap                         | :x:         | deleted     | use "swap-horizontal" or "swap-vertical"                              |
| switch                       | :pencil2:   | renamed     | renamed to "toggle"                                                   |
| text                         | :pencil2:   | renamed     | renamed to "chatbox-ellipses"                                         |
| undo                         | :pencil2:   | renamed     | renamed to "arrow-undo"	                                             |
| unlock                       | :pencil2:   | renamed     | renamed to "lock-open"		                                             |
