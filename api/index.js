var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    "use strict";
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return Math.round(ms2 / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms2 / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms2 / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms2 / s) + "s";
      }
      return ms2 + "ms";
    }
    function fmtLong(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return plural(ms2, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms2, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms2, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms2, msAbs, s, "second");
      }
      return ms2 + " ms";
    }
    function plural(ms2, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express2 from "express";
import path4 from "path";
import qs from "qs";

// src/app/config/env.ts
import dotenv from "dotenv";
import status from "http-status";

// src/app/errorHelpers/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var AppError_default = AppError;

// src/app/config/env.ts
dotenv.config();
var loadEnvVariables = () => {
  const requiredEnvVariable = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE",
    "EMAIL_SENDER_SMTP_USER",
    "EMAIL_SENDER_SMTP_PASS",
    "EMAIL_SENDER_SMTP_HOST",
    "EMAIL_SENDER_SMTP_PORT",
    "EMAIL_SENDER_SMTP_FROM",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "FRONTEND_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD"
  ];
  requiredEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      throw new AppError_default(
        status.INTERNAL_SERVER_ERROR,
        `Environment variable ${variable} is required but not set in .env file.`
      );
    }
  });
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN: process.env.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE,
    EMAIL_SENDER: {
      SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
      SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
      SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
      SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
      SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM
    },
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    },
    STRIPE: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
    },
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD
  };
};
var envVars = loadEnvVariables();

