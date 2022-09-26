import sharp from 'sharp';

type Options = {
  text: string;
  textColor: string;
  logo: string;
  backgroundColor: sharp.Color;
  output: string;
};

async function generateSeoImage({
  text = 'text',
  textColor = 'white',
  logo = 'logo.png',
  backgroundColor = {
    r: 23,
    g: 23,
    b: 23,
    alpha: 1,
  },
  output = 'output.png',
}: Options) {
  const backgroundImage = sharp({
    create: {
      height: 800,
      width: 1200,
      channels: 4,
      background: backgroundColor,
    },
  });

  // Text
  const textImage = sharp({
    text: {
      text: `<span foreground="${textColor}"><b>${text.toUpperCase()}</b></span>`,
      font: 'sans',
      rgba: true,
      dpi: 550,
    },
  });
  const textMetadata = await textImage.metadata();
  const textHeight = textMetadata.height || 0;
  const textWidth = textMetadata.width || 0;
  const textTop = Math.round((800 - textHeight) / 2);
  const textBottom = 800 - textHeight - textTop;
  const textLeft = 1200 - textWidth - 100;
  const textRight = 100;
  textImage.extend({
    top: textTop,
    bottom: textBottom,
    left: textLeft,
    right: textRight,
    background: {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0,
    },
  });

  // Logo
  const logoImage = sharp(logo);
  const logoMetadata = await logoImage.metadata();
  const oldLogoHeight = logoMetadata.height || 0;
  const oldLogoWidth = logoMetadata.width || 0;
  const logoHeight = 300;
  const logoWidth = Math.round((logoHeight * oldLogoWidth) / oldLogoHeight);
  const logoTop = 250;
  const logoBottom = 800 - logoHeight - logoTop;
  const logoLeft = 100;
  const logoRight = 1200 - logoWidth - logoLeft;
  logoImage
    .resize({
      height: logoHeight,
      width: logoWidth,
    })
    .extend({
      top: logoTop,
      bottom: logoBottom,
      left: logoLeft,
      right: logoRight,
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
      },
    });

  // compose image
  backgroundImage
    .composite([
      {
        input: await logoImage.png().toBuffer(),
      },
      {
        input: await textImage.png().toBuffer(),
      },
    ])
    .png()
    .toFile(output, (err) => {
      if (err) throw err;
    });
}

export default generateSeoImage;
export type { Options as SeoImageOptions };
