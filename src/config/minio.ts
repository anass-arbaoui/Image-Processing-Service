import { Client } from "minio";
import dotenv from "dotenv";

dotenv.config();
export const minioClient = new Client({
  endPoint: process.env.MINIO_END_POINT!,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER,
  secretKey: process.env.MINIO_ROOT_PASSWORD,
});

export const imageBucket = "ecom";
export const bucketName = "tawassol";

export const minioTest = async () => {
  try {
    const res = await minioClient.bucketExists(bucketName);

    if (!res) {
      console.log("bucket tawassol doesn't exist");
    }

    const allBuckets = await minioClient.listBuckets();
    const adresseFiles: string[] = [];

    const stream = await minioClient.listObjects(
      bucketName,
      "pers\\adresse",
      true
    );

    stream.on("data", (obj) => adresseFiles.push(obj.name!));

    stream.on("end", () => {
      console.log("fichiers trouvées sont ", adresseFiles);
    });

    console.log("Connected to MinIo successfuly ", adresseFiles);
  } catch (error) {
    console.log("failed to connect to MinIo");
  }
};
