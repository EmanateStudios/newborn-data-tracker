import { Link } from "react-router-dom";
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
    <Link to={`/EditItem/${rec.id}`}>
      <div className="recordBox">
        <ul>
          <li>{`${rec.date.slice(5)}`}</li>
          <li>{`${rec.time.slice(0, 5)}`}</li>
          {rec.void && (
            <li style={{ width: "40px" }}>
              <BsFillDropletFill size={"25px"} color="rgb(209, 180, 50)" />
            </li>
          )}
          {rec.bowelMovement && (
            <li style={{ width: "40px" }}>
              <FaPoo size={"25px"} color="rgb(122, 72, 6)" />
            </li>
          )}
          {rec.vomit_spitUp && (
            <li style={{ width: "40px" }}>
              <GiVomiting size={"25px"} color="rgb(17, 84, 35)" />
            </li>
          )}
          {rec.leftBreast > 0 && <li>{`LBreast: ${rec.leftBreast}`}</li>}
          {rec.rightBreast > 0 && <li>{`RBreast: ${rec.rightBreast}`}</li>}
          {rec.supplementQuantity > 0 && (
            <li>{`SupQty: ${rec.supplementQuantity}`}</li>
          )}
          {rec.supplementType && <li>{`SupType: ${rec.supplementType}`}</li>}
          {rec.pumpTime > 0 && <li>{`PumpTm: ${rec.pumpTime}`}</li>}
        </ul>
      </div>
    </Link>
  );
}
