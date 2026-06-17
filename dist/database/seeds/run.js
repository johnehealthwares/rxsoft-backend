"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeds = runSeeds;
const _0_seed_organization_1 = require("./0-seed-organization");
const _1_seed_roles_1 = require("./1-seed-roles");
const _2_seed_users_1 = require("./2-seed-users");
const _4_seed_item_template_1 = require("./4-seed-item-template");
const _5_seed_price_template_1 = require("./5-seed-price-template");
const _5_seed_location_and_warehouse_1 = require("./5-seed-location_and-warehouse");
const seed_1 = require("../../modules/website/seed");
async function runSeeds(dataSource) {
    console.log('Starting database seeds...');
    try {
        if (dataSource) {
            await (0, _0_seed_organization_1.seedOrganization)(dataSource);
            await (0, _1_seed_roles_1.seedRoles)(dataSource);
            await (0, _2_seed_users_1.seedUsers)(dataSource);
            await (0, _4_seed_item_template_1.seedItemsTemplates)(dataSource);
            await (0, _5_seed_price_template_1.seedPriceTemplates)(dataSource);
            await (0, _5_seed_location_and_warehouse_1.seedWarehouseAndStockLocation)(dataSource);
            await (0, seed_1.seedHealthConcerns)(dataSource.manager);
            await (0, seed_1.seedBlogArticles)(dataSource.manager);
        }
        console.log('Database seeds completed successfully!');
    }
    catch (error) {
        console.error('Error running seeds:', error);
        throw error;
    }
}
//# sourceMappingURL=run.js.map