// src/app/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.6.0",
  "engineVersion": "75cbdc1eb7150937890ad5465d861175c6624711",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Admin {\n  id            String    @id @default(uuid(7))\n  name          String\n  email         String    @unique\n  profilePhoto  String?\n  contactNumber String?\n  isDeleted     Boolean   @default(false)\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  deletedAt     DateTime?\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([email])\n  @@index([isDeleted])\n  @@map("admins")\n}\n\nmodel User {\n  id                 String      @id\n  name               String\n  email              String\n  emailVerified      Boolean     @default(true)\n  role               Role        @default(USER)\n  status             UserStatus  @default(ACTIVE)\n  needPasswordChange Boolean     @default(false)\n  isDeleted          Boolean     @default(false)\n  deletedAt          DateTime?\n  image              String?\n  createdAt          DateTime    @default(now())\n  updatedAt          DateTime    @updatedAt\n  sessions           Session[]\n  accounts           Account[]\n  comments           Comment[]\n  likes              Like[]\n  reviews            Review[]\n  watchlists         Watchlist[]\n  admin              Admin?\n  payments           Payment[]\n\n  @@unique([email])\n  @@index([role])\n  @@index([status])\n  @@index([isDeleted])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Comment {\n  id      String @id @default(cuid())\n  content String\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  reviewId String\n  review   Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)\n\n  parentId String?\n  parent   Comment?  @relation("CommentToReply", fields: [parentId], references: [id])\n  replies  Comment[] @relation("CommentToReply")\n\n  createdAt DateTime @default(now())\n\n  @@index([userId])\n  @@index([reviewId])\n  @@index([parentId])\n}\n\nenum Role {\n  SUPER_ADMIN\n  ADMIN\n  USER\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  DELETED\n}\n\nenum MediaType {\n  MOVIE\n  SERIES\n}\n\nenum PricingType {\n  FREE\n  PREMIUM\n}\n\nenum ReviewStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\nenum PaymentType {\n  PURCHASE\n  RENT\n  SUBSCRIPTION\n}\n\nenum PaymentStatus {\n  PAID\n  UNPAID\n  FAILED\n}\n\nmodel Like {\n  id String @id @default(cuid())\n\n  userId   String\n  reviewId String\n\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, reviewId]) // one like per user\n  @@index([userId])\n  @@index([reviewId])\n}\n\nmodel Media {\n  id           String    @id @default(cuid())\n  title        String\n  description  String\n  type         MediaType\n  releaseYear  Int\n  director     String\n  cast         String[]\n  genres       String[]\n  thumbnail    String\n  trailerUrl   String?\n  streamingUrl String\n\n  pricingType PricingType @default(FREE)\n  price       Float?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  reviews    Review[]\n  watchlists Watchlist[]\n  payments   Payment[]\n\n  @@index([title])\n  @@index([type])\n  @@index([releaseYear])\n  @@index([pricingType])\n}\n\nmodel Payment {\n  id                 String        @id @default(cuid())\n  amount             Float\n  transactionId      String        @unique\n  stripeEventId      String?       @unique\n  status             PaymentStatus @default(UNPAID)\n  paymentType        PaymentType   @default(PURCHASE)\n  invoiceUrl         String?\n  paymentGatewayData Json?\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  mediaId String?\n  media   Media?  @relation(fields: [mediaId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([mediaId])\n  @@index([transactionId])\n  @@map("payments")\n}\n\nmodel Review {\n  id      String   @id @default(cuid())\n  rating  Int // 1-10\n  content String\n  spoiler Boolean  @default(false)\n  tags    String[]\n\n  status ReviewStatus @default(PENDING)\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  mediaId String\n  media   Media  @relation(fields: [mediaId], references: [id], onDelete: Cascade)\n\n  likes    Like[]\n  comments Comment[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([mediaId])\n  @@index([status])\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Watchlist {\n  id String @id @default(cuid())\n\n  userId  String\n  mediaId String\n\n  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)\n  media Media @relation(fields: [mediaId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n\n  @@unique([userId, mediaId])\n  @@index([userId])\n  @@index([mediaId])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Admin":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"profilePhoto","kind":"scalar","type":"String"},{"name":"contactNumber","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AdminToUser"}],"dbName":"admins"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"comments","kind":"object","type":"Comment","relationName":"CommentToUser"},{"name":"likes","kind":"object","type":"Like","relationName":"LikeToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"watchlists","kind":"object","type":"Watchlist","relationName":"UserToWatchlist"},{"name":"admin","kind":"object","type":"Admin","relationName":"AdminToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Comment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CommentToUser"},{"name":"reviewId","kind":"scalar","type":"String"},{"name":"review","kind":"object","type":"Review","relationName":"CommentToReview"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Comment","relationName":"CommentToReply"},{"name":"replies","kind":"object","type":"Comment","relationName":"CommentToReply"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Like":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"reviewId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"LikeToUser"},{"name":"review","kind":"object","type":"Review","relationName":"LikeToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Media":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"MediaType"},{"name":"releaseYear","kind":"scalar","type":"Int"},{"name":"director","kind":"scalar","type":"String"},{"name":"cast","kind":"scalar","type":"String"},{"name":"genres","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"trailerUrl","kind":"scalar","type":"String"},{"name":"streamingUrl","kind":"scalar","type":"String"},{"name":"pricingType","kind":"enum","type":"PricingType"},{"name":"price","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"reviews","kind":"object","type":"Review","relationName":"MediaToReview"},{"name":"watchlists","kind":"object","type":"Watchlist","relationName":"MediaToWatchlist"},{"name":"payments","kind":"object","type":"Payment","relationName":"MediaToPayment"}],"dbName":null},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Float"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"stripeEventId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"paymentType","kind":"enum","type":"PaymentType"},{"name":"invoiceUrl","kind":"scalar","type":"String"},{"name":"paymentGatewayData","kind":"scalar","type":"Json"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"PaymentToUser"},{"name":"mediaId","kind":"scalar","type":"String"},{"name":"media","kind":"object","type":"Media","relationName":"MediaToPayment"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"content","kind":"scalar","type":"String"},{"name":"spoiler","kind":"scalar","type":"Boolean"},{"name":"tags","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"ReviewStatus"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"mediaId","kind":"scalar","type":"String"},{"name":"media","kind":"object","type":"Media","relationName":"MediaToReview"},{"name":"likes","kind":"object","type":"Like","relationName":"LikeToReview"},{"name":"comments","kind":"object","type":"Comment","relationName":"CommentToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Watchlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mediaId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToWatchlist"},{"name":"media","kind":"object","type":"Media","relationName":"MediaToWatchlist"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","reviews","media","watchlists","payments","_count","review","likes","comments","parent","replies","admin","Admin.findUnique","Admin.findUniqueOrThrow","Admin.findFirst","Admin.findFirstOrThrow","Admin.findMany","data","Admin.createOne","Admin.createMany","Admin.createManyAndReturn","Admin.updateOne","Admin.updateMany","Admin.updateManyAndReturn","create","update","Admin.upsertOne","Admin.deleteOne","Admin.deleteMany","having","_min","_max","Admin.groupBy","Admin.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","Comment.findUnique","Comment.findUniqueOrThrow","Comment.findFirst","Comment.findFirstOrThrow","Comment.findMany","Comment.createOne","Comment.createMany","Comment.createManyAndReturn","Comment.updateOne","Comment.updateMany","Comment.updateManyAndReturn","Comment.upsertOne","Comment.deleteOne","Comment.deleteMany","Comment.groupBy","Comment.aggregate","Like.findUnique","Like.findUniqueOrThrow","Like.findFirst","Like.findFirstOrThrow","Like.findMany","Like.createOne","Like.createMany","Like.createManyAndReturn","Like.updateOne","Like.updateMany","Like.updateManyAndReturn","Like.upsertOne","Like.deleteOne","Like.deleteMany","Like.groupBy","Like.aggregate","Media.findUnique","Media.findUniqueOrThrow","Media.findFirst","Media.findFirstOrThrow","Media.findMany","Media.createOne","Media.createMany","Media.createManyAndReturn","Media.updateOne","Media.updateMany","Media.updateManyAndReturn","Media.upsertOne","Media.deleteOne","Media.deleteMany","_avg","_sum","Media.groupBy","Media.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Watchlist.findUnique","Watchlist.findUniqueOrThrow","Watchlist.findFirst","Watchlist.findFirstOrThrow","Watchlist.findMany","Watchlist.createOne","Watchlist.createMany","Watchlist.createManyAndReturn","Watchlist.updateOne","Watchlist.updateMany","Watchlist.updateManyAndReturn","Watchlist.upsertOne","Watchlist.deleteOne","Watchlist.deleteMany","Watchlist.groupBy","Watchlist.aggregate","AND","OR","NOT","id","userId","mediaId","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","rating","content","spoiler","tags","ReviewStatus","status","updatedAt","has","hasEvery","hasSome","amount","transactionId","stripeEventId","PaymentStatus","PaymentType","paymentType","invoiceUrl","paymentGatewayData","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","title","description","MediaType","type","releaseYear","director","cast","genres","thumbnail","trailerUrl","streamingUrl","PricingType","pricingType","price","every","some","none","reviewId","parentId","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","name","email","emailVerified","Role","role","UserStatus","needPasswordChange","isDeleted","deletedAt","image","profilePhoto","contactNumber","userId_reviewId","userId_mediaId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "_QVjsAEOAwAAiAMAIMkBAACHAwAwygEAAC0AEMsBAACHAwAwzAEBAAAAAc0BAQAAAAHPAUAA6AIAIeEBQADoAgAhlQIBAOICACGWAgEAAAABnAIgAP0CACGdAkAAgAMAIZ8CAQDlAgAhoAIBAOUCACEBAAAAAQAgDAMAAIgDACDJAQAAmgMAMMoBAAADABDLAQAAmgMAMMwBAQDiAgAhzQEBAOICACHPAUAA6AIAIeEBQADoAgAhiAJAAOgCACGSAgEA4gIAIZMCAQDlAgAhlAIBAOUCACEDAwAApwUAIJMCAADiAwAglAIAAOIDACAMAwAAiAMAIMkBAACaAwAwygEAAAMAEMsBAACaAwAwzAEBAAAAAc0BAQDiAgAhzwFAAOgCACHhAUAA6AIAIYgCQADoAgAhkgIBAAAAAZMCAQDlAgAhlAIBAOUCACEDAAAAAwAgAQAABAAwAgAABQAgEQMAAIgDACDJAQAAmQMAMMoBAAAHABDLAQAAmQMAMMwBAQDiAgAhzQEBAOICACHPAUAA6AIAIeEBQADoAgAhiQIBAOICACGKAgEA4gIAIYsCAQDlAgAhjAIBAOUCACGNAgEA5QIAIY4CQACAAwAhjwJAAIADACGQAgEA5QIAIZECAQDlAgAhCAMAAKcFACCLAgAA4gMAIIwCAADiAwAgjQIAAOIDACCOAgAA4gMAII8CAADiAwAgkAIAAOIDACCRAgAA4gMAIBEDAACIAwAgyQEAAJkDADDKAQAABwAQywEAAJkDADDMAQEAAAABzQEBAOICACHPAUAA6AIAIeEBQADoAgAhiQIBAOICACGKAgEA4gIAIYsCAQDlAgAhjAIBAOUCACGNAgEA5QIAIY4CQACAAwAhjwJAAIADACGQAgEA5QIAIZECAQDlAgAhAwAAAAcAIAEAAAgAMAIAAAkAIA0DAACIAwAgCwAAiwMAIA4AAJgDACAPAACDAwAgyQEAAJcDADDKAQAACwAQywEAAJcDADDMAQEA4gIAIc0BAQDiAgAhzwFAAOgCACHcAQEA4gIAIYQCAQDiAgAhhQIBAOUCACEFAwAApwUAIAsAAKgFACAOAACqBQAgDwAAnwUAIIUCAADiAwAgDQMAAIgDACALAACLAwAgDgAAmAMAIA8AAIMDACDJAQAAlwMAMMoBAAALABDLAQAAlwMAMMwBAQAAAAHNAQEA4gIAIc8BQADoAgAh3AEBAOICACGEAgEA4gIAIYUCAQDlAgAhAwAAAAsAIAEAAAwAMAIAAA0AIBEDAACIAwAgBwAAlAMAIAwAAIQDACANAACDAwAgyQEAAJUDADDKAQAADwAQywEAAJUDADDMAQEA4gIAIc0BAQDiAgAhzgEBAOICACHPAUAA6AIAIdsBAgDkAgAh3AEBAOICACHdASAA_QIAId4BAADAAgAg4AEAAJYD4AEi4QFAAOgCACEEAwAApwUAIAcAAKkFACAMAACgBQAgDQAAnwUAIBEDAACIAwAgBwAAlAMAIAwAAIQDACANAACDAwAgyQEAAJUDADDKAQAADwAQywEAAJUDADDMAQEAAAABzQEBAOICACHOAQEA4gIAIc8BQADoAgAh2wECAOQCACHcAQEA4gIAId0BIAD9AgAh3gEAAMACACDgAQAAlgPgASLhAUAA6AIAIQMAAAAPACABAAAQADACAAARACAJAwAAiAMAIAcAAJQDACDJAQAAkwMAMMoBAAATABDLAQAAkwMAMMwBAQDiAgAhzQEBAOICACHOAQEA4gIAIc8BQADoAgAhAgMAAKcFACAHAACpBQAgCgMAAIgDACAHAACUAwAgyQEAAJMDADDKAQAAEwAQywEAAJMDADDMAQEAAAABzQEBAOICACHOAQEA4gIAIc8BQADoAgAhogIAAJIDACADAAAAEwAgAQAAFAAwAgAAFQAgEQMAAIgDACAHAACRAwAgyQEAAIwDADDKAQAAFwAQywEAAIwDADDMAQEA4gIAIc0BAQDiAgAhzgEBAOUCACHPAUAA6AIAIeABAACOA-kBIuEBQADoAgAh5QEIAI0DACHmAQEA4gIAIecBAQDlAgAh6gEAAI8D6gEi6wEBAOUCACHsAQAAkAMAIAYDAACnBQAgBwAAqQUAIM4BAADiAwAg5wEAAOIDACDrAQAA4gMAIOwBAADiAwAgEQMAAIgDACAHAACRAwAgyQEAAIwDADDKAQAAFwAQywEAAIwDADDMAQEAAAABzQEBAOICACHOAQEA5QIAIc8BQADoAgAh4AEAAI4D6QEi4QFAAOgCACHlAQgAjQMAIeYBAQAAAAHnAQEAAAAB6gEAAI8D6gEi6wEBAOUCACHsAQAAkAMAIAMAAAAXACABAAAYADACAAAZACAVBgAA6QIAIAgAAOoCACAJAADrAgAgyQEAAOECADDKAQAAGwAQywEAAOECADDMAQEA4gIAIc8BQADoAgAh4QFAAOgCACHzAQEA4gIAIfQBAQDiAgAh9gEAAOMC9gEi9wECAOQCACH4AQEA4gIAIfkBAADAAgAg-gEAAMACACD7AQEA4gIAIfwBAQDlAgAh_QEBAOICACH_AQAA5gL_ASKAAggA5wIAIQEAAAAbACABAAAADwAgAQAAABMAIAEAAAAXACAJAwAAiAMAIAsAAIsDACDJAQAAigMAMMoBAAAgABDLAQAAigMAMMwBAQDiAgAhzQEBAOICACHPAUAA6AIAIYQCAQDiAgAhAgMAAKcFACALAACoBQAgCgMAAIgDACALAACLAwAgyQEAAIoDADDKAQAAIAAQywEAAIoDADDMAQEAAAABzQEBAOICACHPAUAA6AIAIYQCAQDiAgAhoQIAAIkDACADAAAAIAAgAQAAIQAwAgAAIgAgAwAAAAsAIAEAAAwAMAIAAA0AIAEAAAAgACABAAAACwAgAQAAAAsAIAMAAAALACABAAAMADACAAANACABAAAACwAgAwAAACAAIAEAACEAMAIAACIAIAMAAAAPACABAAAQADACAAARACADAAAAEwAgAQAAFAAwAgAAFQAgDgMAAIgDACDJAQAAhwMAMMoBAAAtABDLAQAAhwMAMMwBAQDiAgAhzQEBAOICACHPAUAA6AIAIeEBQADoAgAhlQIBAOICACGWAgEA4gIAIZwCIAD9AgAhnQJAAIADACGfAgEA5QIAIaACAQDlAgAhAQAAAC0AIAMAAAAXACABAAAYADACAAAZACABAAAAAwAgAQAAAAcAIAEAAAALACABAAAAIAAgAQAAAA8AIAEAAAATACABAAAAFwAgAQAAAAEAIAQDAACnBQAgnQIAAOIDACCfAgAA4gMAIKACAADiAwAgAwAAAC0AIAEAADgAMAIAAAEAIAMAAAAtACABAAA4ADACAAABACADAAAALQAgAQAAOAAwAgAAAQAgCwMAAKYFACDMAQEAAAABzQEBAAAAAc8BQAAAAAHhAUAAAAABlQIBAAAAAZYCAQAAAAGcAiAAAAABnQJAAAAAAZ8CAQAAAAGgAgEAAAABARYAADwAIArMAQEAAAABzQEBAAAAAc8BQAAAAAHhAUAAAAABlQIBAAAAAZYCAQAAAAGcAiAAAAABnQJAAAAAAZ8CAQAAAAGgAgEAAAABARYAAD4AMAEWAAA-ADALAwAApQUAIMwBAQCeAwAhzQEBAJ4DACHPAUAAnwMAIeEBQACfAwAhlQIBAJ4DACGWAgEAngMAIZwCIACqAwAhnQJAALYEACGfAgEAuwMAIaACAQC7AwAhAgAAAAEAIBYAAEEAIArMAQEAngMAIc0BAQCeAwAhzwFAAJ8DACHhAUAAnwMAIZUCAQCeAwAhlgIBAJ4DACGcAiAAqgMAIZ0CQAC2BAAhnwIBALsDACGgAgEAuwMAIQIAAAAtACAWAABDACACAAAALQAgFgAAQwAgAwAAAAEAIB0AADwAIB4AAEEAIAEAAAABACABAAAALQAgBgoAAKIFACAjAACkBQAgJAAAowUAIJ0CAADiAwAgnwIAAOIDACCgAgAA4gMAIA3JAQAAhgMAMMoBAABKABDLAQAAhgMAMMwBAQC2AgAhzQEBALYCACHPAUAAtwIAIeEBQAC3AgAhlQIBALYCACGWAgEAtgIAIZwCIAC_AgAhnQJAAPECACGfAgEAygIAIaACAQDKAgAhAwAAAC0AIAEAAEkAMCIAAEoAIAMAAAAtACABAAA4ADACAAABACAXBAAAgQMAIAUAAIIDACAGAADpAgAgCAAA6gIAIAkAAOsCACAMAACEAwAgDQAAgwMAIBAAAIUDACDJAQAA_AIAMMoBAABQABDLAQAA_AIAMMwBAQAAAAHPAUAA6AIAIeABAAD_ApsCIuEBQADoAgAhlQIBAOICACGWAgEAAAABlwIgAP0CACGZAgAA_gKZAiKbAiAA_QIAIZwCIAD9AgAhnQJAAIADACGeAgEA5QIAIQEAAABNACABAAAATQAgFwQAAIEDACAFAACCAwAgBgAA6QIAIAgAAOoCACAJAADrAgAgDAAAhAMAIA0AAIMDACAQAACFAwAgyQEAAPwCADDKAQAAUAAQywEAAPwCADDMAQEA4gIAIc8BQADoAgAh4AEAAP8CmwIi4QFAAOgCACGVAgEA4gIAIZYCAQDiAgAhlwIgAP0CACGZAgAA_gKZAiKbAiAA_QIAIZwCIAD9AgAhnQJAAIADACGeAgEA5QIAIQoEAACdBQAgBQAAngUAIAYAAKUEACAIAACmBAAgCQAApwQAIAwAAKAFACANAACfBQAgEAAAoQUAIJ0CAADiAwAgngIAAOIDACADAAAAUAAgAQAAUQAwAgAATQAgAwAAAFAAIAEAAFEAMAIAAE0AIAMAAABQACABAABRADACAABNACAUBAAAlQUAIAUAAJYFACAGAACZBQAgCAAAmgUAIAkAAJwFACAMAACYBQAgDQAAlwUAIBAAAJsFACDMAQEAAAABzwFAAAAAAeABAAAAmwIC4QFAAAAAAZUCAQAAAAGWAgEAAAABlwIgAAAAAZkCAAAAmQICmwIgAAAAAZwCIAAAAAGdAkAAAAABngIBAAAAAQEWAABVACAMzAEBAAAAAc8BQAAAAAHgAQAAAJsCAuEBQAAAAAGVAgEAAAABlgIBAAAAAZcCIAAAAAGZAgAAAJkCApsCIAAAAAGcAiAAAAABnQJAAAAAAZ4CAQAAAAEBFgAAVwAwARYAAFcAMBQEAADDBAAgBQAAxAQAIAYAAMcEACAIAADIBAAgCQAAygQAIAwAAMYEACANAADFBAAgEAAAyQQAIMwBAQCeAwAhzwFAAJ8DACHgAQAAwgSbAiLhAUAAnwMAIZUCAQCeAwAhlgIBAJ4DACGXAiAAqgMAIZkCAADBBJkCIpsCIACqAwAhnAIgAKoDACGdAkAAtgQAIZ4CAQC7AwAhAgAAAE0AIBYAAFoAIAzMAQEAngMAIc8BQACfAwAh4AEAAMIEmwIi4QFAAJ8DACGVAgEAngMAIZYCAQCeAwAhlwIgAKoDACGZAgAAwQSZAiKbAiAAqgMAIZwCIACqAwAhnQJAALYEACGeAgEAuwMAIQIAAABQACAWAABcACACAAAAUAAgFgAAXAAgAwAAAE0AIB0AAFUAIB4AAFoAIAEAAABNACABAAAAUAAgBQoAAL4EACAjAADABAAgJAAAvwQAIJ0CAADiAwAgngIAAOIDACAPyQEAAPUCADDKAQAAYwAQywEAAPUCADDMAQEAtgIAIc8BQAC3AgAh4AEAAPcCmwIi4QFAALcCACGVAgEAtgIAIZYCAQC2AgAhlwIgAL8CACGZAgAA9gKZAiKbAiAAvwIAIZwCIAC_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_AwAgzAEBAJ4DACHNAQEAngMAIc8BQACfAwAh3AEBAJ4DACGEAgEAngMAIYUCAQC7AwAhAgAAAA0AIBYAALYBACAGzAEBAJ4DACHNAQEAngMAIc8BQACfAwAh3AEBAJ4DACGEAgEAngMAIYUCAQC7AwAhAgAAAAsAIBYAALgBACACAAAACwAgFgAAuAEAIAEAAAALACADAAAADQAgHQAAsAEAIB4AALYBACABAAAADQAgAQAAAAsAIAQKAACtBAAgIwAArwQAICQAAK4EACCFAgAA4gMAIAnJAQAA7QIAMMoBAADAAQAQywEAAO0CADDMAQEAtgIAIc0BAQC2AgAhzwFAALcCACHcAQEAtgIAIYQCAQC2AgAhhQIBAMoCACEDAAAACwAgAQAAvwEAMCIAAMABACADAAAACwAgAQAADAAwAgAADQAgAQAAACIAIAEAAAAiACADAAAAIAAgAQAAIQAwAgAAIgAgAwAAACAAIAEAACEAMAIAACIAIAMAAAAgACABAAAhADACAAAiACAGAwAA3AMAIAsAAKwEACDMAQEAAAABzQEBAAAAAc8BQAAAAAGEAgEAAAABARYAAMgBACAEzAEBAAAAAc0BAQAAAAHPAUAAAAABhAIBAAAAAQEWAADKAQAwARYAAMoBADAGAwAA2gMAIAsAAKsEACDMAQEAngMAIc0BAQCeAwAhzwFAAJ8DACGEAgEAngMAIQIAAAAiACAWAADNAQAgBMwBAQCeAwAhzQEBAJ4DACHPAUAAnwMAIYQCAQCeAwAhAgAAACAAIBYAAM8BACACAAAAIAAgFgAAzwEAIAMAAAAiACAdAADIAQAgHgAAzQEAIAEAAAAiACABAAAAIAAgAwoAAKgEACAjAACqBAAgJAAAqQQAIAfJAQAA7AIAMMoBAADWAQAQywEAAOwCADDMAQEAtgIAIc0BAQC2AgAhzwFAALcCACGEAgEAtgIAIQMAAAAgACABAADVAQAwIgAA1gEAIAMAAAAgACABAAAhADACAAAiACAVBgAA6QIAIAgAAOoCACAJAADrAgAgyQEAAOECADDKAQAAGwAQywEAAOECADDMAQEAAAABzwFAAOgCACHhAUAA6AIAIfMBAQDiAgAh9AEBAOICACH2AQAA4wL2ASL3AQIA5AIAIfgBAQDiAgAh-QEAAMACACD6AQAAwAIAIPsBAQDiAgAh_AEBAOUCACH9AQEA4gIAIf8BAADmAv8BIoACCADnAgAhAQAAANkBACABAAAA2QEAIAUGAAClBAAgCAAApgQAIAkAAKcEACD8AQAA4gMAIIACAADiAwAgAwAAABsAIAEAANwBADACAADZAQAgAwAAABsAIAEAANwBADACAADZAQAgAwAAABsAIAEAANwBADACAADZAQAgEgYAAKIEACAIAACjBAAgCQAApAQAIMwBAQAAAAHPAUAAAAAB4QFAAAAAAfMBAQAAAAH0AQEAAAAB9gEAAAD2AQL3AQIAAAAB-AEBAAAAAfkBAACgBAAg-gEAAKEEACD7AQEAAAAB_AEBAAAAAf0BAQAAAAH_AQAAAP8BAoACCAAAAAEBFgAA4AEAIA_MAQEAAAABzwFAAAAAAeEBQAAAAAHzAQEAAAAB9AEBAAAAAfYBAAAA9gEC9wECAAAAAfgBAQAAAAH5AQAAoAQAIPoBAAChBAAg-wEBAAAAAfwBAQAAAAH9AQEAAAAB_wEAAAD_AQKAAggAAAABARYAAOIBADABFgAA4gEAMBIGAAD5AwAgCAAA-gMAIAkAAPsDACDMAQEAngMAIc8BQACfAwAh4QFAAJ8DACHzAQEAngMAIfQBAQCeAwAh9gEAAPQD9gEi9wECAKkDACH4AQEAngMAIfkBAAD1AwAg-gEAAPYDACD7AQEAngMAIfwBAQC7AwAh_QEBAJ4DACH_AQAA9wP_ASKAAggA-AMAIQIAAADZAQAgFgAA5QEAIA_MAQEAngMAIc8BQACfAwAh4QFAAJ8DACHzAQEAngMAIfQBAQCeAwAh9gEAAPQD9gEi9wECAKkDACH4AQEAngMAIfkBAAD1AwAg-gEAAPYDACD7AQEAngMAIfwBAQC7AwAh_QEBAJ4DACH_AQAA9wP_ASKAAggA-AMAIQIAAAAbACAWAADnAQAgAgAAABsAIBYAAOcBACADAAAA2QEAIB0AAOABACAeAADlAQAgAQAAANkBACABAAAAGwAgBwoAAO8DACAjAADyAwAgJAAA8QMAIJUBAADwAwAglgEAAPMDACD8AQAA4gMAIIACAADiAwAgEskBAADXAgAwygEAAO4BABDLAQAA1wIAMMwBAQC2AgAhzwFAALcCACHhAUAAtwIAIfMBAQC2AgAh9AEBALYCACH2AQAA2AL2ASL3AQIAvgIAIfgBAQC2AgAh-QEAAMACACD6AQAAwAIAIPsBAQC2AgAh_AEBAMoCACH9AQEAtgIAIf8BAADZAv8BIoACCADaAgAhAwAAABsAIAEAAO0BADAiAADuAQAgAwAAABsAIAEAANwBADACAADZAQAgAQAAABkAIAEAAAAZACADAAAAFwAgAQAAGAAwAgAAGQAgAwAAABcAIAEAABgAMAIAABkAIAMAAAAXACABAAAYADACAAAZACAOAwAA7QMAIAcAAO4DACDMAQEAAAABzQEBAAAAAc4BAQAAAAHPAUAAAAAB4AEAAADpAQLhAUAAAAAB5QEIAAAAAeYBAQAAAAHnAQEAAAAB6gEAAADqAQLrAQEAAAAB7AGAAAAAAQEWAAD2AQAgDMwBAQAAAAHNAQEAAAABzgEBAAAAAc8BQAAAAAHgAQAAAOkBAuEBQAAAAAHlAQgAAAAB5gEBAAAAAecBAQAAAAHqAQAAAOoBAusBAQAAAAHsAYAAAAABARYAAPgBADABFgAA-AEAMAEAAAAbACAOAwAA6wMAIAcAAOwDACDMAQEAngMAIc0BAQCeAwAhzgEBALsDACHPAUAAnwMAIeABAADpA-kBIuEBQACfAwAh5QEIAOgDACHmAQEAngMAIecBAQC7AwAh6gEAAOoD6gEi6wEBALsDACHsAYAAAAABAgAAABkAIBYAAPwBACAMzAEBAJ4DACHNAQEAngMAIc4BAQC7AwAhzwFAAJ8DACHgAQAA6QPpASLhAUAAnwMAIeUBCADoAwAh5gEBAJ4DACHnAQEAuwMAIeoBAADqA-oBIusBAQC7AwAh7AGAAAAAAQIAAAAXACAWAAD-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_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-QEAAMACACD6AQAAwAIAIPsBAQC2AgAh_AEBAMoCACH9AQEAtgIAIf8BAADZAv8BIoACCADaAgAhBwoAALkCACAjAADgAgAgJAAA4AIAINABAAAA9gEC0QEAAAD2AQjSAQAAAPYBCNcBAADfAvYBIgcKAAC5AgAgIwAA3gIAICQAAN4CACDQAQAAAP8BAtEBAAAA_wEI0gEAAAD_AQjXAQAA3QL_ASINCgAAzgIAICMAANwCACAkAADcAgAglQEAANwCACCWAQAA3AIAINABCAAAAAHRAQgAAAAF0gEIAAAABdMBCAAAAAHUAQgAAAAB1QEIAAAAAdYBCAAAAAHXAQgA2wIAIQ0KAADOAgAgIwAA3AIAICQAANwCACCVAQAA3AIAIJYBAADcAgAg0AEIAAAAAdEBCAAAAAXSAQgAAAAF0wEIAAAAAdQBCAAAAAHVAQgAAAAB1gEIAAAAAdcBCADbAgAhCNABCAAAAAHRAQgAAAAF0gEIAAAABdMBCAAAAAHUAQgAAAAB1QEIAAAAAdYBCAAAAAHXAQgA3AIAIQcKAAC5AgAgIwAA3gIAICQAAN4CACDQAQAAAP8BAtEBAAAA_wEI0gEAAAD_AQjXAQAA3QL_ASIE0AEAAAD_AQLRAQAAAP8BCNIBAAAA_wEI1wEAAN4C_wEiBwoAALkCACAjAADgAgAgJAAA4AIAINABAAAA9gEC0QEAAAD2AQjSAQAAAPYBCNcBAADfAvYBIgTQAQAAAPYBAtEBAAAA9gEI0gEAAAD2AQjXAQAA4AL2ASIVBgAA6QIAIAgAAOoCACAJAADrAgAgyQEAAOECADDKAQAAGwAQywEAAOECADDMAQEA4gIAIc8BQADoAgAh4QFAAOgCACHzAQEA4gIAIfQBAQDiAgAh9gEAAOMC9gEi9wECAOQCACH4AQEA4gIAIfkBAADAAgAg-gEAAMACACD7AQEA4gIAIfwBAQDlAgAh_QEBAOICACH_AQAA5gL_ASKAAggA5wIAIQvQAQEAAAAB0QEBAAAABNIBAQAAAATTAQEAAAAB1AEBAAAAAdUBAQAAAAHWAQEAAAAB1wEBALwCACHYAQEAAAAB2QEBAAAAAdoBAQAAAAEE0AEAAAD2AQLRAQAAAPYBCNIBAAAA9gEI1wEAAOAC9gEiCNABAgAAAAHRAQIAAAAE0gECAAAABNMBAgAAAAHUAQIAAAAB1QECAAAAAdYBAgAAAAHXAQIAuQIAIQvQAQEAAAAB0QEBAAAABdIBAQAAAAXTAQEAAAAB1AEBAAAAAdUBAQAAAAHWAQEAAAAB1wEBANUCACHYAQEAAAAB2QEBAAAAAdoBAQAAAAEE0AEAAAD_AQLRAQAAAP8BCNIBAAAA_wEI1wEAAN4C_wEiCNABCAAAAAHRAQgAAAAF0gEIAAAABdMBCAAAAAHUAQgAAAAB1QEIAAAAAdYBCAAAAAHXAQgA3AIAIQjQAUAAAAAB0QFAAAAABNIBQAAAAATTAUAAAAAB1AFAAAAAAdUBQAAAAAHWAUAAAAAB1wFAALoCACEDgQIAAA8AIIICAAAPACCDAgAADwAgA4ECAAATACCCAgAAEwAggwIAABMAIAOBAgAAFwAgggIAABcAIIMCAAAXACAHyQEAAOwCADDKAQAA1gEAEMsBAADsAgAwzAEBALYCACHNAQEAtgIAIc8BQAC3AgAhhAIBALYCACEJyQEAAO0CADDKAQAAwAEAEMsBAADtAgAwzAEBALYCACHNAQEAtgIAIc8BQAC3AgAh3AEBALYCACGEAgEAtgIAIYUCAQDKAgAhCckBAADuAgAwygEAAKgBABDLAQAA7gIAMMwBAQC2AgAhzwFAALcCACHhAUAAtwIAIYYCAQC2AgAhhwIBALYCACGIAkAAtwIAIQnJAQAA7wIAMMoBAACVAQAQywEAAO8CADDMAQEA4gIAIc8BQADoAgAh4QFAAOgCACGGAgEA4gIAIYcCAQDiAgAhiAJAAOgCACEQyQEAAPACADDKAQAAjwEAEMsBAADwAgAwzAEBALYCACHNAQEAtgIAIc8BQAC3AgAh4QFAALcCACGJAgEAtgIAIYoCAQC2AgAhiwIBAMoCACGMAgEAygIAIY0CAQDKAgAhjgJAAPECACGPAkAA8QIAIZACAQDKAgAhkQIBAMoCACELCgAAzgIAICMAAPMCACAkAADzAgAg0AFAAAAAAdEBQAAAAAXSAUAAAAAF0wFAAAAAAdQBQAAAAAHVAUAAAAAB1gFAAAAAAdcBQADyAgAhCwoAAM4CACAjAADzAgAgJAAA8wIAINABQAAAAAHRAUAAAAAF0gFAAAAABdMBQAAAAAHUAUAAAAAB1QFAAAAAAdYBQAAAAAHXAUAA8gIAIQjQAUAAAAAB0QFAAAAABdIBQAAAAAXTAUAAAAAB1AFAAAAAAdUBQAAAAAHWAUAAAAAB1wFAAPMCACELyQEAAPQCADDKAQAAeQAQywEAAPQCADDMAQEAtgIAIc0BAQC2AgAhzwFAALcCACHhAUAAtwIAIYgCQAC3AgAhkgIBALYCACGTAgEAygIAIZQCAQDKAgAhD8kBAAD1AgAwygEAAGMAEMsBAAD1AgAwzAEBALYCACHPAUAAtwIAIeABAAD3ApsCIuEBQAC3AgAhlQIBALYCACGWAgEAtgIAIZcCIAC_AgAhmQIAAPYCmQIimwIgAL8CACGcAiAAvwIAIZ0CQADxAgAhngIBAMoCACEHCgAAuQIAICMAAPsCACAkAAD7AgAg0AEAAACZAgLRAQAAAJkCCNIBAAAAmQII1wEAAPoCmQIiBwoAALkCACAjAAD5AgAgJAAA-QIAINABAAAAmwIC0QEAAACbAgjSAQAAAJsCCNcBAAD4ApsCIgcKAAC5AgAgIwAA-QIAICQAAPkCACDQAQAAAJsCAtEBAAAAmwII0gEAAACbAgjXAQAA-AKbAiIE0AEAAACbAgLRAQAAAJsCCNIBAAAAmwII1wEAAPkCmwIiBwoAALkCACAjAAD7AgAgJAAA-wIAINABAAAAmQIC0QEAAACZAgjSAQAAAJkCCNcBAAD6ApkCIgTQAQAAAJkCAtEBAAAAmQII0gEAAACZAgjXAQAA-wKZAiIXBAAAgQMAIAUAAIIDACAGAADpAgAgCAAA6gIAIAkAAOsCACAMAACEAwAgDQAAgwMAIBAAAIUDACDJAQAA_AIAMMoBAABQABDLAQAA_AIAMMwBAQDiAgAhzwFAAOgCACHgAQAA_wKbAiLhAUAA6AIAIZUCAQDiAgAhlgIBAOICACGXAiAA_QIAIZkCAAD-ApkCIpsCIAD9AgAhnAIgAP0CACGdAkAAgAMAIZ4CAQDlAgAhAtABIAAAAAHXASAAxQIAIQTQAQAAAJkCAtEBAAAAmQII0gEAAACZAgjXAQAA-wKZAiIE0AEAAACbAgLRAQAAAJsCCNIBAAAAmwII1wEAAPkCmwIiCNABQAAAAAHRAUAAAAAF0gFAAAAABdMBQAAAAAHUAUAAAAAB1QFAAAAAAdYBQAAAAAHXAUAA8wIAIQOBAgAAAwAgggIAAAMAIIMCAAADACADgQIAAAcAIIICAAAHACCDAgAABwAgA4ECAAALACCCAgAACwAggwIAAAsAIAOBAgAAIAAgggIAACAAIIMCAAAgACAQAwAAiAMAIMkBAACHAwAwygEAAC0AEMsBAACHAwAwzAEBAOICACHNAQEA4gIAIc8BQADoAgAh4QFAAOgCACGVAgEA4gIAIZYCAQDiAgAhnAIgAP0CACGdAkAAgAMAIZ8CAQDlAgAhoAIBAOUCACGjAgAALQAgpAIAAC0AIA3JAQAAhgMAMMoBAABKABDLAQAAhgMAMMwBAQC2AgAhzQEBALYCACHPAUAAtwIAIeEBQAC3AgAhlQIBALYCACGWAgEAtgIAIZwCIAC_AgAhnQJAAPECACGfAgEAygIAIaACAQDKAgAhDgMAAIgDACDJAQAAhwMAMMoBAAAtABDLAQAAhwMAMMwBAQDiAgAhzQEBAOICACHPAUAA6AIAIeEBQADoAgAhlQIBAOICACGWAgEA4gIAIZwCIAD9AgAhnQJAAIADACGfAgEA5QIAIaACAQDlAgAhGQQAAIEDACAFAACCAwAgBgAA6QIAIAgAAOoCACAJAADrAgAgDAAAhAMAIA0AAIMDACAQAACFAwAgyQEAAPwCADDKAQAAUAAQywEAAPwCADDMAQEA4gIAIc8BQADoAgAh4AEAAP8CmwIi4QFAAOgCACGVAgEA4gIAIZYCAQDiAgAhlwIgAP0CACGZAgAA_gKZAiKbAiAA_QIAIZwCIAD9AgAhnQJAAIADACGeAgEA5QIAIaMCAABQACCkAgAAUAAgAs0BAQAAAAGEAgEAAAABCQMAAIgDACALAACLAwAgyQEAAIoDADDKAQAAIAAQywEAAIoDADDMAQEA4gIAIc0BAQDiAgAhzwFAAOgCACGEAgEA4gIAIRMDAACIAwAgBwAAlAMAIAwAAIQDACANAACDAwAgyQEAAJUDADDKAQAADwAQywEAAJUDADDMAQEA4gIAIc0BAQDiAgAhzgEBAOICACHPAUAA6AIAIdsBAgDkAgAh3AEBAOICACHdASAA_QIAId4BAADAAgAg4AEAAJYD4AEi4QFAAOgCACGjAgAADwAgpAIAAA8AIBEDAACIAwAgBwAAkQMAIMkBAACMAwAwygEAABcAEMsBAACMAwAwzAEBAOICACHNAQEA4gIAIc4BAQDlAgAhzwFAAOgCACHgAQAAjgPpASLhAUAA6AIAIeUBCACNAwAh5gEBAOICACHnAQEA5QIAIeoBAACPA-oBIusBAQDlAgAh7AEAAJADACAI0AEIAAAAAdEBCAAAAATSAQgAAAAE0wEIAAAAAdQBCAAAAAHVAQgAAAAB1gEIAAAAAdcBCADHAgAhBNABAAAA6QEC0QEAAADpAQjSAQAAAOkBCNcBAADTAukBIgTQAQAAAOoBAtEBAAAA6gEI0gEAAADqAQjXAQAA0QLqASIM0AGAAAAAAdMBgAAAAAHUAYAAAAAB1QGAAAAAAdYBgAAAAAHXAYAAAAAB7QEBAAAAAe4BAQAAAAHvAQEAAAAB8AGAAAAAAfEBgAAAAAHyAYAAAAABFwYAAOkCACAIAADqAgAgCQAA6wIAIMkBAADhAgAwygEAABsAEMsBAADhAgAwzAEBAOICACHPAUAA6AIAIeEBQADoAgAh8wEBAOICACH0AQEA4gIAIfYBAADjAvYBIvcBAgDkAgAh-AEBAOICACH5AQAAwAIAIPoBAADAAgAg-wEBAOICACH8AQEA5QIAIf0BAQDiAgAh_wEAAOYC_wEigAIIAOcCACGjAgAAGwAgpAIAABsAIALNAQEAAAABzgEBAAAAAQkDAACIAwAgBwAAlAMAIMkBAACTAwAwygEAABMAEMsBAACTAwAwzAEBAOICACHNAQEA4gIAIc4BAQDiAgAhzwFAAOgCACEXBgAA6QIAIAgAAOoCACAJAADrAgAgyQEAAOECADDKAQAAGwAQywEAAOECADDMAQEA4gIAIc8BQADoAgAh4QFAAOgCACHzAQEA4gIAIfQBAQDiAgAh9gEAAOMC9gEi9wECAOQCACH4AQEA4gIAIfkBAADAAgAg-gEAAMACACD7AQEA4gIAIfwBAQDlAgAh_QEBAOICACH_AQAA5gL_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_AwAgzAEBAJ4DACHNAQEAngMAIc8BQACfAwAh3AEBAJ4DACGEAgEAngMAIQUdAADfBQAgHgAA5AUAIKUCAADgBQAgpgIAAOMFACCrAgAAEQAgCAMAAMoDACALAADLAwAgDwAAzAMAIMwBAQAAAAHNAQEAAAABzwFAAAAAAdwBAQAAAAGEAgEAAAABAx0AAOEFACClAgAA4gUAIKsCAABNACADHQAA3wUAIKUCAADgBQAgqwIAABEAIAQdAADAAwAwpQIAAMEDADCnAgAAwwMAIKsCAAC1AwAwCAMAAMoDACAOAADOAwAgDwAAzAMAIMwBAQAAAAHNAQEAAAABzwFAAAAAAdwBAQAAAAGFAgEAAAABAx0AAN0FACClAgAA3gUAIKsCAAANACAEAwAA3AMAIMwBAQAAAAHNAQEAAAABzwFAAAAAAQIAAAAiACAdAADbAwAgAwAAACIAIB0AANsDACAeAADZAwAgARYAANwFADAKAwAAiAMAIAsAAIsDACDJAQAAigMAMMoBAAAgABDLAQAAigMAMMwBAQAAAAHNAQEA4gIAIc8BQADoAgAhhAIBAOICACGhAgAAiQMAIAIAAAAiACAWAADZAwAgAgAAANcDACAWAADYAwAgB8kBAADWAwAwygEAANcDABDLAQAA1gMAMMwBAQDiAgAhzQEBAOICACHPAUAA6AIAIYQCAQDiAgAhB8kBAADWAwAwygEAANcDABDLAQAA1gMAMMwBAQDiAgAhzQEBAOICACHPAUAA6AIAIYQCAQDiAgAhA8wBAQCeAwAhzQEBAJ4DACHPAUAAnwMAIQQDAADaAwAgzAEBAJ4DACHNAQEAngMAIc8BQACfAwAhBR0AANcFACAeAADaBQAgpQIAANgFACCmAgAA2QUAIKsCAABNACAEAwAA3AMAIMwBAQAAAAHNAQEAAAABzwFAAAAAAQMdAADXBQAgpQIAANgFACCrAgAATQAgAagCAQAAAAQDHQAA1QUAIKUCAADWBQAgqwIAAE0AIAMdAADTBQAgpQIAANQFACCrAgAA2QEAIAQdAADPAwAwpQIAANADADCnAgAA0gMAIKsCAADTAwAwBB0AALEDADClAgAAsgMAMKcCAAC0AwAgqwIAALUDADAAAAAAAAAFqAIIAAAAAa4CCAAAAAGvAggAAAABsAIIAAAAAbECCAAAAAEBqAIAAADpAQIBqAIAAADqAQIFHQAAywUAIB4AANEFACClAgAAzAUAIKYCAADQBQAgqwIAAE0AIAcdAADJBQAgHgAAzgUAIKUCAADKBQAgpgIAAM0FACCpAgAAGwAgqgIAABsAIKsCAADZAQAgAx0AAMsFACClAgAAzAUAIKsCAABNACADHQAAyQUAIKUCAADKBQAgqwIAANkBACAAAAAAAAGoAgAAAPYBAgKoAgEAAAAEsgIBAAAABQKoAgEAAAAEsgIBAAAABQGoAgAAAP8BAgWoAggAAAABrgIIAAAAAa8CCAAAAAGwAggAAAABsQIIAAAAAQsdAACUBAAwHgAAmQQAMKUCAACVBAAwpgIAAJYEADCnAgAAlwQAIKgCAACYBAAwqQIAAJgEADCqAgAAmAQAMKsCAACYBAAwrAIAAJoEADCtAgAAmwQAMAsdAACIBAAwHgAAjQQAMKUCAACJBAAwpgIAAIoEADCnAgAAiwQAIKgCAACMBAAwqQIAAIwEADCqAgAAjAQAMKsCAACMBAAwrAIAAI4EADCtAgAAjwQAMAsdAAD8AwAwHgAAgQQAMKUCAAD9AwAwpgIAAP4DADCnAgAA_wMAIKgCAACABAAwqQIAAIAEADCqAgAAgAQAMKsCAACABAAwrAIAAIIEADCtAgAAgwQAMAwDAADtAwAgzAEBAAAAAc0BAQAAAAHPAUAAAAAB4AEAAADpAQLhAUAAAAAB5QEIAAAAAeYBAQAAAAHnAQEAAAAB6gEAAADqAQLrAQEAAAAB7AGAAAAAAQIAAAAZACAdAACHBAAgAwAAABkAIB0AAIcEACAeAACGBAAgARYAAMgFADARAwAAiAMAIAcAAJEDACDJAQAAjAMAMMoBAAAXABDLAQAAjAMAMMwBAQAAAAHNAQEA4gIAIc4BAQDlAgAhzwFAAOgCACHgAQAAjgPpASLhAUAA6AIAIeUBCACNAwAh5gEBAAAAAecBAQAAAAHqAQAAjwPqASLrAQEA5QIAIewBAACQAwAgAgAAABkAIBYAAIYEACACAAAAhAQAIBYAAIUEACAPyQEAAIMEADDKAQAAhAQAEMsBAACDBAAwzAEBAOICACHNAQEA4gIAIc4BAQDlAgAhzwFAAOgCACHgAQAAjgPpASLhAUAA6AIAIeUBCACNAwAh5gEBAOICACHnAQEA5QIAIeoBAACPA-oBIusBAQDlAgAh7AEAAJADACAPyQEAAIMEADDKAQAAhAQAEMsBAACDBAAwzAEBAOICACHNAQEA4gIAIc4BAQDlAgAhzwFAAOgCACHgAQAAjgPpASLhAUAA6AIAIeUBCACNAwAh5gEBAOICACHnAQEA5QIAIeoBAACPA-oBIusBAQDlAgAh7AEAAJADACALzAEBAJ4DACHNAQEAngMAIc8BQACfAwAh4AEAAOkD6QEi4QFAAJ8DACHlAQgA6AMAIeYBAQCeAwAh5wEBALsDACHqAQAA6gPqASLrAQEAuwMAIewBgAAAAAEMAwAA6wMAIMwBAQCeAwAhzQEBAJ4DACHPAUAAnwMAIeABAADpA-kBIuEBQACfAwAh5QEIAOgDACHmAQEAngMAIecBAQC7AwAh6gEAAOoD6gEi6wEBALsDACHsAYAAAAABDAMAAO0DACDMAQEAAAABzQEBAAAAAc8BQAAAAAHgAQAAAOkBAuEBQAAAAAHlAQgAAAAB5gEBAAAAAecBAQAAAAHqAQAAAOoBAusBAQAAAAHsAYAAAAABBAMAAKIDACDMAQEAAAABzQEBAAAAAc8BQAAAAAECAAAAFQAgHQAAkwQAIAMAAAAVACAdAACTBAAgHgAAkgQAIAEWAADHBQAwCgMAAIgDACAHAACUAwAgyQEAAJMDADDKAQAAEwAQywEAAJMDADDMAQEAAAABzQEBAOICACHOAQEA4gIAIc8BQADoAgAhogIAAJIDACACAAAAFQAgFgAAkgQAIAIAAACQBAAgFgAAkQQAIAfJAQAAjwQAMMoBAACQBAAQywEAAI8EADDMAQEA4gIAIc0BAQDiAgAhzgEBAOICACHPAUAA6AIAIQfJAQAAjwQAMMoBAACQBAAQywEAAI8EADDMAQEA4gIAIc0BAQDiAgAhzgEBAOICACHPAUAA6AIAIQPMAQEAngMAIc0BAQCeAwAhzwFAAJ8DACEEAwAAoAMAIMwBAQCeAwAhzQEBAJ4DACHPAUAAnwMAIQQDAACiAwAgzAEBAAAAAc0BAQAAAAHPAUAAAAABDAMAAN4DACAMAADgAwAgDQAA4QMAIMwBAQAAAAHNAQEAAAABzwFAAAAAAdsBAgAAAAHcAQEAAAAB3QEgAAAAAd4BAADdAwAg4AEAAADgAQLhAUAAAAABAgAAABEAIB0AAJ8EACADAAAAEQAgHQAAnwQAIB4AAJ4EACABFgAAxgUAMBEDAACIAwAgBwAAlAMAIAwAAIQDACANAACDAwAgyQEAAJUDADDKAQAADwAQywEAAJUDADDMAQEAAAABzQEBAOICACHOAQEA4gIAIc8BQADoAgAh2wECAOQCACHcAQEA4gIAId0BIAD9AgAh3gEAAMACACDgAQAAlgPgASLhAUAA6AIAIQIAAAARACAWAACeBAAgAgAAAJwEACAWAACdBAAgDckBAACbBAAwygEAAJwEABDLAQAAmwQAMMwBAQDiAgAhzQEBAOICACHOAQEA4gIAIc8BQADoAgAh2wECAOQCACHcAQEA4gIAId0BIAD9AgAh3gEAAMACACDgAQAAlgPgASLhAUAA6AIAIQ3JAQAAmwQAMMoBAACcBAAQywEAAJsEADDMAQEA4gIAIc0BAQDiAgAhzgEBAOICACHPAUAA6AIAIdsBAgDkAgAh3AEBAOICACHdASAA_QIAId4BAADAAgAg4AEAAJYD4AEi4QFAAOgCACEJzAEBAJ4DACHNAQEAngMAIc8BQACfAwAh2wECAKkDACHcAQEAngMAId0BIACqAwAh3gEAAKsDACDgAQAArAPgASLhAUAAnwMAIQwDAACtAwAgDAAArwMAIA0AALADACDMAQEAngMAIc0BAQCeAwAhzwFAAJ8DACHbAQIAqQMAIdwBAQCeAwAh3QEgAKoDACHeAQAAqwMAIOABAACsA-ABIuEBQACfAwAhDAMAAN4DACAMAADgAwAgDQAA4QMAIMwBAQAAAAHNAQEAAAABzwFAAAAAAdsBAgAAAAHcAQEAAAAB3QEgAAAAAd4BAADdAwAg4AEAAADgAQLhAUAAAAABAagCAQAAAAQBqAIBAAAABAQdAACUBAAwpQIAAJUEADCnAgAAlwQAIKsCAACYBAAwBB0AAIgEADClAgAAiQQAMKcCAACLBAAgqwIAAIwEADAEHQAA_AMAMKUCAAD9AwAwpwIAAP8DACCrAgAAgAQAMAAAAAAAAAUdAADBBQAgHgAAxAUAIKUCAADCBQAgpgIAAMMFACCrAgAAEQAgAx0AAMEFACClAgAAwgUAIKsCAAARACAAAAAAAAAAAAABqAJAAAAAAQUdAAC8BQAgHgAAvwUAIKUCAAC9BQAgpgIAAL4FACCrAgAATQAgAx0AALwFACClAgAAvQUAIKsCAABNACAAAAAFHQAAtwUAIB4AALoFACClAgAAuAUAIKYCAAC5BQAgqwIAAE0AIAMdAAC3BQAgpQIAALgFACCrAgAATQAgAAAAAagCAAAAmQICAagCAAAAmwICCx0AAIkFADAeAACOBQAwpQIAAIoFADCmAgAAiwUAMKcCAACMBQAgqAIAAI0FADCpAgAAjQUAMKoCAACNBQAwqwIAAI0FADCsAgAAjwUAMK0CAACQBQAwCx0AAP0EADAeAACCBQAwpQIAAP4EADCmAgAA_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_AQAIAMAAAANACAdAAD8BAAgHgAA-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-wEBAAAAAfwBAQAAAAH9AQEAAAAB_wEAAAD_AQKAAggAAAABAgAAANkBACAdAADJBQAgEwQAAJUFACAFAACWBQAgBgAAmQUAIAgAAJoFACAMAACYBQAgDQAAlwUAIBAAAJsFACDMAQEAAAABzwFAAAAAAeABAAAAmwIC4QFAAAAAAZUCAQAAAAGWAgEAAAABlwIgAAAAAZkCAAAAmQICmwIgAAAAAZwCIAAAAAGdAkAAAAABngIBAAAAAQIAAABNACAdAADLBQAgAwAAABsAIB0AAMkFACAeAADPBQAgEwAAABsAIAYAAPkDACAIAAD6AwAgFgAAzwUAIMwBAQCeAwAhzwFAAJ8DACHhAUAAnwMAIfMBAQCeAwAh9AEBAJ4DACH2AQAA9AP2ASL3AQIAqQMAIfgBAQCeAwAh-QEAAPUDACD6AQAA9gMAIPsBAQCeAwAh_AEBALsDACH9AQEAngMAIf8BAAD3A_8BIoACCAD4AwAhEQYAAPkDACAIAAD6AwAgzAEBAJ4DACHPAUAAnwMAIeEBQACfAwAh8wEBAJ4DACH0AQEAngMAIfYBAAD0A_YBIvcBAgCpAwAh-AEBAJ4DACH5AQAA9QMAIPoBAAD2AwAg-wEBAJ4DACH8AQEAuwMAIf0BAQCeAwAh_wEAAPcD_wEigAIIAPgDACEDAAAAUAAgHQAAywUAIB4AANIFACAVAAAAUAAgBAAAwwQAIAUAAMQEACAGAADHBAAgCAAAyAQAIAwAAMYEACANAADFBAAgEAAAyQQAIBYAANIFACDMAQEAngMAIc8BQACfAwAh4AEAAMIEmwIi4QFAAJ8DACGVAgEAngMAIZYCAQCeAwAhlwIgAKoDACGZAgAAwQSZAiKbAiAAqgMAIZwCIACqAwAhnQJAALYEACGeAgEAuwMAIRMEAADDBAAgBQAAxAQAIAYAAMcEACAIAADIBAAgDAAAxgQAIA0AAMUEACAQAADJBAAgzAEBAJ4DACHPAUAAnwMAIeABAADCBJsCIuEBQACfAwAhlQIBAJ4DACGWAgEAngMAIZcCIACqAwAhmQIAAMEEmQIimwIgAKoDACGcAiAAqgMAIZ0CQAC2BAAhngIBALsDACERCAAAowQAIAkAAKQEACDMAQEAAAABzwFAAAAAAeEBQAAAAAHzAQEAAAAB9AEBAAAAAfYBAAAA9gEC9wECAAAAAfgBAQAAAAH5AQAAoAQAIPoBAAChBAAg-wEBAAAAAfwBAQAAAAH9AQEAAAAB_wEAAAD_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-gEAAPYDACD7AQEAngMAIfwBAQC7AwAh_QEBAJ4DACH_AQAA9wP_ASKAAggA-AMAIREIAAD6AwAgCQAA-wMAIMwBAQCeAwAhzwFAAJ8DACHhAUAAnwMAIfMBAQCeAwAh9AEBAJ4DACH2AQAA9AP2ASL3AQIAqQMAIfgBAQCeAwAh-QEAAPUDACD6AQAA9gMAIPsBAQCeAwAh_AEBALsDACH9AQEAngMAIf8BAAD3A_8BIoACCAD4AwAhAwAAAFAAIB0AANUFACAeAADzBQAgFQAAAFAAIAQAAMMEACAFAADEBAAgCAAAyAQAIAkAAMoEACAMAADGBAAgDQAAxQQAIBAAAMkEACAWAADzBQAgzAEBAJ4DACHPAUAAnwMAIeABAADCBJsCIuEBQACfAwAhlQIBAJ4DACGWAgEAngMAIZcCIACqAwAhmQIAAMEEmQIimwIgAKoDACGcAiAAqgMAIZ0CQAC2BAAhngIBALsDACETBAAAwwQAIAUAAMQEACAIAADIBAAgCQAAygQAIAwAAMYEACANAADFBAAgEAAAyQQAIMwBAQCeAwAhzwFAAJ8DACHgAQAAwgSbAiLhAUAAnwMAIZUCAQCeAwAhlgIBAJ4DACGXAiAAqgMAIZkCAADBBJkCIpsCIACqAwAhnAIgAKoDACGdAkAAtgQAIZ4CAQC7AwAhEQYAAKIEACAJAACkBAAgzAEBAAAAAc8BQAAAAAHhAUAAAAAB8wEBAAAAAfQBAQAAAAH2AQAAAPYBAvcBAgAAAAH4AQEAAAAB-QEAAKAEACD6AQAAoQQAIPsBAQAAAAH8AQEAAAAB_QEBAAAAAf8BAAAA_wECgAIIAAAAAQIAAADZAQAgHQAA9AUAIBMEAACVBQAgBQAAlgUAIAYAAJkFACAJAACcBQAgDAAAmAUAIA0AAJcFACAQAACbBQAgzAEBAAAAAc8BQAAAAAHgAQAAAJsCAuEBQAAAAAGVAgEAAAABlgIBAAAAAZcCIAAAAAGZAgAAAJkCApsCIAAAAAGcAiAAAAABnQJAAAAAAZ4CAQAAAAECAAAATQAgHQAA9gUAIAMAAAAbACAdAAD0BQAgHgAA-gUAIBMAAAAbACAGAAD5AwAgCQAA-wMAIBYAAPoFACDMAQEAngMAIc8BQACfAwAh4QFAAJ8DACHzAQEAngMAIfQBAQCeAwAh9gEAAPQD9gEi9wECAKkDACH4AQEAngMAIfkBAAD1AwAg-gEAAPYDACD7AQEAngMAIfwBAQC7AwAh_QEBAJ4DACH_AQAA9wP_ASKAAggA-AMAIREGAAD5AwAgCQAA-wMAIMwBAQCeAwAhzwFAAJ8DACHhAUAAnwMAIfMBAQCeAwAh9AEBAJ4DACH2AQAA9AP2ASL3AQIAqQMAIfgBAQCeAwAh-QEAAPUDACD6AQAA9gMAIPsBAQCeAwAh_AEBALsDACH9AQEAngMAIf8BAAD3A_8BIoACCAD4AwAhAwAAAFAAIB0AAPYFACAeAAD9BQAgFQAAAFAAIAQAAMMEACAFAADEBAAgBgAAxwQAIAkAAMoEACAMAADGBAAgDQAAxQQAIBAAAMkEACAWAAD9BQAgzAEBAJ4DACHPAUAAnwMAIeABAADCBJsCIuEBQACfAwAhlQIBAJ4DACGWAgEAngMAIZcCIACqAwAhmQIAAMEEmQIimwIgAKoDACGcAiAAqgMAIZ0CQAC2BAAhngIBALsDACETBAAAwwQAIAUAAMQEACAGAADHBAAgCQAAygQAIAwAAMYEACANAADFBAAgEAAAyQQAIMwBAQCeAwAhzwFAAJ8DACHgAQAAwgSbAiLhAUAAnwMAIZUCAQCeAwAhlgIBAJ4DACGXAiAAqgMAIZkCAADBBJkCIpsCIACqAwAhnAIgAKoDACGdAkAAtgQAIZ4CAQC7AwAhAQMAAgkEBgMFCgQGKwYILAgJLwkKAA4MKgsNDgUQLgEBAwACAQMAAgUDAAIKAA0LAAYOJwUPKAUFAwACBwAHCgAMDCMLDSQFBAYSBggWCAkaCQoACgIDAAIHAAcCAwACBxwHAwYdAAgeAAkfAAIDAAILAAYCDCUADSYAAQ8pAAcEMAAFMQAGNAAINQAJNgAMMwANMgAAAQMAAgEDAAIDCgATIwAUJAAVAAAAAwoAEyMAFCQAFQAAAwoAGiMAGyQAHAAAAAMKABojABskABwBAwACAQMAAgMKACEjACIkACMAAAADCgAhIwAiJAAjAQMAAgEDAAIDCgAoIwApJAAqAAAAAwoAKCMAKSQAKgAAAAMKADAjADEkADIAAAADCgAwIwAxJAAyAwMAAgsABg61AQUDAwACCwAGDrsBBQMKADcjADgkADkAAAADCgA3IwA4JAA5AgMAAgsABgIDAAILAAYDCgA-IwA_JABAAAAAAwoAPiMAPyQAQAAABQoARSMASCQASZUBAEaWAQBHAAAAAAAFCgBFIwBIJABJlQEARpYBAEcCAwACB_sBBwIDAAIHgQIHBQoATiMAUSQAUpUBAE-WAQBQAAAAAAAFCgBOIwBRJABSlQEAT5YBAFACAwACBwAHAgMAAgcABwUKAFcjAFokAFuVAQBYlgEAWQAAAAAABQoAVyMAWiQAW5UBAFiWAQBZAgMAAgcABwIDAAIHAAcDCgBgIwBhJABiAAAAAwoAYCMAYSQAYhECARI3ARM5ARQ6ARU7ARc9ARg_DxlAEBpCARtEDxxFER9GASBHASFIDyVLEiZMFidOAihPAilSAipTAitUAixWAi1YDy5ZFy9bAjBdDzFeGDJfAjNgAjRhDzVkGTZlHTdmAzhnAzloAzppAztqAzxsAz1uDz5vHj9xA0BzD0F0H0J1A0N2A0R3D0V6IEZ7JEd8BEh9BEl-BEp_BEuAAQRMggEETYQBD06FASVPhwEEUIkBD1GKASZSiwEEU4wBBFSNAQ9VkAEnVpEBK1eTASxYlAEsWZcBLFqYASxbmQEsXJsBLF2dAQ9engEtX6ABLGCiAQ9howEuYqQBLGOlASxkpgEPZakBL2aqATNnqwEFaKwBBWmtAQVqrgEFa68BBWyxAQVtswEPbrQBNG-3AQVwuQEPcboBNXK8AQVzvQEFdL4BD3XBATZ2wgE6d8MBC3jEAQt5xQELesYBC3vHAQt8yQELfcsBD37MATt_zgELgAHQAQ-BAdEBPIIB0gELgwHTAQuEAdQBD4UB1wE9hgHYAUGHAdoBB4gB2wEHiQHdAQeKAd4BB4sB3wEHjAHhAQeNAeMBD44B5AFCjwHmAQeQAegBD5EB6QFDkgHqAQeTAesBB5QB7AEPlwHvAUSYAfABSpkB8QEJmgHyAQmbAfMBCZwB9AEJnQH1AQmeAfcBCZ8B-QEPoAH6AUuhAf0BCaIB_wEPowGAAkykAYICCaUBgwIJpgGEAg-nAYcCTagBiAJTqQGJAgaqAYoCBqsBiwIGrAGMAgatAY0CBq4BjwIGrwGRAg-wAZICVLEBlAIGsgGWAg-zAZcCVbQBmAIGtQGZAga2AZoCD7cBnQJWuAGeAly5AZ8CCLoBoAIIuwGhAgi8AaICCL0BowIIvgGlAgi_AacCD8ABqAJdwQGqAgjCAawCD8MBrQJexAGuAgjFAa8CCMYBsAIPxwGzAl_IAbQCYw"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AdminScalarFieldEnum: () => AdminScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CommentScalarFieldEnum: () => CommentScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  LikeScalarFieldEnum: () => LikeScalarFieldEnum,
  MediaScalarFieldEnum: () => MediaScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  WatchlistScalarFieldEnum: () => WatchlistScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.6.0",
  engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Admin: "Admin",
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Comment: "Comment",
  Like: "Like",
  Media: "Media",
  Payment: "Payment",
  Review: "Review",
  Watchlist: "Watchlist"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AdminScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  profilePhoto: "profilePhoto",
  contactNumber: "contactNumber",
  isDeleted: "isDeleted",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  deletedAt: "deletedAt",
  userId: "userId"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  role: "role",
  status: "status",
  needPasswordChange: "needPasswordChange",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CommentScalarFieldEnum = {
  id: "id",
  content: "content",
  userId: "userId",
  reviewId: "reviewId",
  parentId: "parentId",
  createdAt: "createdAt"
};
var LikeScalarFieldEnum = {
  id: "id",
  userId: "userId",
  reviewId: "reviewId",
  createdAt: "createdAt"
};
var MediaScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  type: "type",
  releaseYear: "releaseYear",
  director: "director",
  cast: "cast",
  genres: "genres",
  thumbnail: "thumbnail",
  trailerUrl: "trailerUrl",
  streamingUrl: "streamingUrl",
  pricingType: "pricingType",
  price: "price",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  amount: "amount",
  transactionId: "transactionId",
  stripeEventId: "stripeEventId",
  status: "status",
  paymentType: "paymentType",
  invoiceUrl: "invoiceUrl",
  paymentGatewayData: "paymentGatewayData",
  userId: "userId",
  mediaId: "mediaId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  content: "content",
  spoiler: "spoiler",
  tags: "tags",
  status: "status",
  userId: "userId",
  mediaId: "mediaId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var WatchlistScalarFieldEnum = {
  id: "id",
  userId: "userId",
  mediaId: "mediaId",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED"
};
var ReviewStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};
var PaymentStatus = {
  PAID: "PAID",
  UNPAID: "UNPAID",
  FAILED: "FAILED"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/auth.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { bearer, emailOTP } from "better-auth/plugins";

// src/app/utils/email.ts
import ejs from "ejs";
import status2 from "http-status";
import nodemailer from "nodemailer";
import path2 from "path";
var transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER.SMTP_HOST,
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS
  },
  port: Number(envVars.EMAIL_SENDER.SMTP_PORT)
});
var sendEmail = async ({
  subject,
  templateData,
  templateName,
  to,
  attachments
}) => {
  try {
    const templatePath = path2.resolve(
      process.cwd(),
      `src/app/templates/${templateName}.ejs`
    );
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to,
      subject,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType
      }))
    });
    console.log(`Email sent to ${to} : ${info.messageId}`);
  } catch (error) {
    console.log("Email Sending Error", error.message);
    throw new AppError_default(status2.INTERNAL_SERVER_ERROR, "Failed to send email");
  }
};

