if (process.env.NODE_ENV !== "production") require("dotenv").config();

const axios = require("axios");

const CLOUDINARY_CLOUDNAME = process.env.CLAUDINARY_CLOUDNAME;
const CLOUDINARY_EFFECT = "blur:1000";
const CLOUDINARY_QUALITY = 75;

const CROP_TYPE = "fill";
const ASPECT_RATIO_SMALL = 65;
const ASPECT_RATIO_MEDIUM = 500;
const ASPECT_RATIO_BIG = 700;
const ASPECT_RATIO_XL = 900;

const cloudinaryResizeParams = {
  small: {
    width: ASPECT_RATIO_SMALL,
    type: CROP_TYPE,
  },
  medium: {
    width: ASPECT_RATIO_MEDIUM,
    type: CROP_TYPE,
  },
  big: {
    width: ASPECT_RATIO_BIG,
    type: CROP_TYPE,
  },
  xl: {
    width: ASPECT_RATIO_XL,
    type: CROP_TYPE,
  },
};

const cloudinaryEffectsType = { blur: "blur" };

const DEEZER_API_KEY = process.env.DEEZER_API_KEY;
const DEEZER_API_SOURCE = process.env.DEEZER_API_SOURCE;

const makeRequest = axios.create({
  baseURL: DEEZER_API_SOURCE,
  headers: { "x-rapidapi-key": DEEZER_API_KEY },
  timeout: 30000,
});

const targetIDs = process.env.APP_DATA_STREAMS.split(" ");

module.exports = {
  cloudinary: {
    CLOUDINARY_CLOUDNAME,
    CLOUDINARY_QUALITY,
    CLOUDINARY_EFFECT,
    cloudinaryResizeParams,
    cloudinaryEffectsType,
  },
  worker: { targetIDs, makeRequest },
};
