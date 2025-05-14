# Ionicons

[Ionicons](http://ionicons.com/) is a completely open-source icon set with 1,300 icons crafted for web, iOS, Android, and desktop apps. Ionicons was built for [Ionic Framework](https://ionicframework.com/), so icons have both Material Design and iOS versions.

Note: All brand icons are trademarks of their respective owners. The use of these trademarks does not indicate endorsement of the trademark holder by Ionic, nor vice versa.

We intend for this icon pack to be used with [Ionic](http://ionicframework.com/), but it’s by no means limited to it. Use them wherever you see fit, personal or commercial. They are free to use and licensed under [MIT](http://opensource.org/licenses/MIT).


## Contributing

Thanks for your interest in contributing! Read up on our guidelines for
[contributing](https://github.com/ionic-team/ionicons/blob/main/CONTRIBUTING.md)
and then look through our issues with a [help wanted](https://github.com/ionic-team/ionicons/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
label.


## Using the Web Component

The Ionicons Web Component is an easy and performant way to use Ionicons in your app. The component will dynamically load an SVG for each icon, so your app is only requesting the icons that you need.

Also note that only visible icons are loaded, and icons that are "below the fold" and hidden from the user's view do not make fetch requests for the svg resource.

### Installation

If you're using [Ionic Framework](https://ionicframework.com/), Ionicons is packaged by default, so no installation is necessary. Want to use Ionicons without Ionic Framework? Place the following `<script>` near the end of your page, right before the closing `</body>` tag, to enable them.

```html
<script type="module" src="https://esm.sh/ionicons@latest/loader"></script>
<script nomodule src="https://esm.sh/ionicons@latest/loader"></script>
```

you can replace `latest` to pick any version of Ionicon, e.g.:

```html
<script type="module" src="https://esm.sh/ionicons@8.0.0/loader"></script>
<script nomodule src="https://esm.sh/ionicons@8.0.0/loader"></script>
```

### Basic usage

To use a built-in icon from the Ionicons package, populate the `name` attribute on the ion-icon component:

```html
<ion-icon name="heart"></ion-icon>
```

### Custom icons

To use a custom SVG, provide its url in the `src` attribute to request the external SVG file. The `src` attribute works the same as `<img src="...">` in that the url must be accessible from the webpage that's making a request for the image. Additionally, the external file can only be a valid svg and does not allow scripts or events within the svg element.

```html
<ion-icon src="/path/to/external/file.svg"></ion-icon>
```

#### Custom Asset Path

If you have a different set of icons you would like to load or if the Ionicon icons are hosted on a different page or path, you can set the asset url from which Ionicons pulls the icons via:

```ts
import { setAssetPath, addIcons } from 'ionicons';
import { add, logoIonic, save } from 'ionicons/icons';

// set root path for loading icons to "<root>/public/svg"
setAssetPath(`${window.location.origin}/public/svg/`);

// only load specific icons
addIcons({ add, logoIonic, save });
```

This allows the use of named icons like this:

```html
<!-- now pulls the svg from "<root>/public/svg/heart.svg" -->
<ion-icon name="heart"></ion-icon>
```

## Variants
Each app icon in Ionicons has a `filled`, `outline` and `sharp` variant. These different variants are provided to make your app feel native to a variety of platforms. The filled variant uses the default name without a suffix. Note: Logo icons do not have outline or sharp variants.

```html
<ion-icon name="heart"></ion-icon> <!--filled-->
<ion-icon name="heart-outline"></ion-icon> <!--outline-->
<ion-icon name="heart-sharp"></ion-icon> <!--sharp-->
```

### Platform specificity
When using icons in Ionic Framework you can specify different icons per platform. Use the `md` and `ios` attributes and provide the platform-specific icon/variant name.

```html
<ion-icon ios="heart-outline" md="heart-sharp"></ion-icon>
```

## Size

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

## Color

Specify the icon color by applying the `color` CSS property on the `ion-icon` component.

```css
ion-icon {
  color: blue;
}
```

## Stroke width
When using an `outline` icon variant it is possible to adjust the stroke width, for improved visual balance relative to the icon's size or relative to the width of adjacent text. You can set a specific size by applying the `--ionicon-stroke-width` CSS custom property to the `ion-icon` component. The default value is 32px.

```html
<ion-icon name="heart-outline"></ion-icon>
```

```css
ion-icon {
  --ionicon-stroke-width: 16px;
}
```

## Migrating from v4

See the [5.0 release notes](https://github.com/ionic-team/ionicons/releases/tag/5.0.0) for a list of icon deletions/renames.

## License

Ionicons is licensed under the [MIT license](http://opensource.org/licenses/MIT).


## Related

* [Ionicons Homepage](http://ionicons.com/)
* [Ionic Framework](https://ionicframework.com/)
* [Ionic Discord](https://ionic.link/discord)
* [Ionic Forum](https://forum.ionicframework.com/)
* [Stencil](https://stenciljs.com/)
* [Capacitor](https://capacitorjs.com/)
