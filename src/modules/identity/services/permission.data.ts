import { ModuleInfoDto } from '../dto/module-info.dto';

export const AVAILABLE_MODULES: ModuleInfoDto[] = [
  { id: 'rxsoft', name: 'RxSoft', description: 'Pharmacy Admin', root: '/items' },
  { id: 'conversation', name: 'Conversation', description: 'Workflow Chat', root: '/conversations' },
  { id: 'communication', name: 'Switch', description: 'Messaging & Routing', root: '/messages' },
  { id: 'coding-concept', name: 'Coding Concept', description: 'Terminology', root: '/coding-concepts' },
  { id: 'lis', name: 'LIS', description: 'Laboratory', root: '/lis' },
  { id: 'admin', name: 'Admin Console', description: 'Administration', root: '/users' },
  { id: 'website', name: 'Website Console', description: 'Website', root: '/' },
];

export function getUserModules(permissions: string[], _roleCodes: string[] = []): ModuleInfoDto[] {
  const hasWildcard = permissions.includes('*');
  if (hasWildcard || _roleCodes.includes('super_admin')) { //TODO: Why is * not in permissions for superadmin as it's added here /Users/john/develop/rxsoft/rxsoft-backend/src/database/seeds/1-seed-roles.ts on line 54
    return AVAILABLE_MODULES;
  }

  const modules = AVAILABLE_MODULES.filter((mod) => {
    return permissions.some((perm) => perm.startsWith(mod.id + ':') || perm === mod.id);
  });
  return modules
}
