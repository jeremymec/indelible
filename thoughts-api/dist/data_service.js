"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThought = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
var credentials = new aws_sdk_1.default.SharedIniFileCredentials({ profile: 'redpanda' });
aws_sdk_1.default.config.credentials = credentials;
aws_sdk_1.default.config.update({ region: 'ap-southeast-2' });
var client = new aws_sdk_1.default.DynamoDB.DocumentClient();
const getThought = (thought_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    var params = {
        TableName: 'thoughts',
        Key: { thought_id: thought_id, user_id: user_id }
    };
    const response = yield client.get(params).promise();
    console.log(response.Item);
    try {
        return {
            success: true,
            thought: response.Item
        };
    }
    catch (error) {
        return {
            success: false
        };
    }
});
exports.getThought = getThought;
