"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const imagePath = path_1.default.resolve(__dirname, "../output.jpg");
(0, sharp_1.default)(imagePath).metadata().then(console.log);
(0, sharp_1.default)(imagePath)
    .resize({ width: 600, height: 350 })
    .metadata()
    .then(console.log);
