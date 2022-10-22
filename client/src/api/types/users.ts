export interface user {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  spouseName?: string | null;
  childName?: string | null;
  childBirth?: Date | null;
}
