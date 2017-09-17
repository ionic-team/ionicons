## Build Instructions

This repo already comes with all the files built and ready to go, but can also build the fonts from the source. Requires Python, FontForge, WOFF2, SVGO and Sass:

1) Install FontForge, which is the program that creates the font files from the SVG files:

    $ brew install fontforge ttfautohint

2) Install Google's WOFF2 font compressor

    https://github.com/google/woff2

3) Install [Sass](http://sass-lang.com/)

    $ gem install sass

4) Install [SVGO](https://github.com/svg/svgo)

    $ npm install -g svgo

5) Add or subtract files from the `src/` folder you'd like to be apart of the build.

6) Modify any settings in the `builder/manifest.json` file. You can change the name of the font-family and CSS classname prefix.

7) Run the build command:

    python ./builder/generate.py
