# Build

    npm run build


# Data

    Update the src/data.json file with each icon and search tags.


# Cheatsheet

    docs/cheatsheet.html


## Install

This repo already comes with all the files built and ready to go, but can also build the fonts from the source. Requires Python, FontForge, WOFF2, SVGO and Sass:

1) Install FontForge, which is the program that creates the font files from the SVG files:

    $ brew install fontforge ttfautohint

2) Install Google's WOFF2 font compressor

    https://github.com/google/woff2

3) Add or subtract files from the `src/` folder you'd like to be apart of the build.

4) Modify any settings in the `scripts/manifest.json` file. You can change the name of the font-family and CSS classname prefix.

5) Run the build command:

    npm run build
