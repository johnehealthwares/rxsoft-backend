export type PartyType = {
  id: string;
  organizationId: string;
  partyType: 'customer' | 'supplier' | 'both';
  code: string | null;
  name: string;
  phone: string | null;
  email: string | null;
  addressLine1: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