// src/app/lib/auth.ts
var adapter = new PrismaPg({ connectionString: envVars.DATABASE_URL });
var prisma = new PrismaClient({ adapter });
var auth = betterAuth({
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      // callbackUrl: envVars.GOOGLE_CALLBACK_URL,
      mapProfileToUser: () => {
        return {
          role: Role.USER,
          status: UserStatus.ACTIVE,
          needPasswordChange: false,
          emailVerified: true,
          isDeleted: false,
          deletedAt: null
        };
      }
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER"
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "ACTIVE"
      },
      isDeleted: {
        type: "boolean",
        required: false,
        defaultValue: false
      },
      needPasswordChange: {
        type: "boolean",
        required: false,
        defaultValue: false
      }
    }
  },
  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (!user) {
            console.error(
              `User with email ${email} not found. Cannot send verification OTP.`
            );
            return;
          }
          if (user && user.role === Role.SUPER_ADMIN) {
            console.log(
              `User with email ${email} is a super admin. Skipping sending verification OTP.`
            );
            return;
          }
          if (user && !user.emailVerified) {
            sendEmail({
              to: email,
              subject: "Verify your email",
              templateName: "otp",
              templateData: {
                name: user.name,
                otp
              }
            });
          }
        } else if (type === "forget-password") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (user) {
            sendEmail({
              to: email,
              subject: "Password Reset OTP",
              templateName: "otp",
              templateData: {
                name: user.name,
                otp
              }
            });
          }
        }
      },
      expiresIn: 2 * 60,
      // 2 minutes in seconds
      otpLength: 6
    })
  ],
  session: {
    expiresIn: 60 * 60 * 60 * 24,
    // 1 day in seconds
    updateAge: 60 * 60 * 60 * 24,
    // 1 day in seconds
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24
      // 1 day in seconds
    }
  },
  redirectURLs: {
    signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:5000",
    envVars.FRONTEND_URL
  ],
  advanced: {
    // disableCSRFCheck: true,
    useSecureCookies: false,
    cookies: {
      state: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/"
        }
      },
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/"
        }
      }
    }
  }
});

