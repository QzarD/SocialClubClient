import React from 'react';
import {Dialog, DialogActions, DialogTitle, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteScream} from "../redux/dataReducer";
import MyButton from "../util/MyButton";
import {DeleteOutline} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

const styles={
    deleteButton:{
        position: 'absolute',
        left: '90%',
        top: '5%'
    }
};

const DeleteScream=({classes, deleteScream, screamId})=>{
    const [open, setOpen]=React.useState(false);
    const handleOpen=()=>{
        setOpen(!open)
    };
    const deleteScreamHandle=()=>{
        deleteScream(screamId);
        setOpen(false)
    };

    return (
        <>
            <MyButton tip='Delete Scream' onClick={handleOpen}
                      btnClassName={classes.deleteButton}>
                <DeleteOutline color='secondary'/>
            </MyButton>
            <Dialog open={open} onClose={()=>setOpen(false)}
                    fullWidth maxWidth='sm'>
                <DialogTitle>
                    Are you sure want to delete this scream?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={deleteScreamHandle} color='secondary'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};


export default connect (null,{deleteScream})(withStyles(styles)(DeleteScream))