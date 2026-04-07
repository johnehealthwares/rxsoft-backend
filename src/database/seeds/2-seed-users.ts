import { createHash } from 'node:crypto';
import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../../modules/identity/entities/user.orm-entity';
import { RoleOrmEntity } from '../../modules/identity/entities/role.orm-entity';

const organizationId = 'df3b4afd-9955-4617-9a82-264cc73dd8b2';

const users = [
  { username: 'admin', roleCodes: ['admin'] },
  { username: 'super_admin', roleCodes: ['super_admin'] },
  { username: 'cashier', roleCodes: ['cashier'] },
  { username: 'auditor', roleCodes: ['auditor'] },
  { username: 'customer', roleCodes: ['customer'] },
];

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(UserOrmEntity);
  const roleRepository = dataSource.getRepository(RoleOrmEntity);

  for (const userData of users) {
    const existingUser = await userRepository.findOne({
      where: {
        organizationId,
        username: userData.username,
      },
    });

    if (!existingUser) {
      // Get roles for this user
      const userRoles = await roleRepository.find({
        where: {
          organizationId,
          code: userData.roleCodes[0],
        },
      });

      const user = userRepository.create({
        organizationId,
        username: userData.username,
        passwordHash: hashPassword('password'),
        isActive: true,
        roles: userRoles,
      });

      await userRepository.save(user);
      console.log(`Created user: ${userData.username}`);
    } else {
      console.log(`User already exists: ${userData.username}`);
    }
  }
}
