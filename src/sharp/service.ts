import sharp from "sharp";

export const getImageMeta = async (imagePath: string) => {
  const { width, height, size, format } = await sharp(imagePath).metadata();
  return { imagePath, width, height, size, format };
};

export const waterMarkFunction = async (
  text: string,
  image: sharp.Sharp,
  fontSize: number,
  spacing: number
) => {
  const { width, height } = await image.metadata();

  console.log(width, height);

  //   const fontSize = 40;
  //   const spacing = 100;
  let lines = "";

  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      lines += `<text x="${x}" y="${y}" font-size="${fontSize}" fill="black" opacity="0.2" transform="rotate(-30, ${x}, ${y})">${text}</text>`;
    }
  }

  const svg = Buffer.from(`
    <svg width="${width}" height="${height} " xmlns="http://www.w3.org/2000/svg">
      ${lines}
    </svg>
  `);

  return image.composite([{ input: svg, blend: "over" }]);
};
