// --- ICONS ---
import { FaPoo } from "react-icons/fa";
import { BsFillDropletFill } from "react-icons/bs";
import { GiVomiting } from "react-icons/gi";

export function RecordBox(record: any) {
  //--- create an array from object
  let rec = record.record;
  let recArray: any = [];
  Object.keys(rec).forEach((key, index: any) => {
    recArray.push(`${rec[key]}`);
  });

  return (
    <div className="recordBox">
      <ul>
        <li>{`${rec.date.slice(5)}`}</li>
        <li>{`${rec.time.slice(0, 5)}`}</li>
        {rec.void && (
          <li>
            <BsFillDropletFill size={"25px"} color="rgb(153,163,34)" />
          </li>
        )}
        {rec.bowelMovement && (
          <li>
            <FaPoo size={"25px"} color="rgb(122, 72, 6)" />
          </li>
        )}
        {rec.vomit_spitUp && (
          <li>
            <GiVomiting size={"25px"} color="rgb(17, 84, 35)" />
          </li>
        )}
        {rec.leftBreast > 0 && <li>{`LB: ${rec.leftBreast}`}</li>}
        {rec.rightBreast > 0 && <li>{`${rec.rightBreast}`}</li>}
        {rec.supplementQuantity > 0 && (
          <li>{`SupQty: ${rec.supplementQuantity}`}</li>
        )}
        {rec.supplementType && <li>{`SupType: ${rec.supplementType}`}</li>}
        {rec.pumpTime > 0 && <li>{`PumpTm: ${rec.pumpTime}`}</li>}
      </ul>
    </div>
  );
}
