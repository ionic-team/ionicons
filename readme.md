# Ionicons

[Ionicons](http://ionicons.com/) is a completely open-source icon set with 1,100+ icons crafted for web, iOS, Android, and desktop apps. Ionicons was built for [Ionic Framework](https://ionicframework.com/), so icons have both Material Design and iOS versions.

Note: All brand icons are trademarks of their respective owners. The use of these trademarks does not indicate endorsement of the trademark holder by Ionic, nor vice versa.

We intend for this icon pack to be used with [Ionic](http://ionicframework.com/), but it’s by no means limited to it. Use them wherever you see fit, personal or commercial. They are free to use and licensed under [MIT](http://opensource.org/licenses/MIT).


## Contributing

Thanks for your interest in contributing! Read up on our guidelines for
[contributing](https://github.com/ionic-team/ionicons/blob/master/.github/CONTRIBUTING.md)
and then look through our issues with a [help wanted](https://github.com/ionic-team/ionicons/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
label.


## Using the Web Component

The Ionicons Web Component is an easy and performant way to use Ionicons in your app. The component will dynamically load an SVG for each icon, so your app is only requesting the icons that you need.

Also note that only visible icons are loaded, and icons which are "below the fold" and hidden from the user's view do not make fetch requests for the svg resource.

### Installation

If you're using [Ionic Framework](https://ionicframework.com/), Ionicons is packaged by default, so no installation is necessary. Want to use Ionicons without Ionic Framework? Place the following `<script>` near the end of your page, right before the closing </body> tag, to enable them.

```html
<script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
```

### Basic usage

To use a built-in icon from the Ionicons package, populate the `name` attribute on the ion-icon component:

```html
<ion-icon name="heart"></ion-icon>
```

To use a custom SVG, provide its url in the `src` attribute to request the external SVG file. The `src` attribute works the same as `<img src="...">` in that the url must be accessible from the webpage that's making a request for the image. Additionally, the external file can only be a valid svg and does not allow scripts or events within the svg element.

```html
<ion-icon src="/path/to/external/file.svg"></ion-icon>
```

### Icon sizes

To specify the icon size, you can use the size attribute for our pre-defined font sizes.

```html
<ion-icon size="small"></ion-icon>
<ion-icon size="large"></ion-icon>
```

Or you can set a specific size by applying the `font-size` CSS property on the `ion-icon` component. It's recommended to use pixel sizes that are a multiple of 8 (8, 16, 32, 64, etc.)

```css
ion-icon {
  font-size: 64px;
}
```

## License

Ionicons is licensed under the [MIT license](http://opensource.org/licenses/MIT).


## Related

* [Ionicons Homepage](http://ionicons.com/)
* [Ionic Framework](https://ionicframework.com/)
* [Ionic Worldwide Slack](http://ionicworldwide.herokuapp.com/)
* [Ionic Forum](https://forum.ionicframework.com/)
* [Stencil](https://stenciljs.com/)
* [Stencil Worldwide Slack](https://stencil-worldwide.slack.com)
