import React, {FC} from 'react';
import {Outlet} from "react-router-dom";

import FormGroup from '@mui/material/FormGroup';

import {Header} from "../components";
import './layout.css'

interface IProps {
    toggleBgColor: ()=> void,
    bgColorHeader: string,
}

const MainLayout: FC<IProps> = ({toggleBgColor, bgColorHeader }) => {

    return (
        <FormGroup >
            <div className="layout" >
                <Header toggleBgColor={toggleBgColor} bgColorHeader={bgColorHeader}/>
                <Outlet/>
            </div>
        </FormGroup>
    );
}

export {MainLayout}