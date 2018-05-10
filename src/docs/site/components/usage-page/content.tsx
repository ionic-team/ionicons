import hljs from 'highlight.js';

export default function (version: string, type = "md", name = "heart") {
  return (<div>

<h1>Usage</h1>
<p class="lead">Ionicons is a completely open-source icon set with 700+ icons crafted for web, iOS, Android, and desktop apps. Ionicons was built for Ionic Framework, so icons have both Material Design and iOS versions. Ionic will automatically use the correct version based on your platform.</p>

<h2>Using the Web Component</h2>
<p>The Iconicons Web Component is an easy and performant way to use Ionicons in your app. The component will dynamically load an SVG for each icon, so your app is only requesting the icons that you need.</p>

<h3>Installation</h3>
<p>If you're using Ionic Framework, Ionicons is packaged by default, so no installation is necessary. Want to use Ionicons without Ionic Framework? Place the following <code>{`<script>`}</code> near the end of your page, right before the closing <code>{`</body>`}</code> tag, to enable them.</p>

{highlight(
`<script src="https://unpkg.com/ionicons@${version}/dist/ionicons.js"></script>`
)}

<h3 id="basic-usage">Basic usage</h3>
<p>To use an icon, populate the <code>name</code> attribute on the <code>ion-icon</code> component:</p>
{highlight(
`<ion-icon name="${name}"></ion-icon>`
)}

<h3>Platform Specific Icons</h3>
<p>Many icons have both Material Design and iOS versions. Ionic will automatically use the correct version based on the platform.</p>
<p>To specify the icon to use for each platform, use the <code>md</code> and <code>ios</code> attributes and provide the platform specific icon name.</p>
{(type == 'logo') ? highlight(
`<ion-icon ios="ios-heart" md="md-heart"></ion-icon>`
):highlight(
`<ion-icon ios="ios-${name}" md="md-${name}"></ion-icon>`
)}

<h2>Using the Webfont</h2>
<p>The webfont is compatible with previous versions of Ionicons. If you're using Ionicons for the first time we strongly recommend using the Web Component - you'll see much better performance.</p>

<h3>Installation</h3>
<p>To embed the Ionicons webfont into your webpage, copy this code into the <code>{`<head>`}</code> of the HTML document.</p>
{highlight(
`<link href="https://unpkg.com/ionicons@${version}/dist/css/ionicons.min.css"rel="stylesheet"/>`
)}


<h3>Basic usage</h3>
<p>Use the <stencil-route-link url='/'>icon index</stencil-route-link> to look up the name of the icon you want to use. The icon's CSS class name will be prefixed with <code>ion-</code>, followed by the platform attribute <code>md-</code>, <code>ios-</code> or <code>logo-</code> and completed wth the icon name.</p>
{highlight(
`<i class="icon ion-${type}-${name}"></i>`
)}

</div>)}

function highlight(text: string) {
  return (
    <div class="styled-code">
      <pre innerHTML={hljs.highlightAuto(text).value}></pre>
    </div>
  )
}
