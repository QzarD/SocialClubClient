import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import Scream from "../components/Scream";
import Profile from "../components/Profile";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getScreams} from "../redux/dataReducer";

function Home({data:{screams, loading}, getScreams}) {
    useEffect(()=>{
    if (screams.length===0 && loading===false){
        getScreams();}
    });
    let recentScreamsMarkup= (!loading)
    ? (screams.map(scream=> <Scream key={scream.screamId} scream={scream}/>))
        : (<p>Loading...</p>);

    return (
        <Grid container spacing={6}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile/>
            </Grid>
        </Grid>
    );
}

Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps =(state)=> ({
    data: state.data
});

export default connect(mapStateToProps,{getScreams})(Home)