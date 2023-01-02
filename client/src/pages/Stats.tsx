import { useQuery } from "@apollo/client";
import { DateTime } from "luxon";
import {
    GET_RECORDS_FOR_STATS,
} from "../api/requests";
// --- loader
import loader from "../imgs/loader.gif";

export function Stats() {
    const userId = localStorage.getItem("id");
    const today = DateTime.now();
    const todayFormatted = today.toFormat("yyyy-MM-dd")

    const { loading, data, error } = useQuery(GET_RECORDS_FOR_STATS, {
        variables: {
            id: userId,
            today: todayFormatted
        }
    });



    if (loading)
        return (
            <div className="contentContainer">
                <img
                    src={loader}
                    alt="Loading..."
                    style={{ width: "90vw", alignSelf: "center" }}
                />
            </div>
        );
    if (error) return <div className="contentContainer">{`error: ${error}`}</div>;

    const renderState = () => {
        const accumulatedData = data.Record.reduce((accumulator: any, record: any) => {
            const pooInt: any = record.bowelMovement ? 1 : 0
            const peeInt: number = record.void ? 1 : 0
            const spitInt: number = record.vomit_spitUp ? 1 : 0
            const pumpTime: number = record.pumpTime || 0
            const supplementQuantity: number = record.supplementQuantity || 0
            const leftBreast: number = record.leftBreast || 0
            const rightBreast: number = record.rightBreast || 0
            return {
                poo: accumulator.poo + pooInt,
                peeInt: accumulator.peeInt + peeInt,
                spitInt: accumulator.spitInt + spitInt,
                pumpTime: accumulator.pumpTime + pumpTime,
                supplementQuantity: accumulator.supplementQuantity + supplementQuantity,
                leftBreast: accumulator.leftBreast + leftBreast,
                rightBreast: accumulator.rightBreast + rightBreast
            }

        }, {
            poo: 0,
            peeInt: 0,
            spitInt: 0,
            pumpTime: 0,
            supplementQuantity: 0,
            leftBreast: 0,
            rightBreast: 0
        })

        return(
            <ul style={{margin:'10%'}}>
                <li>Poops: {accumulatedData.poo}</li>
                <li>Pees: {accumulatedData.peeInt}</li>
                <li>Spitups/Vomits: {accumulatedData.spitInt}</li>
                <li>Pump Time: {accumulatedData.pumpTime} (minutes)</li>
                <li>Supplement Quantity: {accumulatedData.supplementQuantity} (oz)</li>
                <li>Left Breast: {accumulatedData.leftBreast} (minutes)</li>
                <li>Right Breast: {accumulatedData.rightBreast} (minutes)</li>
            </ul>
        )

    }



    return (
        <div className="contentContainer">
            <h1>Stats</h1>
            <h2>Today's Totals:</h2>
            <div>
                {renderState()}
            </div>

        </div>
    );
}
