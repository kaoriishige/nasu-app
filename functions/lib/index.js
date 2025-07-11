"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportReferralSummariesToCSV = exports.summarizeReferralRewards = void 0;
const functions = __importStar(require("firebase-functions")); // ✅ v1構文
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const storage_1 = require("@google-cloud/storage");
(0, app_1.initializeApp)();
const db = (0, firestore_1.getFirestore)();
const storage = new storage_1.Storage();
exports.summarizeReferralRewards = functions.pubsub
    .schedule('0 0 1 * *') // ✅ v1構文（v2ではない）
    .timeZone('Asia/Tokyo')
    .onRun(async () => {
    console.log('✅ summarizeReferralRewards running...');
    // 処理略（あなたの本来の内容）
});
exports.exportReferralSummariesToCSV = functions.https.onRequest(async (req, res) => {
    console.log('✅ exportReferralSummariesToCSV running...');
    // 処理略（あなたの本来の内容）
});
