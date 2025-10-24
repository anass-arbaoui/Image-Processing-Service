import { Request, Response } from "express";
import path from "path";

import { fileURLToPath } from "url";
import { getImageMeta, waterMarkFunction } from "./service";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath1 = path.resolve(__dirname, "../../public/output.jpg");
const imagePath2 = path.resolve(__dirname, "../../public/sammy.png");

export const controller = {
  getAll: async (req: Request, res: Response) => {
    console.log("getall activé");
    let images = [];

    images.push(await getImageMeta(imagePath1));
    images.push(await getImageMeta(imagePath2));

    res.status(200).json({ data: images });
  },
  getById: async (req: Request, res: Response) => {
    const { format } = req.query;
    const supported = ["jpeg", "png", "webp", "avif", "tiff", "gif"];

    if (!supported.includes(format as string)) {
      return res.status(400).json({ error: "Unsupported format" });
    }
    try {
      let transformer = sharp(imagePath1);

      // Appel explicite des méthodes
      switch (format) {
        case "jpeg":
          transformer = transformer.jpeg();
          break;
        case "png":
          transformer = transformer.png();
          break;
        case "webp":
          transformer = transformer.webp();
          break;
        case "avif":
          transformer = transformer.avif();
          break;
        case "tiff":
          transformer = transformer.tiff();
          break;
        case "gif":
          transformer = transformer.gif();
          break;
      }
      const transformedImageBuffer = await transformer.toBuffer();
      res.type(`image/${format}`).send(transformedImageBuffer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getTransformed: async (req: Request, res: Response) => {
    const {
      resize,
      rotate,
      flip,
      mirror,
      grayscale,
      sepia,
      format,
      watermark,
      compress,
    } = req.body;

    let image = sharp(imagePath1);

    if (resize) {
      const [width, height] = resize.split("x");
      image = image.resize(Number(width), Number(height));
    }

    if (rotate) {
      image.rotate(Number(rotate));
    }
    if (flip === "true") {
      image.flip();
    }
    if (mirror === "true") {
      image.flop();
    }
    if (grayscale === "true") {
      image.grayscale();
    }
    if (sepia === "true") {
      image
        .recomb([
          [0.3588, 0.7044, 0.1368],
          [0.299, 0.587, 0.114],
          [0.2392, 0.4696, 0.0912],
        ])
        .raw();
    }

    if (watermark === "true") {
      image = await waterMarkFunction("Emmr/div/sic", image, 32, 80);
    }
    const imageBuffer = await image.toBuffer();
    res.type(`image/${format || "jpeg"}`);
    res.send(imageBuffer);
  },
};
