import { DataSource } from 'typeorm';
import { seedOrganization } from './0-seed-organization';
import { seedRoles } from './1-seed-roles';
import { seedUsers } from './2-seed-users';
import { seedGenericNames } from './3-seed-generic-names';
import { seedProductsTemplates } from './4-seed-product-template';
import { seedWarehouseAndStockLocation } from './5-seed-location_and-warehouse';

export async function runSeeds(dataSource?: DataSource) {
  console.log('Starting database seeds...');

  try {
    if (dataSource) {
      await seedOrganization(dataSource);
      await seedRoles(dataSource);
      await seedUsers(dataSource);
      const genericsMap = await seedGenericNames(dataSource);
      await seedProductsTemplates(dataSource, genericsMap);
      await seedWarehouseAndStockLocation(dataSource)
    }

    console.log('Database seeds completed successfully!');
  } catch (error) {
    console.error('Error running seeds:', error);
    throw error;
  }
}
