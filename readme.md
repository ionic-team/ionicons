# Ionicons

### [Announcing Ionicons v4!](https://blog.ionicframework.com/announcing-ionicons-v4/)

[Ionicons](http://ionicons.com/) is a completely open-source icon set with 700+ icons crafted for web, iOS, Android, and desktop apps. Ionicons was built for [Ionic Framework](https://ionicframework.com/), so icons have both Material Design and iOS versions. When used with Ionic, the `ion-icon` component will automatically use the correct version based on your platform. Additionally, when used outside of Ionic, both `ios` and `md` platforms can be chosen by the application.

Note: All brand icons are trademarks of their respective owners. The use of these trademarks does not indicate endorsement of the trademark holder by Drifty, nor vice versa.

Visit [ionicons.com](http://ionicons.com) and  check out the search feature, which has keywords identifying common icon names and styles. For example, if you search for “arrow” we call up every icon that could possibly be used as an arrow.

We intend for this icon pack to be used with [Ionic](http://ionicframework.com/), but it’s by no means limited to it. Use them wherever you see fit, personal or commercial. They are free to use and licensed under [MIT](http://opensource.org/licenses/MIT).


## Using the Web Component

The Iconicons Web Component is an easy and performant way to use Ionicons in your app. The component will dynamically load an SVG for each icon, so your app is only requesting the icons that you need.

Also note that only visible icons are loaded, and icons which are "below the fold" and hidden from the user's view do not make fetch requests for the svg resource.

### Installation

If you're using [Ionic Framework](https://ionicframework.com/), Ionicons is packaged by default, so no installation is necessary. Want to use Ionicons without Ionic Framework? Place the following `<script>` near the end of your page, right before the closing </body> tag, to enable them.

```
<script src="https://unpkg.com/ionicons@4.2.2/dist/ionicons.js"></script>
```

### Basic usage

To use a built-in icon from the Ionicons package, populate the `name` attribute on the ion-icon component:

```
<ion-icon name="heart"></ion-icon>
```

To use a custom SVG, provide its url in the `src` attribute to request the external SVG file. The `src` attribute works the same as `<img src="...">` in that the url must be accessible from the webpage that's making a request for the image. Additionally, the external file can only be a valid svg and does not allow scripts or events within the svg element.

```
<ion-icon src="/path/to/externa/file.svg"></ion-icon>
```

### Platform specific icons

Many icons have both Material Design and iOS versions to provide Platform Continuity for users.

Platform Continuity means that by default, ionicons running on iOS (Apple products such as iPhone and iPad) will display `ios` styled icons. Alternatively, ionicons running on devices with Material Design theme (commonly seen on Android devices) will see the `md` styled icons.

### Platform Continuity Within Ionic Apps

Ionic will automatically use the correct version based on the platform. Note that this feature will only automatically kick-in for Ionic apps. When being used outside of an Ionic app, please see the "Outside Ionic App" section below.

To specify the icon for each platform, use the `md` and `ios` attributes and provide the platform specific icon name.

```
<ion-icon ios="ios-heart" md="md-heart"></ion-icon>
```

### Platform Continuity Outside Ionic Apps

When using Ionicons without the Ionic Framework, the icon will default to the Material Design icon style. To specify the non-default icon style, add a platform prefix to the `name` attribute.

```
<ion-icon name="ios-heart"></ion-icon>
<ion-icon name="md-heart"></ion-icon>
```

### Icon sizes

To specify the icon size, you can use the size attribute for our pre-defined font sizes.

```
<ion-icon size="small"></ion-icon>
<ion-icon size="large"></ion-icon>
```

Or you can set a specific size by applying the `font-size` CSS property on the `ion-icon` component. It's recommended to use pixel sizes that are a multiple of 8 (8, 16, 32, 64, etc.)

```
ion-icon {
  font-size: 64px;
}
```


## Using the Font Icon

The font icon is compatible with previous versions of Ionicons. If you're using Ionicons for the first time we strongly recommend using the `ion-icon` web component instead.

An advantage to the font icon file is that all of the icons are in one file. A disadvantage to the font icon file is that all of the icons are in one file. Additionally, large font files have a negative impact on a webpage's time to first paint.

In most cases it may be better to request a small number of svgs using the web component method. A bonus with the web component is that it uses Intersection Observer to only request icons which are viewable by the users (icons above the fold). However, if a webpage has to show many icons at once (such as this website's homepage which is showing 700+ icons on one page), the font icon may be a better choice.

### Installation

To embed the Ionicons font icon, copy this code into the `<head>` of the HTML document.

```
<link href="https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css" rel="stylesheet">
```

### Basic usage

Use the icon index to look up the name of the icon you want to use. The icon's CSS class name will be prefixed with ion-, followed by the platform attribute md-, ios- or logo- and completed wth the icon name.

```
<i class="icon ion-md-heart"></i>
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