// src/app/middleware/globalErrorHandler.ts
import status6 from "http-status";
import z from "zod";

// src/app/errorHelpers/handlePrismaErrors.ts
import status3 from "http-status";
var getStatusCodeFromPrismaError = (errorCode) => {
  if (errorCode === "P2002") {
    return status3.CONFLICT;
  }
  if (["P2025", "P2001", "P2015", "P2018"].includes(errorCode)) {
    return status3.NOT_FOUND;
  }
  if (["P1000", "P6002"].includes(errorCode)) {
    return status3.UNAUTHORIZED;
  }
  if (["P1010", "P6010"].includes(errorCode)) {
    return status3.FORBIDDEN;
  }
  if (errorCode === "P6003") {
    return status3.PAYMENT_REQUIRED;
  }
  if (["P1008", "P2004", "P6004"].includes(errorCode)) {
    return status3.GATEWAY_TIMEOUT;
  }
  if (errorCode === "P5011") {
    return status3.TOO_MANY_REQUESTS;
  }
  if (errorCode === "P6009") {
    return 413;
  }
  if (errorCode.startsWith("P1") || ["P2024", "P2037", "P6008"].includes(errorCode)) {
    return status3.SERVICE_UNAVAILABLE;
  }
  if (errorCode.startsWith("P2")) {
    return status3.BAD_REQUEST;
  }
  if (errorCode.startsWith("P3") || errorCode.startsWith("P4")) {
    return status3.INTERNAL_SERVER_ERROR;
  }
  return status3.INTERNAL_SERVER_ERROR;
};
var formatErrorMeta = (meta) => {
  if (!meta) return "";
  const parts = [];
  if (meta.target) {
    parts.push(`Field(s): ${String(meta.target)}`);
  }
  if (meta.field_name) {
    parts.push(`Field: ${String(meta.field_name)}`);
  }
  if (meta.column_name) {
    parts.push(`Column: ${String(meta.column_name)}`);
  }
  if (meta.table) {
    parts.push(`Table: ${String(meta.table)}`);
  }
  if (meta.model_name) {
    parts.push(`Model: ${String(meta.model_name)}`);
  }
  if (meta.relation_name) {
    parts.push(`Relation: ${String(meta.relation_name)}`);
  }
  if (meta.constraint) {
    parts.push(`Constraint: ${String(meta.constraint)}`);
  }
  if (meta.database_error) {
    parts.push(`Database Error: ${String(meta.database_error)}`);
  }
  return parts.length > 0 ? parts.join(" |") : "";
};
var handlePrismaClientKnownRequestError = (error) => {
  const statusCode = getStatusCodeFromPrismaError(error.code);
  const metaInfo = formatErrorMeta(error.meta);
  let cleanMessage = error.message;
  cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
  const lines = cleanMessage.split("\n").filter((line) => line.trim());
  const mainMessage = lines[0] || "An error occurred with the database operation.";
  const errorSources = [
    {
      path: error.code,
      message: metaInfo ? `${mainMessage} | ${metaInfo}` : mainMessage
    }
  ];
  if (error.meta?.cause) {
    errorSources.push({
      path: "cause",
      message: String(error.meta.cause)
    });
  }
  return {
    success: false,
    statusCode,
    message: `Prisma Client Known Request Error: ${mainMessage}`,
    errorSources
  };
};
var handlePrismaClientUnknownError = (error) => {
  let cleanMessage = error.message;
  cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
  const lines = cleanMessage.split("\n").filter((line) => line.trim());
  const mainMessage = lines[0] || "An unknown error occurred with the database operation.";
  const errorSources = [
    {
      path: "Unknown Prisma Error",
      message: mainMessage
    }
  ];
  return {
    success: false,
    statusCode: status3.INTERNAL_SERVER_ERROR,
    message: `Prisma Client Unknown Request Error: ${mainMessage}`,
    errorSources
  };
};
var handlePrismaClientValidationError = (error) => {
  let cleanMessage = error.message;
  cleanMessage = cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
  const lines = cleanMessage.split("\n").filter((line) => line.trim());
  const errorSources = [];
  const fieldMatch = cleanMessage.match(/Argument `(\w+)`/i);
  const fieldName = fieldMatch ? fieldMatch[1] : "Unknown Field";
  const mainMessage = lines.find(
    (line) => !line.includes("Argument") && !line.includes("\u2192") && line.length > 10
  ) || lines[0] || "Invalid query parameters provided to the database operation.";
  errorSources.push({
    path: fieldName,
    message: mainMessage
  });
  return {
    success: false,
    statusCode: status3.BAD_REQUEST,
    message: `Prisma Client Validation Error: ${mainMessage}`,
    errorSources
  };
};
var handlerPrismaClientInitializationError = (error) => {
  const statusCode = error.errorCode ? getStatusCodeFromPrismaError(error.errorCode) : status3.SERVICE_UNAVAILABLE;
  const cleanMessage = error.message;
  cleanMessage.replace(/Invalid `.*?` invocation:?\s*/i, "");
  const lines = cleanMessage.split("\n").filter((line) => line.trim());
  const mainMessage = lines[0] || "An error occurred while initializing the Prisma Client.";
  const errorSources = [
    {
      path: error.errorCode || "Initialization Error",
      message: mainMessage
    }
  ];
  return {
    success: false,
    statusCode,
    message: `Prisma Client Initialization Error: ${mainMessage}`,
    errorSources
  };
};
var handlerPrismaClientRustPanicError = () => {
  const errorSources = [{
    path: "Rust Engine Crashed",
    message: "The database engine encountered a fatal error and crashed. This is usually due to an internal bug in the Prisma engine or an unexpected edge case in the database operation. Please check the Prisma logs for more details and consider reporting this issue to the Prisma team if it persists."
  }];
  return {
    success: false,
    statusCode: status3.INTERNAL_SERVER_ERROR,
    message: "Prisma Client Rust Panic Error: The database engine crashed due to a fatal error.",
    errorSources
  };
};

