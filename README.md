# SEO Image Gen

Generate simple SEO images with logo and title.

## Installation

```bash
npm install --save @shop3/seo-image-gen sharp
```

## Usage

```js
import generateSeoImage from '@shop3/seo-image-gen';

generateSeoImage({
  text: 'Roadmap',
  textColor: 'white',
  logo: 'logo.png',
  backgroundColor: {
    r: 23,
    g: 23,
    b: 23,
    alpha: 1,
  },
  output: 'output.png'
})
```

# Development

## Installation

```bash
npm install

npm run husky:install
```
