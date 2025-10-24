import multer, { memoryStorage } from "multer";
// stockage dans le disuqe : utile pour les fichier de grand size
// mais un peu plus lent lors du chargement depuis le disque
export const uploadConfig = multer({});
// stockage dans la Ram, n'est souhaitable pour les fichiers de grande taille,
//  plus performant pour le chargement
export const uploadMemoryConfig = multer({ storage: memoryStorage() });
