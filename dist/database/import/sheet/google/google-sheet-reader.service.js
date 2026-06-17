"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetReaderService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
let GoogleSheetReaderService = class GoogleSheetReaderService {
    sheets;
    constructor() {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets.readonly',
            ],
        });
        this.sheets = googleapis_1.google.sheets({
            version: 'v4',
            auth,
        });
    }
    async getWorkbook(spreadsheetId) {
        const result = await this.sheets.spreadsheets.get({
            spreadsheetId,
        });
        return result.data;
    }
    async getSheetNames(spreadsheetId) {
        const workbook = await this.getWorkbook(spreadsheetId);
        return (workbook.sheets?.map((s) => s.properties?.title) ?? []);
    }
    async getRows(spreadsheetId, sheetName) {
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId,
            range: sheetName,
        });
        const values = response.data.values ?? [];
        if (!values.length) {
            return [];
        }
        const headers = values[0];
        return values
            .slice(1)
            .map((row) => {
            const record = {};
            headers.forEach((header, index) => {
                record[header] =
                    row[index] ?? null;
            });
            return record;
        });
    }
};
exports.GoogleSheetReaderService = GoogleSheetReaderService;
exports.GoogleSheetReaderService = GoogleSheetReaderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleSheetReaderService);
//# sourceMappingURL=google-sheet-reader.service.js.map