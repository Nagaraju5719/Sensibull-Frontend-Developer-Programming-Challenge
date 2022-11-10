import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios"
import {  TextField, } from "@mui/material"
import { Link } from 'react-router-dom'

const Stockspage = () => {
    const [instrumentsData, setInstrumentsData] = useState([])
    const [columns, setColumns] = useState([])
    const [name, setName] = React.useState('');




    const handleChange = (event) => {
        const searchValue = event.target.value
        setName(searchValue);

    };

    useEffect(() => {
        fetchData();
    }, []);

  

    const fetchData = async () => {
        const response = await axios.get('https://prototype.sbulltech.com/api/v2/instruments');
        const csvHeader = response.data.slice(0, response.data.indexOf("\n")).split(",");
        const csvRows = response.data.slice(response.data.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        setInstrumentsData(array)
        setColumns(Object.keys(array[0]))

    };

    return (
        <>
            <TextField
                id="outlined-name"
                label="Name"
                placeholder='Search'
                value={name}
                onChange={handleChange}
            />
            <table>
                <thead>
                    <tr>

                        {columns?.map((key, index) => {
                            if (index === 0) {
                                return (
                                    <th style={{ color: "blue" }}>{key}</th>
                                )

                            }
                            else {
                                return (
                                    <th key={`${key} ${index}`}>{key}</th>
                                )

                            }
                        }
                        )}

                    </tr>
                </thead>
                <tbody>
                    {instrumentsData.map((rowVal, index) => {
                        return (
                            <tr key={index}>
                                {Object.values(rowVal)?.map((value, index) => {
                                    if (index === 0) {
                                        return (
                                            <Link to={`/quotes/${value}`} state={{ id: `${value}` }} > <td style={{ color: "blue" }} key={`${value} ${index}`} >{value}</td>
                                            </Link>
                                        )
                                    }
                                    else {
                                        return (
                                            <td key={`${value} ${index}`}>{value}</td>
                                        )
                                    }
                                }
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Stockspage
