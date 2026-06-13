export type Feature = {
  resource: string
  label: string
  actions: { name: string; label: string }[]
}

export type ModulePermissions = {
  id: string
  name: string
  features: Feature[]
}

export const MODULE_PERMISSIONS: ModulePermissions[] = [
  {
    id: 'rxsoft',
    name: 'RxSoft',
    features: [
      { resource: 'users', label: 'Users', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'customers', label: 'Customers', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'suppliers', label: 'Suppliers', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'products', label: 'Products', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'categories', label: 'Categories', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'uoms', label: 'UOMs', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'pharmaceutics', label: 'Pharmaceutics', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'drug-components', label: 'Drug Components', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'manufacturers', label: 'Manufacturers', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'price-lists', label: 'Price Lists', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'sales', label: 'Sales', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'purchases', label: 'Purchases', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'inventory', label: 'Inventory', actions: [{ name: 'read', label: 'Read' }, { name: 'adjust', label: 'Adjust' }] },
      { resource: 'receivables', label: 'Receivables', actions: [{ name: 'read', label: 'Read' }, { name: 'collect', label: 'Collect' }] },
      { resource: 'branches', label: 'Branches', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'organizations', label: 'Organizations', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'reports', label: 'Reports', actions: [{ name: 'read', label: 'Read' }] },
      { resource: 'payments', label: 'Payments', actions: [{ name: 'create', label: 'Create' }] },
    ],
  },
  {
    id: 'conversation',
    name: 'Conversation',
    features: [
      { resource: 'conversations', label: 'Conversations', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'participants', label: 'Participants', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }] },
      { resource: 'questionnaires', label: 'Questionnaires', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'questions', label: 'Questions', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'workflows', label: 'Workflows', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'channels', label: 'Channels', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'exchanges', label: 'Exchanges', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
    ],
  },
  {
    id: 'communication',
    name: 'Switch',
    features: [
      { resource: 'messages', label: 'Messages', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'send', label: 'Send' }] },
      { resource: 'notifications', label: 'Notifications', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'send', label: 'Send' }] },
      { resource: 'message-templates', label: 'Message Templates', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'notification-templates', label: 'Notification Templates', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'communication-channels', label: 'Communication Channels', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'broadcasts', label: 'Broadcasts', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'send', label: 'Send' }] },
    ],
  },
  {
    id: 'coding-concept',
    name: 'Coding Concept',
    features: [
      { resource: 'concepts', label: 'Concepts', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }, { name: 'search', label: 'Search' }, { name: 'match', label: 'Match' }, { name: 'upload', label: 'Upload' }] },
    ],
  },
  {
    id: 'lis',
    name: 'LIS',
    features: [
      { resource: 'test-definitions', label: 'Test Definitions', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'reference-ranges', label: 'Reference Ranges', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'sample-types', label: 'Sample Types', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'locations', label: 'Locations', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'programs', label: 'Programs', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'loinc', label: 'LOINC', actions: [{ name: 'read', label: 'Read' }, { name: 'import', label: 'Import' }] },
    ],
  },
  {
    id: 'admin',
    name: 'Admin Console',
    features: [
      { resource: 'settings', label: 'Settings', actions: [{ name: 'read', label: 'Read' }, { name: 'update', label: 'Update' }] },
      { resource: 'audit-logs', label: 'Audit Logs', actions: [{ name: 'read', label: 'Read' }] },
    ],
  },
  {
    id: 'website',
    name: 'Website',
    features: [
      { resource: 'website.health-concerns', label: 'Health Concerns', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'website.articles', label: 'Blog Articles', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update', label: 'Update' }, { name: 'delete', label: 'Delete' }] },
      { resource: 'website.prescriptions', label: 'Prescriptions', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update-status', label: 'Update Status' }] },
      { resource: 'website.consultations', label: 'Consultations', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }, { name: 'update-status', label: 'Update Status' }] },
      { resource: 'website.orders', label: 'Orders', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }] },
      { resource: 'website.reviews', label: 'Reviews', actions: [{ name: 'read', label: 'Read' }, { name: 'create', label: 'Create' }] },
      { resource: 'website.rewards', label: 'Rewards', actions: [{ name: 'read', label: 'Read' }] },
    ],
  },
];

function permissionCode(mod: { id: string }, feature: Feature, action: { name: string }): string {
  return `${mod.id}:${feature.resource}.${action.name}`;
}

export function getAllPermissionCodes(): string[] {
  const codes: string[] = [];
  for (const mod of MODULE_PERMISSIONS) {
    for (const feature of mod.features) {
      for (const action of feature.actions) {
        codes.push(permissionCode(mod, feature, action));
      }
    }
  }
  return codes;
}

export function getPermissionCodesByModule(moduleId: string): string[] {
  const mod = MODULE_PERMISSIONS.find((m) => m.id === moduleId);
  if (!mod) return [];
  const codes: string[] = [];
  for (const feature of mod.features) {
    for (const action of feature.actions) {
      codes.push(permissionCode(mod, feature, action));
    }
  }
  return codes;
}
