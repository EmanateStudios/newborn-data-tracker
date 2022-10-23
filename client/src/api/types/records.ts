import { DateTime } from "luxon";

export interface record {
  date: DateTime;
  time: any;
  leftBreast?: number | null | undefined;
  rightBreast?: number | null | undefined;
  void: boolean;
  vomit_spitUp?: boolean;
  pumpTime?: Number | null | undefined;
  supplementQuantity?: Number | null | undefined;
  supplementType?: string | null | undefined;
  id?: string;
  user_id: string;
  bowelMovement?: boolean;
}
