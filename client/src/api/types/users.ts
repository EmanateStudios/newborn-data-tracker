export interface user {
  id: string;
  email: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  spouseName?: string | null | undefined;
  childName?: string | null | undefined;
  childBirth?: Date | null | undefined;
}
