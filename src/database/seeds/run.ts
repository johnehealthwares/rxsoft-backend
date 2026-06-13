import { DataSource } from 'typeorm';
import { seedOrganization } from './0-seed-organization';
import { seedRoles } from './1-seed-roles';
import { seedUsers } from './2-seed-users';
import { seedGenericNames } from './3-seed-generic-item';
import { seedItemsTemplates } from './4-seed-item-template';
import { seedPriceTemplates } from './5-seed-price-template';
import { seedWarehouseAndStockLocation } from './5-seed-location_and-warehouse';
import { seedBlogArticles, seedHealthConcerns } from 'src/modules/website/seed';

export async function runSeeds(dataSource?: DataSource) {
  console.log('Starting database seeds...');

  try {
    if (dataSource) {
      await seedOrganization(dataSource);
      await seedRoles(dataSource);
      await seedUsers(dataSource);
      const genericsMap = await seedGenericNames(dataSource);
      await seedItemsTemplates(dataSource);
      await seedPriceTemplates(dataSource);
      await seedWarehouseAndStockLocation(dataSource)
      await seedHealthConcerns(dataSource.manager);
      await seedBlogArticles(dataSource.manager);
      
    }

    console.log('Database seeds completed successfully!');
  } catch (error) {
    console.error('Error running seeds:', error);
    throw error;
  }
}
