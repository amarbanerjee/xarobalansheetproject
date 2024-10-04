import React, { useEffect, useState } from 'react'
import { Card, Typography } from "@material-tailwind/react";
import axios from 'axios';

export interface BalanceSheetTitle{
    titleFirst:String,
    titleSecond:String,
    titleThird:String
}

interface RowData{
    RowType:String,
    Cells:Cells[]

}

interface Cells{

    Value:String,
    Attribute:Attribute[],
}

interface Attribute{
    Value:String,
    Id:String
}

interface Section{
  Title:String,
  rows:RowData[],

}

const BalanceSheetTable:React.FC = () => {

    const [data,setData] = useState<any>([]);
    const [title,setTitle]= useState<BalanceSheetTitle>({titleFirst:"",titleSecond:"",titleThird:""});
    const [headerCell,setHeaderCell] = useState<any[]>([]);
    const [sections,setSection] = useState<Section[]>([]);
    const newSections: Section[] = [];

    //let newSections:Section[];

    useEffect(() => {

        const fetchData = async() => {
            try{

                const response = await axios.get('http://localhost:3000/api/data');
                if(response?.data.Status==='OK')
                {
                    //console.log("OK");
                    
                    const titleFirst = response?.data.Reports[0].ReportTitles[0];
                    const titleSecond = response?.data.Reports[0].ReportTitles[1];
                    const titleThird = response?.data.Reports[0].ReportTitles[2];
                    setTitle({titleFirst,titleSecond,titleThird});

                    //console.log("Rows",response?.data.Reports[0].Rows.length);

                    for(let i=0; i<response?.data.Reports[0].Rows.length; i++)
                    {
                            //console.log("Test hkhkj",response?.data.Reports[0].Rows[i].RowType);

                            if(response?.data.Reports[0].Rows[i].RowType==="Header")
                            {
                                //console.log("Match");
                                setHeaderCell(response.data.Reports[0].Rows[i].Cells);
                            }
                            else
                            {
                                const sectionTilte = response.data.Reports[0].Rows[i].Title;
                                console.log("Tilte",sectionTilte);
                                const sectionRows = response.data.Reports[0].Rows[i].Rows;
                                //newSections.push({Title:sectionTilte,rows:sectionRows});
                               // setSection([...sections,{Title:sectionTilte,rows:sectionRows}]);
                               //setSection((prevSections:Section[]) => [...prevSections, { Title: sectionTilte, rows: sectionRows }]);
                                newSections.push({ Title: sectionTilte, rows: sectionRows });
                            }
                    }
                    setSection([...sections, ...newSections]);
                }

               
                
                
                setData(response?.data);
                
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[]);
    
    console.log("Sections",sections);
    return (

        <div className="relative overflow-x-auto">
            <table>
        <thead>
            <tr>
            <th>{title.titleFirst}</th>
            <th></th>
            <th></th>
            <th></th>
           
            </tr>
            <tr>
            <th>{title.titleSecond}</th>
            <th></th>
            <th></th>
            <th></th>
            
            </tr>
            <tr>
            <th>{title.titleThird}</th>
            <th></th>
            <th></th>
            <th></th>
            
            </tr>
            <tr>
            <th id="name"></th>
            {headerCell.map((th) => (
            
                <th id="dec">{th.Value}</th>
            
            
         ))} 
        </tr>   
        </thead>
        <tbody>
    {sections.map((td) =>( 
        <>       
            <tr>
            
                <td>{td.Title}</td>
                <td></td>
                <td></td>
                <td></td>
                
            </tr>

            {td.rows.length>0 ? (
                
                <>
                {td.rows.map((trnew)=>( 

                    <>
                    {trnew.RowType==="SummaryRow" ? (
                    
                    <tr>
                        <td></td>
                        {trnew.Cells.map((cell) =>(
                            
                            
                            <td>
                               <strong> {cell.Value} </strong>
                            </td>
                           
                        
                        ))}

                        
                    </tr>
                    
                    ):(
                        
                    <tr>
                        <td></td>
                        {trnew.Cells.map((cell) =>(
                            
                            
                            <td>
                                {cell.Value}
                            </td>
                           
                        
                        ))}

                        
                    </tr>)}
                    
                
                    </>
                    ))}
            
                </>
        ) : ''}   
        
        </>

            
          ))}

         
            
            
        </tbody>
        </table>
        </div>
        );
           
    
    

}

export default BalanceSheetTable;