// src/app/errorHelpers/handleZodError.ts
import status4 from "http-status";
var handleZodError = (err) => {
  const statusCode = status4.BAD_REQUEST;
  const message = "Zod Validation Error";
  const errorSources = [];
  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join(" => "),
      message: issue.message
    });
  });
  return {
    success: false,
    message,
    errorSources,
    statusCode
  };
};

// src/app/config/cloudinary.config.ts
import { v2 as cloudinary } from "cloudinary";
import status5 from "http-status";
cloudinary.config({
  cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET
});
var uploadFileToCloudinary = async (buffer, fileName) => {
  if (!buffer || !fileName) {
    throw new AppError_default(status5.BAD_REQUEST, "File buffer and file name are required for upload");
  }
  const extension = fileName.split(".").pop()?.toLocaleLowerCase();
  const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
  const uniqueName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileNameWithoutExtension;
  const folder = extension === "pdf" ? "pdfs" : "images";
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        public_id: uniqueName,
        folder: `playtube/${folder}`,
        access_mode: "public"
      },
      (error, result) => {
        if (error) {
          return reject(new AppError_default(status5.INTERNAL_SERVER_ERROR, "Failed to upload file to Cloudinary"));
        }
        resolve(result);
      }
    ).end(buffer);
  });
};
var deleteFileFromCloudinary = async (url) => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
    const match = url.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(
        publicId,
        {
          resource_type: "image"
        }
      );
      console.log(`File ${publicId} deleted from cloudinary`);
    }
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw new AppError_default(status5.INTERNAL_SERVER_ERROR, "Failed to delete file from Cloudinary");
  }
};
var cloudinaryUpload = cloudinary;

// src/app/utils/deleteUploadedFilesFromGlobalErrorHandler.ts
var deleteUploadedFilesFromGlobalErrorHandler = async (req) => {
  try {
    const filesToDelete = [];
    if (req.file && req.file?.path) {
      filesToDelete.push(req.file.path);
    } else if (req.files && typeof req.files === "object" && !Array.isArray(req.files)) {
      Object.values(req.files).forEach((fileArray) => {
        if (Array.isArray(fileArray)) {
          fileArray.forEach((file) => {
            if (file.path) {
              filesToDelete.push(file.path);
            }
          });
        }
      });
    } else if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.path) {
          filesToDelete.push(file.path);
        }
      });
    }
    if (filesToDelete.length > 0) {
      await Promise.all(
        filesToDelete.map((url) => deleteFileFromCloudinary(url))
      );
      console.log(
        `
Deleted ${filesToDelete.length} uploaded file(s) from Cloudinary due to an error during request processing.
`
      );
    }
  } catch (error) {
    console.error(
      "Error deleting uploaded files from Global Error Handler",
      error
    );
  }
};

// src/app/middleware/globalErrorHandler.ts
var globalErrorHandler = async (err, req, res, next) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error from Global Error Handler", err);
  }
  await deleteUploadedFilesFromGlobalErrorHandler(req);
  let errorSources = [];
  let statusCode = status6.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
  let stack = void 0;
  if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    const simplifiedError = handlePrismaClientKnownRequestError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    const simplifiedError = handlePrismaClientUnknownError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    const simplifiedError = handlePrismaClientValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    const simplifiedError = handlerPrismaClientRustPanicError();
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    const simplifiedError = handlerPrismaClientInitializationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof AppError_default) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ];
  } else if (err instanceof Error) {
    statusCode = status6.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message
      }
    ];
  }
  const errorResponse = {
    success: false,
    message,
    errorSources,
    error: envVars.NODE_ENV === "development" ? err : void 0,
    stack: envVars.NODE_ENV === "development" ? stack : void 0
  };
  res.status(statusCode).json(errorResponse);
};

// src/app/middleware/notFound.ts
import status7 from "http-status";
var notFound = (req, res) => {
  res.status(status7.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

// src/app/module/payment/payment.controller.ts
import status8 from "http-status";

// src/app/config/stripe.config.ts
import Stripe from "stripe";
var stripe = new Stripe(envVars.STRIPE.STRIPE_SECRET_KEY);

// src/app/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

// src/app/shared/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { httpStatusCode, success, message, data, meta } = responseData;
  res.status(httpStatusCode).json({
    success,
    message,
    data,
    meta
  });
};

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg as PrismaPg2 } from "@prisma/adapter-pg";
var connectionString = envVars.DATABASE_URL;
var adapter2 = new PrismaPg2({ connectionString });
var prisma2 = new PrismaClient({ adapter: adapter2 });

// src/app/module/payment/payment.utils.ts
import PDFDocument from "pdfkit";
var generateInvoicePdf = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50
      });
      const chunks = [];
      doc.on("data", (chunk) => {
        chunks.push(chunk);
      });
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      doc.on("error", (error) => {
        reject(error);
      });
      doc.fontSize(24).font("Helvetica-Bold").text("INVOICE", {
        align: "center"
      });
      doc.moveDown(0.5);
      doc.fontSize(10).font("Helvetica").text("PlayTube Services", {
        align: "center"
      });
      doc.text("Your Entertainment, Our Mission", { align: "center" });
      doc.moveDown(1);
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1);
      doc.fontSize(11).font("Helvetica-Bold").text("Invoice Information");
      doc.fontSize(10).font("Helvetica").text(`Invoice ID: ${data.invoiceId}`).text(`Payment Date: ${new Date(data.paymentDate).toLocaleDateString()}`).text(`Transaction ID: ${data.transactionId}`);
      doc.moveDown(0.8);
      doc.fontSize(11).font("Helvetica-Bold").text("User Information");
      doc.fontSize(10).font("Helvetica").text(`Name: ${data.userName}`).text(`Email: ${data.userEmail}`);
      doc.moveDown(0.8);
      if (data.mediaTitle) {
        doc.fontSize(11).font("Helvetica-Bold").text("Purchase Details");
        doc.fontSize(10).font("Helvetica").text(`Item: ${data.mediaTitle}`);
        doc.moveDown(0.8);
      }
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1);
      const tableTop = doc.y;
      const col1X = 50;
      const col2X = 450;
      doc.fontSize(11).font("Helvetica-Bold").text("Payment Summary", col1X, tableTop);
      doc.moveDown(0.8);
      const headerY = doc.y;
      doc.fontSize(10).font("Helvetica-Bold");
      doc.text("Description", col1X, headerY);
      doc.text("Amount", col2X, headerY, { align: "right" });
      doc.moveTo(col1X, doc.y).lineTo(col2X + 80, doc.y).stroke();
      doc.moveDown(0.5);
      const amountY = doc.y;
      doc.fontSize(10).font("Helvetica");
      doc.text(data.mediaTitle ? "Media Purchase" : "Subscription Fee", col1X, amountY);
      doc.text(`${data.amount.toFixed(2)} USD`, col2X, amountY, { align: "right" });
      doc.moveDown(0.8);
      const totalY = doc.y;
      doc.fontSize(11).font("Helvetica-Bold");
      doc.text("Total Amount", col1X, totalY);
      doc.text(`${data.amount.toFixed(2)} USD`, col2X, totalY, { align: "right" });
      doc.moveTo(col1X, doc.y).lineTo(col2X + 80, doc.y).stroke();
      doc.moveDown(1.5);
      doc.fontSize(9).font("Helvetica").text(
        "Thank you for choosing PlayTube. This is an electronically generated invoice.",
        {
          align: "center"
        }
      );
      doc.text("If you have any questions, please contact us at support@playtube.com", {
        align: "center"
      });
      doc.text("Payment processed securely through Stripe", {
        align: "center"
      });
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// src/app/module/payment/payment.service.ts
var createCheckoutSession = async (payload) => {
  const { userId, mediaId, amount, paymentType } = payload;
  const user = await prisma2.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw new Error("User not found");
  }
  let media = null;
  if (mediaId) {
    media = await prisma2.media.findUnique({
      where: { id: mediaId }
    });
    if (!media) throw new Error("Media not found");
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: media ? `Purchase: ${media.title}` : "Subscription",
            description: media ? media.description : "PlayTube Premium Subscription"
          },
          unit_amount: Math.round(amount * 100)
        },
        quantity: 1
      }
    ],
    success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    metadata: {
      userId,
      mediaId: mediaId || "",
      paymentType
    }
  });
  return session;
};
var handleStripeWebhookEvent = async (event) => {
  console.log(` Webhook received: ${event.type} (ID: ${event.id})`);
  const existingPayment = await prisma2.payment.findFirst({
    where: {
      stripeEventId: event.id
    }
  });
  if (existingPayment) {
    console.log(`Event ${event.id} already processed. Skipping`);
    return { message: `Event ${event.id} already processed. Skipping` };
  }
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log(" Checkout Session Completed Metadata:", session.metadata);
      const userId = session.metadata?.userId;
      const mediaId = session.metadata?.mediaId;
      const paymentType = session.metadata?.paymentType;
      if (!userId) {
        console.error(" Missing metadata in webhook event");
        return { message: "Missing metadata" };
      }
      const user = await prisma2.user.findUnique({
        where: { id: userId }
      });
      if (!user) {
        console.error(` User ${userId} not found.`);
        return { message: "User not found" };
      }
      let media = null;
      if (mediaId) {
        media = await prisma2.media.findUnique({
          where: { id: mediaId }
        });
      }
      let pdfBuffer = null;
      let invoiceUrl = null;
      const transactionId = session.payment_intent || "N/A";
      if (session.payment_status === "paid") {
        try {
          pdfBuffer = await generateInvoicePdf({
            invoiceId: `INV-${Date.now()}`,
            userName: user.name,
            userEmail: user.email,
            mediaTitle: media?.title,
            amount: (session.amount_total ?? 0) / 100,
            transactionId,
            paymentDate: (/* @__PURE__ */ new Date()).toISOString()
          });
          const cloudinaryResponse = await uploadFileToCloudinary(
            pdfBuffer,
            `invoice-${transactionId}.pdf`
          );
          invoiceUrl = cloudinaryResponse?.secure_url;
          console.log(` Invoice PDF generated and uploaded`);
        } catch (pdfError) {
          console.error(" Error generating/uploading invoice PDF:", pdfError);
        }
      }
      console.log(" Saving payment record to database...");
      const paymentRecord = await prisma2.payment.create({
        data: {
          amount: (session.amount_total ?? 0) / 100,
          transactionId,
          stripeEventId: event.id,
          status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,
          paymentType,
          invoiceUrl,
          paymentGatewayData: session,
          userId,
          mediaId: mediaId || null
        }
      });
      console.log(" Payment record saved:", paymentRecord.id);
      if (session.payment_status === "paid") {
        try {
          await sendEmail({
            to: user.email,
            subject: `Payment Confirmation & Invoice - PlayTube`,
            templateName: "invoice",
            templateData: {
              userName: user.name,
              invoiceId: `INV-${Date.now()}`,
              transactionId,
              paymentDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
              mediaTitle: media?.title,
              amount: (session.amount_total ?? 0) / 100,
              invoiceUrl,
              frontendUrl: envVars.FRONTEND_URL
            },
            attachments: pdfBuffer ? [
              {
                filename: `Invoice-${transactionId}.pdf`,
                content: pdfBuffer,
                contentType: "application/pdf"
              }
            ] : []
          });
          console.log(` Invoice email sent to ${user.email}`);
        } catch (emailError) {
          console.error(" Error sending invoice email:", emailError);
        }
      }
      console.log(` Payment ${session.payment_status} for user ${userId}`);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return { message: `Webhook Event ${event.id} processed successfully` };
};
var getMyPayments = async (userId) => {
  const result = await prisma2.payment.findMany({
    where: { userId },
    select: {
      id: true,
      amount: true,
      status: true,
      paymentType: true,
      invoiceUrl: true,
      transactionId: true,
      mediaId: true,
      createdAt: true,
      media: {
        select: {
          id: true,
          title: true,
          thumbnail: true,
          streamingUrl: true,
          trailerUrl: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getAllPayments = async () => {
  const result = await prisma2.payment.findMany({
    select: {
      id: true,
      amount: true,
      status: true,
      paymentType: true,
      invoiceUrl: true,
      transactionId: true,
      mediaId: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      media: {
        select: {
          id: true,
          title: true,
          thumbnail: true,
          streamingUrl: true,
          trailerUrl: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var PaymentService = {
  createCheckoutSession,
  handleStripeWebhookEvent,
  getMyPayments,
  getAllPayments
};

// src/app/module/payment/payment.controller.ts
var createCheckoutSession2 = catchAsync(async (req, res) => {
  const result = await PaymentService.createCheckoutSession(req.body);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Checkout session created successfully",
    data: result
  });
});
var handleStripeWebhookEvent2 = catchAsync(async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const webhookSecret = envVars.STRIPE.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    console.error("Missing Stripe signature or webhook secret");
    return res.status(status8.BAD_REQUEST).json({ message: "Missing Stripe signature or webhook secret" });
  }
  const signatureString = Array.isArray(signature) ? signature[0] : signature;
  if (!signatureString) {
    return res.status(status8.BAD_REQUEST).json({ message: "Invalid Stripe signature" });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signatureString,
      webhookSecret
    );
  } catch (error) {
    console.error("Error processing Stripe webhook:", error);
    return res.status(status8.BAD_REQUEST).json({ message: `Webhook Error: ${error.message}` });
  }
  const result = await PaymentService.handleStripeWebhookEvent(event);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Stripe webhook event processed successfully",
    data: result
  });
});
var getMyPayments2 = catchAsync(async (req, res) => {
  const user = req.user;
  const userId = user?.userId || req.params.userId;
  const result = await PaymentService.getMyPayments(userId);
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "Payment history fetched successfully",
    data: result
  });
});
var getAllPayments2 = catchAsync(async (req, res) => {
  const result = await PaymentService.getAllPayments();
  sendResponse(res, {
    httpStatusCode: status8.OK,
    success: true,
    message: "All payments fetched successfully",
    data: result
  });
});
var PaymentController = {
  createCheckoutSession: createCheckoutSession2,
  handleStripeWebhookEvent: handleStripeWebhookEvent2,
  getMyPayments: getMyPayments2,
  getAllPayments: getAllPayments2
};

// src/app/routes/index.ts
import { Router as Router9 } from "express";

// src/app/module/auth/auth.router.ts
import { Router } from "express";

// src/app/module/auth/auth.service.ts
import status9 from "http-status";

// src/app/utils/cookie.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};
var CookieUtils = {
  setCookie,
  getCookie,
  clearCookie
};

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, { expiresIn }) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};
var decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
var jwtUtils = {
  createToken,
  verifyToken,
  decodeToken
};

// src/app/utils/token.ts
var getAccessToken = (payload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN }
  );
  return accessToken;
};
var getRefreshToken = (payload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN }
  );
  return refreshToken;
};
var setAccessTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var setRefreshTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //7d
    maxAge: 60 * 60 * 24 * 1e3 * 7
  });
};
var setBetterAuthSessionCookie = (res, token) => {
  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    //1 day
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie
};

