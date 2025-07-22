import {parse} from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

interface Data{
    name:string,
    email:string,
    password:string
}


export default async function readCSVFile(filePath:string){

    const records =  parse(fs.readFileSync(path.join(__dirname, `${filePath}`)),
    {columns:true,
    skipEmptyLines:true
    })
return records
}
// const filePath1 = "../../test-data/dev/userdata.csv'"

// const csvfile = await readCSVFile(filePath1)
// for (const record of  csvfile){
//     console.log(record)

// }