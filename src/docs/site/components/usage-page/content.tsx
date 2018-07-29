import hljs from 'highlight.js';

export default function(version: string, type = 'md', name = 'heart') {
  return (<div>

<h1>Usage</h1>
<p class="lead">Ionicons is a completely open-source icon set with 700+ icons crafted for web, iOS, Android, and desktop apps. Ionicons was built for <a href="https://ionicframework.com/">Ionic Framework</a>, so icons have both Material Design and iOS versions. When used with Ionic, the <code>ion-icon</code> component will automatically use the correct version based on your platform. Additionally, when used outside of Ionic, both <code>ios</code> and <code>md</code> platforms can be chosen by the application.</p>

<h2>Using the Web Component</h2>
<p>The Iconicons Web Component is an easy and performant way to use Ionicons in your app. The component will dynamically load an SVG for each icon, so your app is only requesting the icons that you need.</p>

<p>Also note that only visible icons are loaded, and icons which are "below the fold" and hidden from the user's view do not make fetch requests for the svg resource.</p>

<h3>Installation</h3>
<p>If you're using Ionic Framework, Ionicons is packaged by default, so no installation is necessary. Want to use Ionicons without Ionic Framework? Place the following <code>{`<script>`}</code> near the end of your page, right before the closing <code>{`</body>`}</code> tag, to enable them.</p>

{highlight(
`<script src="https://unpkg.com/ionicons@${version}/dist/ionicons.js"></script>`
)}

<h3 id="basic-usage">Basic usage</h3>
<p>To use a built-in icon from the Ionicons package, populate the <code>name</code> attribute on the <code>ion-icon</code> component:</p>
{(type === 'logo') ? highlight(
`<ion-icon name="logo-${name}"></ion-icon>`
) : highlight(
`<ion-icon name="${name}"></ion-icon>`
)}

<p>To use a custom SVG, provide its url in the <code>src</code> attribute to request the external SVG file. The <code>src</code> attribute works the same as <code>&lt;img src="..."&gt;</code> in that the url must be accessible from the webpage that's making a request for the image. Additionally, the external file can only be a valid <code>svg</code> and does not allow scripts or events within the <code>svg</code> element.</p>
{highlight(
  `<ion-icon src="/path/to/external/file.svg"></ion-icon>`
)}

<h2>Platform specific icons</h2>
<p>Many icons have both Material Design and iOS versions to provide Platform Continuity for users.</p>

<p>Platform Continuity means that by default, ionicons running on iOS (Apple products such as iPhone and iPad) will display <code>ios</code> styled icons. Alternatively, ionicons running on devices with Material Design theme (commonly seen on Android devices) will see the <code>md</code> styled icons.</p>


<h3>Platform Continuity Within Ionic Apps</h3>

<p>Ionic will automatically use the correct version based on the platform. Note that this feature will only automatically kick-in for Ionic apps. When being used outside of an Ionic app, please see the "Outside Ionic App" section below.</p>

<p>To specify the icon for each platform, use the <code>md</code> and <code>ios</code> attributes and provide the platform specific icon name.</p>
{(type === 'logo') ? highlight(
`<ion-icon ios="ios-heart" md="md-heart"></ion-icon>`
) : highlight(
`<ion-icon ios="ios-${name}" md="md-${name}"></ion-icon>`
)}

<h3>Platform Continuity Outside Ionic Apps</h3>

<p>When using Ionicons without the <a href="https://ionicframework.com/">Ionic Framework</a>, the icon will default to the Material Design icon style. To specify the non-default icon style, add a platform prefix to the <code>name</code> attribute.</p>
{(type === 'logo') ? highlight(
`<ion-icon name="ios-heart"></ion-icon>`
) : highlight(
`<ion-icon name="ios-${name}"></ion-icon>`
)}
{(type === 'logo') ? highlight(
`<ion-icon name="md-heart"></ion-icon>`
) : highlight(
`<ion-icon name="md-${name}"></ion-icon>`
)}

<h3>Icon sizes</h3>
<p>To specify the icon size, you can use the <code>size</code> attribute for our pre-defined font sizes.</p>
{highlight(
`<ion-icon size="small"></ion-icon>
<ion-icon size="large"></ion-icon>`
)}
<p>Or you can set a specific size by applying the <code>font-size</code> CSS property on the <code>ion-icon</code> component. It's recommended to use pixel sizes that are a multiple of 8 (8, 16, 32, 64, etc.)</p>
{highlight(
`ion-icon {
  font-size: 64px;
}`
)}

<h2>Using the Font Icon</h2>
<p>The font icon is compatible with previous versions of Ionicons. If you're using Ionicons for the first time we strongly recommend using the <code>ion-icon</code> web component instead.</p>

<p>An advantage to the font icon file is that all of the icons are in one file. A disadvantage to the font icon file is that all of the icons are in one file. Additionally, large font files have a negative impact on a webpage's time to first paint.</p>

<p>In most cases it may be better to request a small number of svgs using the web component method. A bonus with the web component is that it uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">Intersection Observer</a> to only request icons which are viewable by the users (icons above the fold). However, if a webpage has to show <em>many</em> icons at once (such as this website's homepage which is showing 700+ icons on one page), the font icon may be a better choice.</p>

<h3>Installation</h3>
<p>To embed the Ionicons font icon, copy this code into the <code>{`<head>`}</code> of the HTML document.</p>
{highlight(
`<link href="https://unpkg.com/ionicons@${version}/dist/css/ionicons.min.css" rel="stylesheet">`
)}


<h3>Basic usage</h3>
<p>Use the <stencil-route-link url="/">icon index</stencil-route-link> to look up the name of the icon you want to use. The icon's CSS class name will be prefixed with <code>ion-</code>, followed by the platform attribute <code>md-</code>, <code>ios-</code> or <code>logo-</code> and completed wth the icon name.</p>
{highlight(
`<i class="icon ion-${type}-${name}"></i>`
)}

</div>); }

function highlight(text: string) {
  return (
    <div class="styled-code">
      <pre innerHTML={hljs.highlightAuto(text).value}></pre>
    </div>
  );
}
