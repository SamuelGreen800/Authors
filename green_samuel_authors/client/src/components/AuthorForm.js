import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { Paper } from '@mui/material';


const AuthorForm= () => {
    const [ name, setName ] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/author", {name} )
            .then((response) => { 
                console.log(response);
                navigate("/"); 
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
                console.log(errors)
                });
    }

    return (
        <div>
            <Link to="/" style={{marginLeft: 60, textDecoration: "none"}}>Home</Link>
            <Typography variant="h5" sx={{mx: 32, my: 3, color: "purple"}}>Add an Author:</Typography>

            <form onSubmit={handleSubmit}>
                    
                <Paper elevation={12} sx={{px: 8, py: 4, m: 5, border: "solid", width: 520}}>
                    <TextField label="Author Name:"
                        variant='filled' 
                        sx={{width: 500, mt: 3}}
                        value={name}
                        onChange={(e) => setName(e.target.value)} name={name}>
                    </TextField>
                    { errors.name ? 
                        <Typography variant='p' sx={{ml: 1, color: "red", fontWeight: "bold", fontStyle: "italic"}}>{errors.name.message}</Typography>
                        : null
                    }
                    <Button variant="contained" value={name} type="submit" sx={{ mx: 25, my: 2}} >Submit</Button>
                </Paper>
            </form>
        </div>
    )
}
export default AuthorForm;

