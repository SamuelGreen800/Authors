import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { useParams} from 'react-router-dom';


const EditAuthor = () => {
    const {id} = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState({});
    const [authorNotFoundError, setAuthorNotFoundError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/author/${id}`)
        .then((response) => {
            console.log(response.data);
            setAuthorName(response.data.name);
        })
        .catch((err) => {
            console.log(err.response);
            setAuthorNotFoundError('Author not found. Please try again.')
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/author/${id}`, {name: authorName})
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
                {authorNotFoundError ? (<div>
                    <Typography variant='h4' sx={{color: 'red', ml: 10, mb: 2}}> {authorNotFoundError} </Typography>
                    <Link to="/new" style={{marginLeft: 230, fontSize: 30 }}>Add a new author!</Link>
                </div>) : null}
                
                    
                <Paper elevation={12} sx={{px: 8, py: 4, m: 5, border: "solid", width: 520}}>
                    <TextField label="Author Name:"
                        variant='filled' 
                        sx={{width: 500, mt: 3}}
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}>
                    </TextField>
                    { errors.name ? 
                        <Typography variant='p' sx={{ml: 1, color: "red", fontWeight: "bold", fontStyle: "italic"}}>{errors.name.message}</Typography>
                        : null
                    }
                    <Button variant="contained" value={authorName} type="submit" sx={{ mx: 25, my: 2}} >Submit</Button>
                </Paper>
            </form>
        </div>
        )
}
export default EditAuthor;