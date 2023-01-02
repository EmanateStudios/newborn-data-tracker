import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import {
  GET_RECORDS_FOR_DOWNLOAD,
} from "../api/requests";
// --- loader
import loader from "../imgs/loader.gif";

export function ExportOptions() {
  const userId = localStorage.getItem("id");

  const [getRecords, { loading, data, error }] = useLazyQuery(GET_RECORDS_FOR_DOWNLOAD, {
    variables: {
      id: userId,
    },
    onCompleted:(completedData)=>{
      handleDownload(completedData)
    }
  });

  const handleDownload = (completedData:any) => {
    

    let csv = "__typename,BowelMovement,date,leftBreast,pumpTime,rightBreast,supplementQuantity,supplementType,time,void,vomit_spitUp\n"

    const dataToArray = completedData.Record.map((item:any) => Object.values(item));

    dataToArray.forEach(function (row:any) {
      csv += row.join(',');
      csv += "\n";
    });

    // console.log(dataToArray)

    const hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    hiddenElement.target = '_blank';  
      
    //provide the name for the CSV file to be downloaded  
    hiddenElement.download = 'Baby Records.csv';  
    hiddenElement.click();  

  }

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


  return (
    <div className="contentContainer">
      <h1>ExportOptions</h1>
      {!loading &&
        <div style={{ display: "flex", justifyContent: "center", alignContent: 'center' }}>
          <button onClick={() => getRecords()}>Download CSV</button>
        </div>
      }

    </div>
  );
}
