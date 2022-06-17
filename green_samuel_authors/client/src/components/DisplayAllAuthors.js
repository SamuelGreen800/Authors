import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { color } from "@mui/system";


const DisplayAllAuthors = () => {
    const [allAuthors, setAllAuthors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/author')
        .then( res => {
            console.log(res.data)
            setAllAuthors(res.data)

        })
        .catch( err => {
            console.log("oops")
        })
    }, [] );

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            
        },
        }));

        const handleDelete = (idFromBelow) => {
            axios
                .delete(`http://localhost:8000/api/author/${idFromBelow}`)
                .then((response) => {
                console.log("success deleting author");
                console.log(response);
                const filteredAuthors = allAuthors.filter((author) => {
                    return author._id !== idFromBelow;
                });
                setAllAuthors(filteredAuthors);
            })
            .catch((err) => {
                console.log("Delete failed", err.response);
            });
        };
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));



    return (
        <div>
            <Link to="/new" style={{marginLeft: 50, textDecoration: "none"}}>Add an Author</Link>
            <Typography variant='p' sx={{color: "purple", mx: 7, mt: 2, fontWeight: "bold", display: "block"}}>We have quotes by...</Typography>
            <TableContainer component={Paper} sx={{width: 700, m: 2}}>
                <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: 400}}>Author:</StyledTableCell>
                        <StyledTableCell sx={{px: 10, width: 100}}>Actions:</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allAuthors.map((author, index) => {
                        return (
                            <StyledTableRow key={author._id}>
                                <StyledTableCell sx={{fontWeight: "bold"}}>{author.name}</StyledTableCell>
                                
                                <StyledTableCell>
                                <Link to={`/edit/${author._id}`}>
                                    <Button  sx={{mx: 1, boxShadow: 3}} variant="contained">Edit</Button>
                                </Link>
                                    <Button sx={{mx: 1, boxShadow: 3, bgcolor: "error.main"}} variant="contained"
                                    onClick={() => handleDelete(author._id)}
                                    >Delete</Button>
                                </StyledTableCell>
                                


                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    
    )
};


export default DisplayAllAuthors