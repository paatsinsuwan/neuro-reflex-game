# Neuro Reflex – Stroop Task

A browser reaction game based on the Stroop effect: press the color that matches either the word's ink color or the written word, before the timer runs out.

## Run

ES modules don't load from `file://`, so serve the folder:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

No build step. React, Radix Toggle Group and d3 are imported as ES modules from a CDN (see `js/vendor.js`).

## Structure

```
index.html            page shell
css/styles.css        compiled Tailwind styles
js/main.js            entry point
js/vendor.js          third-party imports
js/constants.js       colors, trial timing, scoring
js/hooks/             useStroopGame (game logic), useContainerWidth
js/components/        UI components
```

## Known issues

- `useContainerWidth` never attaches its ref, so the stage is always 600px wide and doesn't resize.

## License

[MIT](LICENSE)
