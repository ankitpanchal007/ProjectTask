import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table'
import { useState } from 'react';
import LeaderBoard from '../Data/LeaderBoard.json';

export const CustomTable = () => {
     const [SearchValue, setSearchValue] = useState("");
        
    let Columns = useMemo(() =>
        [{ Header: 'Name', accessor: 'name' },
        { Header: 'Rank', accessor: 'stars' },
        { Header: 'No Of Bananas', accessor: 'bananas',
       }], []);
    let CompleteData = (Object.values(LeaderBoard));
    let obj = (Object.values(LeaderBoard));

    obj.sort(function (a, b) {
        return b.bananas - a.bananas;
    });

    obj = obj.slice(0, 10);
    
   
    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    if (SearchValue.length > 0) { 
        CompleteData.filter((a) => {
            if (a.name === SearchValue) {
                obj.splice(9, 1, a)
                console.log(obj);
            }
        });
    }
   
    const data =  obj;
    const tableInstance = useTable({ columns: Columns, data: data })
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <>
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={SearchValue} />


            <table style={{ border: '2px solid black' }} {...getTableProps()}>
                <thead style={{ backgroundColor: "grey" }}>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th  {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>
                <tbody style={{ textAlign: 'start' }}{...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}



