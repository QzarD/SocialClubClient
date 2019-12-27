import React, {useState, useEffect} from 'react';
import {Grid} from "@material-ui/core";
import axios from 'axios';
import Scream from "../components/Scream";

export default function Home() {
    const [screams, setScreams]=useState(null);
    useEffect(()=>{
        if (!screams){
        axios.get('/screams')
            .then(res=>{
                setScreams(res.data)
            })
            .catch(err=>console.log(err))}
    });
    let recentScreamsMarkup=screams
    ? (screams.map(scream=> <Scream key={scream.screamId} scream={scream}/>))
        : (<p>Loading...</p>);

    return (
        <Grid container spacing={6}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Content...</p>
            </Grid>
        </Grid>
    );
}

