import {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {Box} from "@mui/material";
import Button from "@mui/material/Button";

const ButtonBack: FC = () => {
    const navigate = useNavigate()
    return (
        <Box sx={{margin: '10px'}}>
            <Button color="primary"
                    sx={{color: 'white', backgroundColor: '#808386', marginTop: '3px'}}
                    onClick={() => navigate(-1)}>BACK</Button>
        </Box>
    );
};

export {ButtonBack};