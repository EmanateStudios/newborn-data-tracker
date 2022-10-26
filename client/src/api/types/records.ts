export interface record {
  date: any;
  time: any;
  leftBreast?: number | undefined;
  rightBreast?: number | undefined;
  void: boolean;
  vomit_spitUp?: boolean;
  pumpTime?: number | undefined;
  supplementQuantity?: number | undefined;
  supplementType?: string | undefined;
  id?: string;
  user_id: string;
  bowelMovement?: boolean;
}
