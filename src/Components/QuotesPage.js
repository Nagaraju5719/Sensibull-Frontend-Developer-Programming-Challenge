import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'

const Quotespage = () => {
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])

    const location = useLocation()
    const pramValue = location?.state?.id


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${pramValue}`);
        const qouteData=response.data.payload[pramValue]
        setData(qouteData)
        setColumns(Object.keys(qouteData[0]))
    }

    return (
        <>
        <Typography variant='h6'>QUOTE NAME : {pramValue}</Typography>
        <table>
            <thead>
                <tr>
                    {columns?.map((columnHead, index) => <th key={`${index}-${columnHead}`}>{columnHead}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((quoteData, index) => {
                    return (
                        <tr key={index}>
                            {Object.values(quoteData)?.map((value, index) => <td key={`${value} ${index}`}>{value}</td>)}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
       
    )
}

export default Quotespage
