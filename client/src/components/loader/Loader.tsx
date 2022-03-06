import React from 'react'
// MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
    loading: Boolean;
    error: Boolean;
}

const Loader: React.FC<Props> = ({loading, error}) => {
    return (
        <>
            <br />
            <br />

            {/* Show loading until results */}
            {loading &&  <h2>Loading ...</h2>}
            {loading &&     <Box sx={{ display: 'flex' }} style={{justifyContent: 'center', fontSize: '3em'}}>
                                <CircularProgress />
                            </Box>}

            {/* Display error message if present */}
            {error && <h4 style={{color:'red'}}>Error with your request!</h4>}
        </>
    )
}

export default Loader
