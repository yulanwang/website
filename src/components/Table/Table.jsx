import React from 'react';

import './Table.css';

const tableData = [
    {
        semester: "Fall",
        infoSession: "September 7th 2022",
        start: "September 14th 2022",
        end: "November 22nd 2022"
    },
    {
        semester: "Spring",
        infoSession: "January 15th 2023",
        start: "January 22nd 2023",
        end: "April 2nd 2023"
    },
]

export default function Table() {
    return (
        <div className='tableContainer'>
            <table>
                <tr>
                    <th> </th>
                    <th><h4>Info Session</h4></th>
                    <th><h4>Start</h4></th>
                    <th className='endCell'><h4>End</h4></th>
                </tr>
                {tableData.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td className='semesterCell'><h4>{val.semester}</h4></td>
                            <td className='infoSessionCell'><p>{val.infoSession}</p></td>
                            <td className='startCell'><p>{val.start}</p></td>
                            <td classsName='endCell'><p>{val.end}</p></td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}