// src/app/module/auth/auth.service.ts
var registerUser = async (payload) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password
      //default values
      // needsPasswordChange: false,
      // role: Role.USER
    }
  });
  if (!data.user) {
    throw new AppError_default(status9.BAD_REQUEST, "Failed to register user");
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password
    }
  });
  if (data.user.status === UserStatus.BLOCKED) {
    throw new AppError_default(status9.FORBIDDEN, "User is blocked");
  }
  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new AppError_default(status9.NOT_FOUND, "User is deleted");
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    status: data.user.status,
    isDeleted: data.user.isDeleted,
    emailVerified: data.user.emailVerified
  });
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var getMe = async (user) => {
  const isUserExists = await prisma2.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUserExists) {
    throw new AppError_default(status9.NOT_FOUND, "User not found");
  }
  return isUserExists;
};
var getNewToken = async (refreshToken, sessionToken) => {
  if (!sessionToken) {
    throw new AppError_default(status9.UNAUTHORIZED, "Session token is missing");
  }
  const isSessionTokenExists = await prisma2.session.findUnique({
    where: {
      token: sessionToken
    },
    include: {
      user: true
    }
  });
  if (!isSessionTokenExists) {
    throw new AppError_default(status9.UNAUTHORIZED, "Invalid session token");
  }
  const verifiedRefreshToken = jwtUtils.verifyToken(
    refreshToken,
    envVars.REFRESH_TOKEN_SECRET
  );
  if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
    throw new AppError_default(status9.UNAUTHORIZED, "Invalid refresh token");
  }
  const data = verifiedRefreshToken.data;
  const newAccessToken = tokenUtils.getAccessToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified
  });
  const newRefreshToken = tokenUtils.getRefreshToken({
    userId: data.userId,
    role: data.role,
    name: data.name,
    email: data.email,
    status: data.status,
    isDeleted: data.isDeleted,
    emailVerified: data.emailVerified
  });
  const { token } = await prisma2.session.update({
    where: {
      token: sessionToken
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 60 * 24 * 1e3),
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token
  };
};
var changePassword = async (payload, sessionToken) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (!session) {
    throw new AppError_default(status9.UNAUTHORIZED, "Invalid session token");
  }
  const { currentPassword, newPassword } = payload;
  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (session.user.needPasswordChange) {
    await prisma2.user.update({
      where: {
        id: session.user.id
      },
      data: {
        needPasswordChange: false
      }
    });
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name,
    email: session.user.email,
    status: session.user.status,
    isDeleted: session.user.isDeleted,
    emailVerified: session.user.emailVerified
  });
  return {
    ...result,
    accessToken,
    refreshToken
  };
};
var logoutUser = async (sessionToken) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  return result;
};
var verifyEmail = async (email, otp) => {
  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp
    }
  });
  if (result.status && !result.user.emailVerified) {
    await prisma2.user.update({
      where: {
        email
      },
      data: {
        emailVerified: true
      }
    });
  }
};
var forgetPassword = async (email) => {
  const isUserExist = await prisma2.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError_default(status9.NOT_FOUND, "User not found");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError_default(status9.BAD_REQUEST, "Email not verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === UserStatus.DELETED) {
    throw new AppError_default(status9.NOT_FOUND, "User not found");
  }
  await auth.api.requestPasswordResetEmailOTP({
    body: {
      email
    }
  });
};
var resetPassword = async (email, otp, newPassword) => {
  const isUserExist = await prisma2.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError_default(status9.NOT_FOUND, "User not found");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError_default(status9.BAD_REQUEST, "Email not verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === UserStatus.DELETED) {
    throw new AppError_default(status9.NOT_FOUND, "User not found");
  }
  await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword
    }
  });
  if (isUserExist.needPasswordChange) {
    await prisma2.user.update({
      where: {
        id: isUserExist.id
      },
      data: {
        needPasswordChange: false
      }
    });
  }
  await prisma2.session.deleteMany({
    where: {
      userId: isUserExist.id
    }
  });
};
var googleLoginSuccess = async (session) => {
  const accessToken = tokenUtils.getAccessToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: session.user.id,
    role: session.user.role,
    name: session.user.name
  });
  return {
    accessToken,
    refreshToken
  };
};
var AuthService = {
  registerUser,
  loginUser,
  getMe,
  getNewToken,
  changePassword,
  logoutUser,
  googleLoginSuccess,
  verifyEmail,
  forgetPassword,
  resetPassword
};

// src/app/module/auth/auth.controller.ts
import status10 from "http-status";
var import_ms = __toESM(require_ms(), 1);
var registerUser2 = catchAsync(async (req, res) => {
  const maxAge = (0, import_ms.default)(envVars.ACCESS_TOKEN_EXPIRES_IN);
  console.log({ maxAge });
  const payload = req.body;
  console.log(payload);
  const result = await AuthService.registerUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status10.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    }
  });
});
var getMe2 = catchAsync(async (req, res) => {
  const user = req.user;
  console.log({ user });
  const result = await AuthService.getMe(user);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var getNewToken2 = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  if (!refreshToken) {
    throw new AppError_default(status10.UNAUTHORIZED, "Refresh token is missing");
  }
  const result = await AuthService.getNewToken(
    refreshToken,
    betterAuthSessionToken
  );
  const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, sessionToken);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken,
      sessionToken
    }
  });
});
var changePassword2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.changePassword(
    payload,
    betterAuthSessionToken
  );
  const { accessToken, refreshToken, token } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Password changed successfully",
    data: result
  });
});
var logoutUser2 = catchAsync(async (req, res) => {
  const betterAuthSessionToken = req.cookies["better-auth.session_token"];
  const result = await AuthService.logoutUser(betterAuthSessionToken);
  CookieUtils.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  CookieUtils.clearCookie(res, "refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  CookieUtils.clearCookie(res, "better-auth.session_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "User logged out successfully",
    data: result
  });
});
var verifyEmail2 = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  await AuthService.verifyEmail(email, otp);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Email verified successfully"
  });
});
var forgetPassword2 = catchAsync(async (req, res) => {
  const { email } = req.body;
  await AuthService.forgetPassword(email);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Password reset OTP sent to email successfully"
  });
});
var resetPassword2 = catchAsync(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  await AuthService.resetPassword(email, otp, newPassword);
  sendResponse(res, {
    httpStatusCode: status10.OK,
    success: true,
    message: "Password reset successfully"
  });
});
var googleLogin = catchAsync((req, res) => {
  const redirectPath = req.query.redirect || "/dashboard";
  const encodedRedirectPath = encodeURIComponent(redirectPath);
  const callbackURL = `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success?redirect=${encodedRedirectPath}`;
  res.render("googleRedirect", {
    callbackURL,
    betterAuthUrl: envVars.BETTER_AUTH_URL
  });
});
var googleLoginSuccess2 = catchAsync(async (req, res) => {
  const redirectPath = req.query.redirect || "/dashboard";
  const sessionToken = req.cookies["better-auth.session_token"];
  if (!sessionToken) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=oauth_failed`);
  }
  const session = await auth.api.getSession({
    headers: {
      Cookie: `better-auth.session_token=${sessionToken}`
    }
  });
  if (!session) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_session_found`);
  }
  if (session && !session.user) {
    return res.redirect(`${envVars.FRONTEND_URL}/login?error=no_user_found`);
  }
  const result = await AuthService.googleLoginSuccess(session);
  const { accessToken, refreshToken } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  const isValidRedirectPath = redirectPath.startsWith("/") && !redirectPath.startsWith("//");
  const finalRedirectPath = isValidRedirectPath ? redirectPath : "/dashboard";
  res.redirect(`${envVars.FRONTEND_URL}${finalRedirectPath}`);
});
var handleOAuthError = catchAsync((req, res) => {
  const error = req.query.error || "oauth_failed";
  res.redirect(`${envVars.FRONTEND_URL}/login?error=${error}`);
});
var AuthController = {
  registerUser: registerUser2,
  loginUser: loginUser2,
  getMe: getMe2,
  getNewToken: getNewToken2,
  changePassword: changePassword2,
  logoutUser: logoutUser2,
  googleLogin,
  googleLoginSuccess: googleLoginSuccess2,
  handleOAuthError,
  verifyEmail: verifyEmail2,
  forgetPassword: forgetPassword2,
  resetPassword: resetPassword2
};

// src/app/middleware/checkAuth.ts
import status11 from "http-status";
var checkAuth = (...authRoles) => async (req, res, next) => {
  try {
    const sessionToken = CookieUtils.getCookie(
      req,
      "better-auth.session_token"
    );
    if (!sessionToken) {
      throw new AppError_default(status11.UNAUTHORIZED, "Unauthorized access! No session token provided.");
    }
    if (sessionToken) {
      const sessionExists = await prisma2.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: /* @__PURE__ */ new Date()
          }
        },
        include: {
          user: true
        }
      });
      if (sessionExists && sessionExists.user) {
        const user = sessionExists.user;
        const now = /* @__PURE__ */ new Date();
        const expiresAt = new Date(sessionExists.expiresAt);
        const createdAt = new Date(sessionExists.createdAt);
        const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
        const timeRemaining = expiresAt.getTime() - now.getTime();
        const percentRemaining = timeRemaining / sessionLifeTime * 100;
        if (percentRemaining < 20) {
          res.setHeader("X-Session-Refresh", "true");
          res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
          res.setHeader("X-Time-Remaining", timeRemaining.toString());
          console.log("Session Expiring Soon!!");
        }
        if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
          throw new AppError_default(
            status11.UNAUTHORIZED,
            "Unauthorized access! User is not active."
          );
        }
        if (user.isDeleted) {
          throw new AppError_default(
            status11.UNAUTHORIZED,
            "Unauthorized access! User is deleted."
          );
        }
        if (authRoles.length > 0 && !authRoles.includes(user.role)) {
          throw new AppError_default(
            status11.FORBIDDEN,
            "Forbidden access! You do not have permission to access this resource."
          );
        }
        req.user = {
          userId: user.id,
          role: user.role,
          email: user.email
        };
      }
      const accessToken2 = CookieUtils.getCookie(req, "accessToken");
      if (!accessToken2) {
        throw new AppError_default(
          status11.UNAUTHORIZED,
          "Unauthorized access! No access token provided."
        );
      }
    }
    const accessToken = CookieUtils.getCookie(req, "accessToken");
    if (!accessToken) {
      throw new AppError_default(
        status11.UNAUTHORIZED,
        "Unauthorized access! No access token provided."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      envVars.ACCESS_TOKEN_SECRET
    );
    if (!verifiedToken.success) {
      throw new AppError_default(
        status11.UNAUTHORIZED,
        "Unauthorized access! Invalid access token."
      );
    }
    if (!req.user) {
      req.user = {
        userId: verifiedToken.data.userId,
        role: verifiedToken.data.role,
        email: verifiedToken.data.email
      };
    }
    if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data.role)) {
      throw new AppError_default(
        status11.FORBIDDEN,
        "Forbidden access! You do not have permission to access this resource."
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

// src/app/module/auth/auth.router.ts
var router = Router();
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get(
  "/me",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.USER),
  AuthController.getMe
);
router.post("/refresh-token", AuthController.getNewToken);
router.post(
  "/change-password",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.USER),
  AuthController.changePassword
);
router.post(
  "/logout",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.USER),
  AuthController.logoutUser
);
router.get("/login/google", AuthController.googleLogin);
router.get("/google/success", AuthController.googleLoginSuccess);
router.get("/oauth/error", AuthController.handleOAuthError);
router.post("/verify-email", AuthController.verifyEmail);
router.post("/forget-password", AuthController.forgetPassword);
router.post("/reset-password", AuthController.resetPassword);
var AuthRoutes = router;

// src/app/module/admin/admin.route.ts
import { Router as Router2 } from "express";

// src/app/middleware/validateRequest.ts
var validateRequest = (zodSchema) => {
  return (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    console.log(req.body);
    const parsedResult = zodSchema.safeParse(req.body);
    if (!parsedResult.success) {
      next(parsedResult.error);
    }
    req.body = parsedResult.data;
    next();
  };
};

// src/app/module/admin/admin.controller.ts
import status13 from "http-status";

// src/app/module/admin/admin.service.ts
import status12 from "http-status";
var getAllAdmins = async () => {
  const admins = await prisma2.admin.findMany({
    include: {
      user: true
    }
  });
  return admins;
};
var getAllUsers = async () => {
  const users = await prisma2.user.findMany({
    where: {
      isDeleted: false
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return users;
};
var getAdminById = async (id) => {
  const admin = await prisma2.admin.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });
  return admin;
};
var updateAdmin = async (id, payload) => {
  const isAdminExist = await prisma2.admin.findUnique({
    where: {
      id
    }
  });
  if (!isAdminExist) {
    throw new AppError_default(status12.NOT_FOUND, "Admin Or Super Admin not found");
  }
  const { admin } = payload;
  const updatedAdmin = await prisma2.admin.update({
    where: {
      id
    },
    data: {
      ...admin
    }
  });
  return updatedAdmin;
};
var deleteAdmin = async (id, user) => {
  const isAdminExist = await prisma2.admin.findUnique({
    where: {
      id
    }
  });
  if (!isAdminExist) {
    throw new AppError_default(status12.NOT_FOUND, "Admin Or Super Admin not found");
  }
  if (isAdminExist.id === user.userId) {
    throw new AppError_default(status12.BAD_REQUEST, "You cannot delete yourself");
  }
  const result = await prisma2.$transaction(
    async (tx) => {
      await tx.admin.update({
        where: { id },
        data: {
          isDeleted: true,
          deletedAt: /* @__PURE__ */ new Date()
        }
      });
      await tx.user.update({
        where: { id: isAdminExist.userId },
        data: {
          isDeleted: true,
          deletedAt: /* @__PURE__ */ new Date(),
          status: UserStatus.DELETED
          // Optional: you may also want to block the user
        }
      });
      await tx.session.deleteMany({
        where: { userId: isAdminExist.userId }
      });
      await tx.account.deleteMany({
        where: { userId: isAdminExist.userId }
      });
      const admin = await getAdminById(id);
      return admin;
    }
  );
  return result;
};
var deleteUser = async (id, adminUser) => {
  const userToDelete = await prisma2.user.findUnique({
    where: { id }
  });
  if (!userToDelete) {
    throw new AppError_default(status12.NOT_FOUND, "User not found");
  }
  if (userToDelete.id === adminUser.userId) {
    throw new AppError_default(status12.BAD_REQUEST, "You cannot delete yourself");
  }
  const requester = await prisma2.user.findUnique({ where: { id: adminUser.userId } });
  if (requester?.role === Role.ADMIN && (userToDelete.role === Role.ADMIN || userToDelete.role === Role.SUPER_ADMIN)) {
    throw new AppError_default(status12.FORBIDDEN, "Admin cannot delete another Admin or Super Admin");
  }
  const result = await prisma2.$transaction(async (tx) => {
    const deletedUser = await tx.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: /* @__PURE__ */ new Date(),
        status: UserStatus.DELETED
      }
    });
    await tx.session.deleteMany({ where: { userId: id } });
    await tx.account.deleteMany({ where: { userId: id } });
    return deletedUser;
  });
  return result;
};
var changeUserStatus = async (user, payload) => {
  const isAdminExists = await prisma2.admin.findUniqueOrThrow({
    where: {
      email: user.email
    },
    include: {
      user: true
    }
  });
  const { userId, userStatus } = payload;
  const userToChangeStatus = await prisma2.user.findUniqueOrThrow({
    where: {
      id: userId
    }
  });
  const selfStatusChange = isAdminExists.userId === userId;
  if (selfStatusChange) {
    throw new AppError_default(status12.BAD_REQUEST, "You cannot change your own status");
  }
  ;
  if (isAdminExists.user.role === Role.ADMIN && userToChangeStatus.role === Role.SUPER_ADMIN) {
    throw new AppError_default(status12.BAD_REQUEST, "You cannot change the status of super admin. Only super admin can change the status of another super admin");
  }
  if (isAdminExists.user.role === Role.ADMIN && userToChangeStatus.role === Role.ADMIN) {
    throw new AppError_default(status12.BAD_REQUEST, "You cannot change the status of another admin. Only super admin can change the status of another admin");
  }
  if (userStatus === UserStatus.DELETED) {
    throw new AppError_default(status12.BAD_REQUEST, "You cannot set user status to deleted. To delete a user, you have to use role specific delete api. For example, to delete an doctor user, you have to use delete doctor api which will set the user status to deleted and also set isDeleted to true and also delete the user session and account");
  }
  const updatedUser = await prisma2.user.update({
    where: {
      id: userId
    },
    data: {
      status: userStatus
    }
  });
  return updatedUser;
};
var changeUserRole = async (user, payload) => {
  const actingAdmin = await prisma2.admin.findUniqueOrThrow({
    where: { email: user.email },
    include: { user: true }
  });
  if (actingAdmin.user.role !== Role.SUPER_ADMIN) {
    throw new AppError_default(status12.FORBIDDEN, "Only Super Admin can change user roles");
  }
  const { userId, role } = payload;
  const userToChangeRole = await prisma2.user.findUniqueOrThrow({
    where: { id: userId },
    include: { admin: true }
  });
  const selfRoleChange = actingAdmin.userId === userId;
  if (selfRoleChange) {
    throw new AppError_default(status12.BAD_REQUEST, "You cannot change your own role");
  }
  const result = await prisma2.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: { role }
    });
    if (role === Role.ADMIN || role === Role.SUPER_ADMIN) {
      if (!userToChangeRole.admin) {
        await tx.admin.create({
          data: {
            userId: userToChangeRole.id,
            name: userToChangeRole.name,
            email: userToChangeRole.email,
            profilePhoto: userToChangeRole.image
          }
        });
      }
    } else if (role === Role.USER) {
      if (userToChangeRole.admin) {
        await tx.admin.delete({
          where: { userId: userToChangeRole.id }
        });
      }
    }
    return updatedUser;
  });
  return result;
};
var AdminService = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  changeUserStatus,
  changeUserRole,
  getAllUsers,
  deleteUser
};

