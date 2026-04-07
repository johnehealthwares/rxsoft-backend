import { DataSource } from 'typeorm';
import { RoleOrmEntity } from '../../modules/identity/entities/role.orm-entity';
import { randomUUID } from 'node:crypto';

const organizationId = 'df3b4afd-9955-4617-9a82-264cc73dd8b2';

const roles = [
  { code: 'admin', name: 'admin' },
  { code: 'super_admin', name: 'super_admin' },
  { code: 'cashier', name: 'cashier' },
  { code: 'auditor', name: 'auditor' },
  { code: 'customer', name: 'customer' },
];

export async function seedRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(RoleOrmEntity);

  for (const roleData of roles) {
    const existingRole = await roleRepository.findOne({
      where: {
        organizationId,
        code: roleData.code,
      },
    });

    if (!existingRole) {
      const role = roleRepository.create({
        organizationId,
        code: roleData.code,
        name: roleData.name,
        description: `${roleData.name} role`,
      });
      await roleRepository.save(role);
      console.log(`Created role: ${roleData.code}`);
    } else {
      console.log(`Role already exists: ${roleData.code}`);
    }
  }
}
