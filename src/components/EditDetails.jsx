import React, {useState, useEffect} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {editUserDetails} from "../redux/userReducer";
import PropTypes from "prop-types";
import EditIcon from '@material-ui/icons/Edit'
import Button from "@material-ui/core/Button";
import MyButton from "../util/MyButton";

const styles=(theme)=>({
    button:{
        float:'right'
    }
});

function EditDetails({classes, credentials, editUserDetails}) {
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [open, setOpen] = useState(false);
    const mapUserDetailsToState=(credentials)=>{
        setBio(credentials.bio);
        setWebsite(credentials.website);
        setLocation(credentials.location)
    };
    useEffect(()=>{
        if (!credentials){
            mapUserDetailsToState(credentials);
            console.log('test')
        }
    });
    const handleOpen=()=>{
        setOpen(true);
        mapUserDetailsToState(credentials)
    };
    const handleClose=()=>{
        setOpen(false);
    };
    const handleSubmit=()=>{
        const userDetails={
            bio: bio,
            website: website,
            location: location
        };
        editUserDetails(userDetails);
        handleClose()
    };

    return (
        <>
            <MyButton tip='Edit details' onClick={handleOpen} btnClassName={classes.button}>
                <EditIcon color='primary'/>
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth
                    maxWidth='sm'>
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField name='bio' type='text' label='Bio'
                                   multiline rows='3'
                                   placeholder='A short bio about yourself'
                                   className={classes.textField}
                                   value={bio}
                                   onChange={e=>setBio(e.target.value)}
                                   fullWidth/>
                        <TextField name='website' type='text' label='Website'
                                   multiline rows='3'
                                   placeholder='Your personal/professional website'
                                   className={classes.textField}
                                   value={website}
                                   onChange={e=>setWebsite(e.target.value)}
                                   fullWidth/>
                        <TextField name='location' type='text' label='Location'
                                   multiline rows='3'
                                   placeholder='Where you live'
                                   className={classes.textField}
                                   value={location}
                                   onChange={e=>setLocation(e.target.value)}
                                   fullWidth/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color='primary'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps,{editUserDetails})(withStyles(styles)(EditDetails))