// src/app/module/admin/admin.controller.ts
var getAllAdmins2 = catchAsync(
  async (req, res) => {
    const result = await AdminService.getAllAdmins();
    sendResponse(res, {
      httpStatusCode: status13.OK,
      success: true,
      message: "Admins fetched successfully",
      data: result
    });
  }
);
var getAllUsers2 = catchAsync(
  async (req, res) => {
    const result = await AdminService.getAllUsers();
    sendResponse(res, {
      httpStatusCode: status13.OK,
      success: true,
      message: "Users fetched successfully",
      data: result
    });
  }
);
var getAdminById2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const admin = await AdminService.getAdminById(id);
    sendResponse(res, {
      httpStatusCode: status13.OK,
      success: true,
      message: "Admin fetched successfully",
      data: admin
    });
  }
);
var updateAdmin2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const updatedAdmin = await AdminService.updateAdmin(id, payload);
    sendResponse(res, {
      httpStatusCode: status13.OK,
      success: true,
      message: "Admin updated successfully",
      data: updatedAdmin
    });
  }
);
var deleteAdmin2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await AdminService.deleteAdmin(id, user);
    sendResponse(res, {
      httpStatusCode: status13.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result
    });
  }
);
var deleteUser2 = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const adminUser = req.user;
    const result = await AdminService.deleteUser(id, adminUser);
    sendResponse(res, {
      httpStatusCode: status13.OK,
      success: true,
      message: "User deleted successfully",
      data: result
    });
  }
);
var changeUserStatus2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const payload = req.body;
    const result = await AdminService.changeUserStatus(user, payload);
    sendResponse(res, {
      httpStatusCode: status13.OK,
      success: true,
      message: "User status changed successfully",
      data: result
    });
  }
);
var changeUserRole2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const payload = req.body;
    const result = await AdminService.changeUserRole(user, payload);
    sendResponse(res, {
      httpStatusCode: status13.OK,
      success: true,
      message: "User role changed successfully",
      data: result
    });
  }
);
var AdminController = {
  getAllAdmins: getAllAdmins2,
  updateAdmin: updateAdmin2,
  deleteAdmin: deleteAdmin2,
  getAdminById: getAdminById2,
  changeUserStatus: changeUserStatus2,
  changeUserRole: changeUserRole2,
  getAllUsers: getAllUsers2,
  deleteUser: deleteUser2
};

// src/app/module/admin/admin.validation.ts
import z2 from "zod";
var updateAdminZodSchema = z2.object({
  admin: z2.object({
    name: z2.string("Name must be a string").optional(),
    profilePhoto: z2.url("Profile photo must be a valid URL").optional(),
    contactNumber: z2.string("Contact number must be a string").min(11, "Contact number must be at least 11 characters").max(14, "Contact number must be at most 15 characters").optional()
  }).optional()
});

// src/app/module/admin/admin.route.ts
var router2 = Router2();
router2.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAllAdmins
);
router2.get(
  "/users/all",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAllUsers
);
router2.patch(
  "/change-user-status",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  AdminController.changeUserStatus
);
router2.patch(
  "/change-user-role",
  checkAuth(Role.SUPER_ADMIN),
  AdminController.changeUserRole
);
router2.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAdminById
);
router2.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(updateAdminZodSchema),
  AdminController.updateAdmin
);
router2.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN),
  AdminController.deleteAdmin
);
router2.delete(
  "/users/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  AdminController.deleteUser
);
var AdminRoutes = router2;

// src/app/module/media/media.routes.ts
import { Router as Router3 } from "express";

// src/app/config/multer.config.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
var storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    const originalName = file.originalname;
    const extension = originalName.split(".").pop()?.toLocaleLowerCase();
    const fileNameWithoutExtension = originalName.split(".").slice(0, -1).join(".").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
    const uniqueName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileNameWithoutExtension;
    const folder = extension === "pdf" ? "pdfs" : "images";
    return {
      folder: `playtube/${folder}`,
      public_id: uniqueName,
      resource_type: "auto"
    };
  }
});
var multerUpload = multer({ storage });

// src/app/utils/QueryBuilder.ts
var QueryBuilder = class {
  constructor(model, queryParams, config2 = {}) {
    this.model = model;
    this.queryParams = queryParams;
    this.config = config2;
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10
    };
    this.countQuery = {
      where: {}
    };
  }
  model;
  queryParams;
  config;
  query;
  countQuery;
  page = 1;
  limit = 10;
  skip = 0;
  sortBy = "createdAt";
  sortOrder = "desc";
  selectFields;
  search() {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchConditions = searchableFields.map(
        (field) => {
          if (field.includes(".")) {
            const parts = field.split(".");
            if (parts.length === 2) {
              const [relation, nestedField] = parts;
              const stringFilter2 = {
                contains: searchTerm,
                mode: "insensitive"
              };
              return {
                [relation]: {
                  [nestedField]: stringFilter2
                }
              };
            } else if (parts.length === 3) {
              const [relation, nestedRelation, nestedField] = parts;
              const stringFilter2 = {
                contains: searchTerm,
                mode: "insensitive"
              };
              return {
                [relation]: {
                  some: {
                    [nestedRelation]: {
                      [nestedField]: stringFilter2
                    }
                  }
                }
              };
            }
          }
          const stringFilter = {
            contains: searchTerm,
            mode: "insensitive"
          };
          return {
            [field]: stringFilter
          };
        }
      );
      const whereConditions = this.query.where;
      whereConditions.OR = searchConditions;
      const countWhereConditions = this.countQuery.where;
      countWhereConditions.OR = searchConditions;
    }
    return this;
  }
  filter() {
    const { filterableFields } = this.config;
    const excludedField = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "sort",
      "fields",
      "include"
    ];
    const filterParams = {};
    Object.keys(this.queryParams).forEach((key) => {
      if (!excludedField.includes(key)) {
        filterParams[key] = this.queryParams[key];
      }
    });
    const queryWhere = this.query.where;
    const countQueryWhere = this.countQuery.where;
    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];
      if (value === void 0 || value === "") {
        return;
      }
      const isAllowedField = !filterableFields || filterableFields.length === 0 || filterableFields.includes(key);
      if (key.includes(".")) {
        const parts = key.split(".");
        if (filterableFields && !filterableFields.includes(key)) {
          return;
        }
        if (parts.length === 2) {
          const [relation, nestedField] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {};
            countQueryWhere[relation] = {};
          }
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          queryRelation[nestedField] = this.parseFilterValue(value);
          countRelation[nestedField] = this.parseFilterValue(value);
          return;
        } else if (parts.length === 3) {
          const [relation, nestedRelation, nestedField] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {
              some: {}
            };
            countQueryWhere[relation] = {
              some: {}
            };
          }
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          if (!queryRelation.some) {
            queryRelation.some = {};
          }
          if (!countRelation.some) {
            countRelation.some = {};
          }
          const querySome = queryRelation.some;
          const countSome = countRelation.some;
          if (!querySome[nestedRelation]) {
            querySome[nestedRelation] = {};
          }
          if (!countSome[nestedRelation]) {
            countSome[nestedRelation] = {};
          }
          const queryNestedRelation = querySome[nestedRelation];
          const countNestedRelation = countSome[nestedRelation];
          queryNestedRelation[nestedField] = this.parseFilterValue(value);
          countNestedRelation[nestedField] = this.parseFilterValue(value);
          return;
        }
      }
      if (!isAllowedField) {
        return;
      }
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        queryWhere[key] = this.parseRangeFilter(
          value
        );
        countQueryWhere[key] = this.parseRangeFilter(
          value
        );
        return;
      }
      queryWhere[key] = this.parseFilterValue(value);
      countQueryWhere[key] = this.parseFilterValue(value);
    });
    return this;
  }
  paginate() {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;
    this.page = page;
    this.limit = limit;
    this.skip = (page - 1) * limit;
    this.query.skip = this.skip;
    this.query.take = this.limit;
    return this;
  }
  sort() {
    const sortBy = this.queryParams.sortBy || "createdAt";
    const sortOrder = this.queryParams.sortOrder === "asc" ? "asc" : "desc";
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    if (sortBy.includes(".")) {
      const parts = sortBy.split(".");
      if (parts.length === 2) {
        const [relation, nestedField] = parts;
        this.query.orderBy = {
          [relation]: {
            [nestedField]: sortOrder
          }
        };
      } else if (parts.length === 3) {
        const [relation, nestedRelation, nestedField] = parts;
        this.query.orderBy = {
          [relation]: {
            [nestedRelation]: {
              [nestedField]: sortOrder
            }
          }
        };
      } else {
        this.query.orderBy = {
          [sortBy]: sortOrder
        };
      }
    } else {
      this.query.orderBy = {
        [sortBy]: sortOrder
      };
    }
    return this;
  }
  fields() {
    const fieldsParam = this.queryParams.fields;
    if (fieldsParam && typeof fieldsParam === "string") {
      const fieldsArray = fieldsParam?.split(",").map((field) => field.trim());
      this.selectFields = {};
      fieldsArray?.forEach((field) => {
        if (this.selectFields) {
          this.selectFields[field] = true;
        }
      });
      this.query.select = this.selectFields;
      delete this.query.include;
    }
    return this;
  }
  include(relation) {
    if (this.selectFields) {
      return this;
    }
    this.query.include = {
      ...this.query.include,
      ...relation
    };
    return this;
  }
  dynamicInclude(includeConfig, defaultInclude) {
    if (this.selectFields) {
      return this;
    }
    const result = {};
    defaultInclude?.forEach((field) => {
      if (includeConfig[field]) {
        result[field] = includeConfig[field];
      }
    });
    const includeParam = this.queryParams.include;
    if (includeParam && typeof includeParam === "string") {
      const requestedRelations = includeParam.split(",").map((relation) => relation.trim());
      requestedRelations.forEach((relation) => {
        if (includeConfig[relation]) {
          result[relation] = includeConfig[relation];
        }
      });
    }
    this.query.include = {
      ...this.query.include,
      ...result
    };
    return this;
  }
  where(condition) {
    this.query.where = this.deepMerge(
      this.query.where,
      condition
    );
    this.countQuery.where = this.deepMerge(
      this.countQuery.where,
      condition
    );
    return this;
  }
  async execute() {
    const [total, data] = await Promise.all([
      this.model.count(
        this.countQuery
      ),
      this.model.findMany(
        this.query
      )
    ]);
    const totalPages = Math.ceil(total / this.limit);
    return {
      data,
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages
      }
    };
  }
  async count() {
    return await this.model.count(
      this.countQuery
    );
  }
  getQuery() {
    return this.query;
  }
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) {
          result[key] = this.deepMerge(
            result[key],
            source[key]
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
  parseFilterValue(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (typeof value === "string" && !isNaN(Number(value)) && value != "") {
      return Number(value);
    }
    if (Array.isArray(value)) {
      return { in: value.map((item) => this.parseFilterValue(item)) };
    }
    return value;
  }
  parseRangeFilter(value) {
    const rangeQuery = {};
    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];
      const parsedValue = typeof operatorValue === "string" && !isNaN(Number(operatorValue)) ? Number(operatorValue) : operatorValue;
      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith":
          rangeQuery[operator] = parsedValue;
          break;
        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            rangeQuery[operator] = [parsedValue];
          }
          break;
        default:
          break;
      }
    });
    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
};

// src/app/module/media/media.constant.ts
var mediaSearchableFields = ["title", "description", "director"];

// src/app/module/media/media.service.ts
var createMedia = async (payload) => {
  const media = await prisma2.media.create({
    data: payload
  });
  return media;
};
var getAllMedia = async (query) => {
  const mediaQuery = new QueryBuilder(prisma2.media, query, {
    searchableFields: mediaSearchableFields
  }).search().filter().sort().paginate().include({
    reviews: {
      where: { status: "APPROVED" },
      select: { rating: true }
    }
  }).fields();
  const result = await mediaQuery.execute();
  const data = result.data.map((media) => {
    const reviews = media.reviews || [];
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";
    return {
      ...media,
      averageRating: parseFloat(averageRating),
      reviewCount: reviews.length
    };
  });
  return {
    meta: result.meta,
    data
  };
};
var getMediaById = async (id) => {
  const media = await prisma2.media.findUnique({
    where: { id },
    include: {
      reviews: {
        where: { status: "APPROVED" },
        select: { rating: true }
      }
    }
  });
  if (!media) return null;
  const reviews = media.reviews || [];
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";
  return {
    ...media,
    averageRating: parseFloat(averageRating),
    reviewCount: reviews.length
  };
};
var updateMedia = async (id, payload) => {
  const media = await prisma2.media.update({
    where: { id },
    data: payload
  });
  return media;
};
var deleteMedia = async (id) => {
  const media = await prisma2.media.delete({
    where: { id }
  });
  return media;
};
var MediaService = {
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia
};

// src/app/module/media/media.controller.ts
var createMedia2 = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    thumbnail: req.file?.path
  };
  const result = await MediaService.createMedia(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Media created successfully",
    data: result
  });
});
var getAllMedia2 = catchAsync(async (req, res) => {
  const result = await MediaService.getAllMedia(req.query);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Media fetched successfully",
    meta: result.meta,
    data: result.data
  });
});
var getMediaById2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MediaService.getMediaById(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Media fetched successfully",
    data: result
  });
});
var updateMedia2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.file?.path ? { ...req.body, thumbnail: req.file.path } : req.body;
  const result = await MediaService.updateMedia(id, payload);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Media updated successfully",
    data: result
  });
});
var deleteMedia2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MediaService.deleteMedia(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Media deleted successfully",
    data: result
  });
});
var MediaController = {
  createMedia: createMedia2,
  getAllMedia: getAllMedia2,
  getMediaById: getMediaById2,
  updateMedia: updateMedia2,
  deleteMedia: deleteMedia2
};

// src/app/module/media/media.validation.ts
import { z as z3 } from "zod";
var createMediaZodSchema = z3.object({
  title: z3.string().min(1, "Title is required"),
  description: z3.string().min(1, "Description is required"),
  type: z3.enum(["MOVIE", "SERIES"]),
  releaseYear: z3.preprocess((val) => Number(val), z3.number().int()),
  director: z3.string().min(1, "Director is required"),
  cast: z3.preprocess(
    (val) => typeof val === "string" ? JSON.parse(val) : val,
    z3.array(z3.string()).min(1, "Cast is required")
  ),
  genres: z3.preprocess(
    (val) => typeof val === "string" ? JSON.parse(val) : val,
    z3.array(z3.string()).min(1, "Genres are required")
  ),
  trailerUrl: z3.string().optional(),
  streamingUrl: z3.string().min(1, "Streaming URL is required"),
  pricingType: z3.enum(["FREE", "PREMIUM"]).default("FREE"),
  price: z3.preprocess((val) => val ? Number(val) : void 0, z3.number().optional())
});
var updateMediaZodSchema = z3.object({
  title: z3.string().optional(),
  description: z3.string().optional(),
  type: z3.enum(["MOVIE", "SERIES"]).optional(),
  releaseYear: z3.preprocess((val) => val !== void 0 ? Number(val) : val, z3.number().optional()),
  director: z3.string().optional(),
  cast: z3.preprocess(
    (val) => typeof val === "string" ? JSON.parse(val) : val,
    z3.array(z3.string()).optional()
  ),
  genres: z3.preprocess(
    (val) => typeof val === "string" ? JSON.parse(val) : val,
    z3.array(z3.string()).optional()
  ),
  trailerUrl: z3.string().optional(),
  streamingUrl: z3.string().optional(),
  pricingType: z3.enum(["FREE", "PREMIUM"]).optional(),
  price: z3.preprocess((val) => val !== void 0 ? Number(val) : val, z3.number().optional())
});
var MediaValidation = {
  createMediaZodSchema,
  updateMediaZodSchema
};

// src/app/module/media/media.routes.ts
var router3 = Router3();
router3.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(MediaValidation.createMediaZodSchema),
  MediaController.createMedia
);
router3.get("/", MediaController.getAllMedia);
router3.get("/:id", MediaController.getMediaById);
router3.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(MediaValidation.updateMediaZodSchema),
  MediaController.updateMedia
);
router3.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  MediaController.deleteMedia
);
var MediaRoutes = router3;

// src/app/module/review/review.routes.ts
import { Router as Router4 } from "express";

// src/app/module/review/review.constant.ts
var reviewSearchableFields = ["content"];

