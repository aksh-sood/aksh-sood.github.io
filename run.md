cd /Users/akshsood/Desktop/aksh/personal-website
npm install        # first time only
npm run dev

That serves it at http://localhost:4321 with hot reload.

Build it:

npm run build      # static output into ./dist
npm run preview    # serve the built output to check it

npm run preview also runs on http://localhost:4321.

The two other scripts:

npm run check      # type-check + validate every content schema
npm run fonts      # re-subset the typefaces — only needed after upgrading
                   # @fontsource-variable/newsreader or @fontsource/ibm-plex-mono

npm run check is worth running after editing anything in src/content/ — the schemas are strict, so a typo fails the build rather than shipping.

Requires Node 22+ (you're on 26, so you're fine).