// src/app/module/review/review.service.ts
var createReview = async (payload) => {
  const result = await prisma2.review.create({
    data: payload,
    include: {
      user: true,
      media: true
    }
  });
  return result;
};
var getAllReviews = async (query) => {
  const reviewQuery = new QueryBuilder(prisma2.review, query, {
    searchableFields: reviewSearchableFields
  }).search().filter().sort().paginate().include({
    user: { select: { id: true, name: true, email: true } },
    media: { select: { id: true, title: true, thumbnail: true, type: true } }
  }).fields();
  const result = await reviewQuery.execute();
  return result;
};
var getReviewById = async (id) => {
  const result = await prisma2.review.findUnique({
    where: { id },
    include: {
      user: true,
      media: true
    }
  });
  return result;
};
var updateReview = async (id, payload) => {
  const result = await prisma2.review.update({
    where: { id },
    data: payload
  });
  return result;
};
var getMyReviews = async (userId) => {
  const result = await prisma2.review.findMany({
    where: { userId },
    include: {
      media: {
        select: { id: true, title: true, thumbnail: true, type: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return result;
};
var getReviewsByMedia = async (mediaId) => {
  const result = await prisma2.review.findMany({
    where: { mediaId, status: "APPROVED" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { likes: true, comments: true } }
    },
    orderBy: { createdAt: "desc" }
  });
  return result;
};
var deleteReview = async (id, userId) => {
  if (userId) {
    const review = await prisma2.review.findUnique({ where: { id } });
    if (!review) throw new Error("Review not found");
    if (review.userId !== userId) throw new Error("Not authorized");
    if (review.status === "APPROVED") throw new Error("Cannot delete an approved review");
  }
  const result = await prisma2.review.delete({ where: { id } });
  return result;
};
var ReviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  getMyReviews,
  getReviewsByMedia,
  updateReview,
  deleteReview
};

// src/app/module/review/review.controller.ts
var createReview2 = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = { ...req.body, userId: user.userId };
  const result = await ReviewService.createReview(payload);
  sendResponse(res, { httpStatusCode: 201, success: true, message: "Review submitted and awaiting approval", data: result });
});
var getAllReviews2 = catchAsync(async (req, res) => {
  const result = await ReviewService.getAllReviews(req.query);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Reviews fetched successfully", meta: result.meta, data: result.data });
});
var getReviewById2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewService.getReviewById(id);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Review fetched successfully", data: result });
});
var getMyReviews2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ReviewService.getMyReviews(user.userId);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "My reviews fetched successfully", data: result });
});
var getReviewsByMedia2 = catchAsync(async (req, res) => {
  const { mediaId } = req.params;
  const result = await ReviewService.getReviewsByMedia(mediaId);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Media reviews fetched successfully", data: result });
});
var updateReview2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewService.updateReview(id, req.body);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Review updated successfully", data: result });
});
var deleteReview2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
  const result = await ReviewService.deleteReview(id, isAdmin ? void 0 : user.userId);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Review deleted successfully", data: result });
});
var ReviewController = {
  createReview: createReview2,
  getAllReviews: getAllReviews2,
  getReviewById: getReviewById2,
  getMyReviews: getMyReviews2,
  getReviewsByMedia: getReviewsByMedia2,
  updateReview: updateReview2,
  deleteReview: deleteReview2
};

// src/app/module/review/review.validation.ts
import { z as z4 } from "zod";
var createReviewZodSchema = z4.object({
  rating: z4.number().int().min(1).max(10),
  content: z4.string().min(1, "Review content is required"),
  spoiler: z4.boolean().default(false).optional(),
  tags: z4.array(z4.string()).default([]).optional(),
  mediaId: z4.string().min(1, "Media ID is required")
});
var updateReviewZodSchema = z4.object({
  rating: z4.number().int().min(1).max(10).optional(),
  content: z4.string().optional(),
  spoiler: z4.boolean().optional(),
  tags: z4.array(z4.string()).optional(),
  status: z4.nativeEnum(ReviewStatus).optional()
});
var ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema
};

// src/app/module/review/review.routes.ts
var router4 = Router4();
router4.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);
router4.get("/", ReviewController.getAllReviews);
router4.get(
  "/my-reviews",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  ReviewController.getMyReviews
);
router4.get("/media/:mediaId", ReviewController.getReviewsByMedia);
router4.get("/:id", ReviewController.getReviewById);
router4.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview
);
router4.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  ReviewController.deleteReview
);
var ReviewRoutes = router4;

// src/app/module/watchlist/watchlist.routes.ts
import { Router as Router5 } from "express";

// src/app/module/watchlist/watchlist.service.ts
var addToWatchlist = async (userId, mediaId) => {
  const result = await prisma2.watchlist.create({
    data: {
      userId,
      mediaId
    },
    include: {
      media: {
        select: {
          id: true,
          title: true,
          type: true,
          releaseYear: true,
          thumbnail: true,
          trailerUrl: true
        }
      }
    }
  });
  return result;
};
var getWatchlistByUser = async (userId) => {
  const result = await prisma2.watchlist.findMany({
    where: {
      userId
    },
    include: {
      media: {
        select: {
          id: true,
          title: true,
          type: true,
          releaseYear: true,
          thumbnail: true,
          trailerUrl: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var removeFromWatchlist = async (userId, mediaId) => {
  const result = await prisma2.watchlist.delete({
    where: {
      userId_mediaId: {
        userId,
        mediaId
      }
    }
  });
  return result;
};
var WatchlistService = {
  addToWatchlist,
  getWatchlistByUser,
  removeFromWatchlist
};

// src/app/module/watchlist/watchlist.controller.ts
var addToWatchlist2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { mediaId } = req.body;
  const result = await WatchlistService.addToWatchlist(user.userId, mediaId);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Media added to watchlist successfully",
    data: result
  });
});
var getMyWatchlist = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await WatchlistService.getWatchlistByUser(user.userId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Watchlist fetched successfully",
    data: result
  });
});
var removeFromWatchlist2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { mediaId } = req.params;
  const result = await WatchlistService.removeFromWatchlist(user.userId, mediaId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Media removed from watchlist successfully",
    data: result
  });
});
var WatchlistController = {
  addToWatchlist: addToWatchlist2,
  getMyWatchlist,
  removeFromWatchlist: removeFromWatchlist2
};

// src/app/module/watchlist/watchlist.validation.ts
import { z as z5 } from "zod";
var createWatchlistZodSchema = z5.object({
  mediaId: z5.string().min(1, "Media ID is required")
});
var WatchlistValidation = {
  createWatchlistZodSchema
};

// src/app/module/watchlist/watchlist.routes.ts
var router5 = Router5();
router5.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(WatchlistValidation.createWatchlistZodSchema),
  WatchlistController.addToWatchlist
);
router5.get(
  "/my-watchlist",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  WatchlistController.getMyWatchlist
);
router5.delete(
  "/:mediaId",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  WatchlistController.removeFromWatchlist
);
var WatchlistRoutes = router5;

// src/app/module/like/like.routes.ts
import { Router as Router6 } from "express";

// src/app/module/like/like.service.ts
var toggleLike = async (userId, reviewId) => {
  const isExist = await prisma2.like.findFirst({
    where: {
      userId,
      reviewId
    }
  });
  if (isExist) {
    await prisma2.like.delete({
      where: {
        id: isExist.id
      }
    });
    return { message: "Unliked successfully" };
  } else {
    const result = await prisma2.like.create({
      data: {
        userId,
        reviewId
      }
    });
    return { message: "Liked successfully", data: result };
  }
};
var getLikesByReview = async (reviewId) => {
  const result = await prisma2.like.findMany({
    where: {
      reviewId
    },
    include: {
      user: true
    }
  });
  return result;
};
var LikeService = {
  toggleLike,
  getLikesByReview
};

// src/app/module/like/like.controller.ts
var toggleLike2 = catchAsync(async (req, res) => {
  const user = req.user;
  const { reviewId } = req.body;
  const result = await LikeService.toggleLike(user.userId, reviewId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: result.message,
    data: result.data || null
  });
});
var getLikesByReview2 = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await LikeService.getLikesByReview(reviewId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Likes fetched successfully",
    data: result
  });
});
var LikeController = {
  toggleLike: toggleLike2,
  getLikesByReview: getLikesByReview2
};

// src/app/module/like/like.validation.ts
import { z as z6 } from "zod";
var toggleLikeZodSchema = z6.object({
  reviewId: z6.string().min(1, "Review ID is required")
});
var LikeValidation = {
  toggleLikeZodSchema
};

// src/app/module/like/like.routes.ts
var router6 = Router6();
router6.post(
  "/toggle",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(LikeValidation.toggleLikeZodSchema),
  LikeController.toggleLike
);
router6.get(
  "/:reviewId",
  LikeController.getLikesByReview
);
var LikeRoutes = router6;

// src/app/module/comment/comment.routes.ts
import { Router as Router7 } from "express";

// src/app/module/comment/comment.service.ts
var createComment = async (payload) => {
  const result = await prisma2.comment.create({
    data: payload,
    include: {
      user: true
    }
  });
  return result;
};
var getCommentsByReview = async (reviewId) => {
  const result = await prisma2.comment.findMany({
    where: {
      reviewId,
      parentId: null
      // Only get top-level comments
    },
    include: {
      user: true,
      replies: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var updateComment = async (id, payload) => {
  const result = await prisma2.comment.update({
    where: { id },
    data: payload
  });
  return result;
};
var deleteComment = async (id) => {
  const result = await prisma2.comment.delete({
    where: { id }
  });
  return result;
};
var CommentService = {
  createComment,
  getCommentsByReview,
  updateComment,
  deleteComment
};

// src/app/module/comment/comment.controller.ts
var createComment2 = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = {
    ...req.body,
    userId: user.userId
  };
  const result = await CommentService.createComment(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Comment created successfully",
    data: result
  });
});
var getCommentsByReview2 = catchAsync(async (req, res) => {
  const { reviewId } = req.params;
  const result = await CommentService.getCommentsByReview(reviewId);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Comments fetched successfully",
    data: result
  });
});
var updateComment2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentService.updateComment(id, req.body);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Comment updated successfully",
    data: result
  });
});
var deleteComment2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentService.deleteComment(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Comment deleted successfully",
    data: result
  });
});
var CommentController = {
  createComment: createComment2,
  getCommentsByReview: getCommentsByReview2,
  updateComment: updateComment2,
  deleteComment: deleteComment2
};

// src/app/module/comment/comment.validation.ts
import { z as z7 } from "zod";
var createCommentZodSchema = z7.object({
  content: z7.string().min(1, "Comment content is required"),
  reviewId: z7.string().min(1, "Review ID is required"),
  parentId: z7.string().optional()
});
var updateCommentZodSchema = z7.object({
  content: z7.string().optional()
});
var CommentValidation = {
  createCommentZodSchema,
  updateCommentZodSchema
};

// src/app/module/comment/comment.routes.ts
var router7 = Router7();
router7.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(CommentValidation.createCommentZodSchema),
  CommentController.createComment
);
router7.get(
  "/:reviewId",
  CommentController.getCommentsByReview
);
router7.patch(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(CommentValidation.updateCommentZodSchema),
  CommentController.updateComment
);
router7.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.USER),
  CommentController.deleteComment
);
var CommentRoutes = router7;

// src/app/module/payment/payment.route.ts
import { Router as Router8 } from "express";
var router8 = Router8();
router8.post(
  "/create-checkout-session",
  PaymentController.createCheckoutSession
);
router8.get(
  "/my-payments",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  PaymentController.getMyPayments
);
router8.get(
  "/all-payments",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  PaymentController.getAllPayments
);
var PaymentRoutes = router8;

// src/app/module/stats/stats.route.ts
import express from "express";

// src/app/module/stats/stats.controller.ts
import status15 from "http-status";

// src/app/module/stats/stats.service.ts
import status14 from "http-status";
var getDashboardStatsData = async (user) => {
  let statsData;
  switch (user.role) {
    case Role.SUPER_ADMIN:
      statsData = await getSuperAdminStatsData();
      break;
    case Role.ADMIN:
      statsData = await getAdminStatsData();
      break;
    case Role.USER:
      statsData = await getUserStatsData(user);
      break;
    default:
      throw new AppError_default(status14.BAD_REQUEST, "Invalid user role");
  }
  return statsData;
};
var getSuperAdminStatsData = async () => {
  const adminCount = await prisma2.user.count({
    where: { role: Role.ADMIN, isDeleted: false }
  });
  const superAdminCount = await prisma2.user.count({
    where: { role: Role.SUPER_ADMIN, isDeleted: false }
  });
  const userCount = await prisma2.user.count({
    where: { role: Role.USER, isDeleted: false }
  });
  return {
    adminCount,
    superAdminCount,
    userCount
  };
};
var getAdminStatsData = async () => {
  const adminCount = await prisma2.user.count({
    where: { role: Role.ADMIN, isDeleted: false }
  });
  const superAdminCount = await prisma2.user.count({
    where: { role: Role.SUPER_ADMIN, isDeleted: false }
  });
  const userCount = await prisma2.user.count({
    where: { role: Role.USER, isDeleted: false }
  });
  return {
    adminCount,
    superAdminCount,
    userCount
  };
};
var getUserStatsData = async (user) => {
  const userId = user.userId;
  const purchaseCount = await prisma2.payment.count({
    where: { userId, status: "PAID" }
  });
  const totalSpent = await prisma2.payment.aggregate({
    where: { userId, status: "PAID" },
    _sum: {
      amount: true
    }
  });
  const watchlistCount = await prisma2.watchlist.count({
    where: { userId }
  });
  const reviewCount = await prisma2.review.count({
    where: { userId }
  });
  return {
    purchaseCount,
    totalSpent: totalSpent._sum.amount || 0,
    watchlistCount,
    reviewCount
  };
};
var getAnalyticsData = async () => {
  const totalPayments = await prisma2.payment.findMany({
    where: { status: "PAID" },
    include: { media: { select: { title: true } } }
  });
  const totalRevenue = totalPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalSales = totalPayments.length;
  const typeDistribution = await prisma2.payment.groupBy({
    by: ["paymentType"],
    _sum: { amount: true },
    _count: { id: true },
    where: { status: "PAID" }
  });
  const salesOverTimeMap = totalPayments.reduce((acc, payment) => {
    const date = new Date(payment.createdAt);
    const monthYear = date.toLocaleString("default", { month: "short", year: "2-digit" });
    if (!acc[monthYear]) {
      acc[monthYear] = { month: monthYear, revenue: 0, count: 0, timestamp: date.getTime() };
    }
    acc[monthYear].revenue += payment.amount;
    acc[monthYear].count += 1;
    return acc;
  }, {});
  const salesOverTime = Object.values(salesOverTimeMap).sort((a, b) => a.timestamp - b.timestamp).map(({ timestamp, ...rest }) => rest);
  const mediaSalesMap = totalPayments.reduce((acc, payment) => {
    if (payment.mediaId) {
      const id = payment.mediaId;
      const title = payment.media?.title || "Deleted Media";
      if (!acc[id]) {
        acc[id] = { title, revenue: 0, count: 0 };
      }
      acc[id].revenue += payment.amount;
      acc[id].count += 1;
    }
    return acc;
  }, {});
  const topMedia = Object.values(mediaSalesMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  return {
    totalRevenue,
    totalSales,
    typeDistribution: typeDistribution.map((td) => ({
      type: td.paymentType,
      revenue: td._sum.amount,
      count: td._count.id
    })),
    salesOverTime,
    topMedia
  };
};
var StatsService = {
  getDashboardStatsData,
  getAnalyticsData
};

// src/app/module/stats/stats.controller.ts
var getDashboardStatsData2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await StatsService.getDashboardStatsData(user);
  sendResponse(res, {
    httpStatusCode: status15.OK,
    success: true,
    message: "Stats data retrieved successfully!",
    data: result
  });
});
var getAnalyticsData2 = catchAsync(async (req, res) => {
  const result = await StatsService.getAnalyticsData();
  sendResponse(res, {
    httpStatusCode: status15.OK,
    success: true,
    message: "Analytics data retrieved successfully!",
    data: result
  });
});
var StatsController = {
  getDashboardStatsData: getDashboardStatsData2,
  getAnalyticsData: getAnalyticsData2
};

// src/app/module/stats/stats.route.ts
var router9 = express.Router();
router9.get(
  "/",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.USER),
  StatsController.getDashboardStatsData
);
router9.get(
  "/analytics",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  StatsController.getAnalyticsData
);
var StatsRoutes = router9;

// src/app/routes/index.ts
var router10 = Router9();
router10.use("/auth", AuthRoutes);
router10.use("/admins", AdminRoutes);
router10.use("/media", MediaRoutes);
router10.use("/reviews", ReviewRoutes);
router10.use("/watchlist", WatchlistRoutes);
router10.use("/likes", LikeRoutes);
router10.use("/comments", CommentRoutes);
router10.use("/payments", PaymentRoutes);
router10.use("/stats", StatsRoutes);
var IndexRoutes = router10;

// src/app/middleware/requestLogger.ts
import fs from "fs/promises";
import path3 from "path";
var logDir = path3.resolve(process.cwd(), "logs");
var accessLogPath = path3.join(logDir, "access.log");
var ensureLogDir = async () => {
  await fs.mkdir(logDir, { recursive: true });
};
var requestLogger = async (req, res, next) => {
  const startTime = process.hrtime.bigint();
  res.on("finish", async () => {
    try {
      const endTime = process.hrtime.bigint();
      const responseTimeMs = Number(endTime - startTime) / 1e6;
      const logEntry = JSON.stringify({
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        responseTimeMs: Number(responseTimeMs.toFixed(2)),
        ip: req.ip,
        userAgent: req.get("user-agent") || "unknown"
      });
      console.log(logEntry);
      await ensureLogDir();
      await fs.appendFile(accessLogPath, `${logEntry}
`, "utf8");
    } catch (error) {
      console.error("Failed to write access log:", error);
    }
  });
  next();
};

// src/app.ts
var app = express2();
app.set("view engine", "ejs");
app.set("views", path4.join(process.cwd(), "src/app/templates"));
app.set("query parser", (str) => qs.parse(str));
app.use(requestLogger);
app.get("/test-webhook", (req, res) => {
  res.send("Webhook route is reachable!");
});
app.post(
  "/webhook",
  express2.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhookEvent
);
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use("/api/auth", toNodeHandler(auth));
app.use(express2.urlencoded({ extended: true }));
app.use(express2.json());
app.use(cookieParser());
app.use("/api/v1", IndexRoutes);
app.get("/", (req, res) => {
  res.send("Hello from PlayTube World!");
});
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
