import React from 'react'
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header(){
  return (
    <div className="header">
        <div className="header-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" alt="logo" />
            <span>Drive</span>
        </div>

        <div className="header-search">
            <SearchIcon/>
            <input type="text" placeholder='Search in drive...'/>
            <TuneOutlinedIcon/>
        </div>

        <div className="header-icons">
            <span>
                <HelpOutlineIcon/>
                <SettingsOutlinedIcon/>
            </span>

            <span>
                <AppsOutlinedIcon/>
                <AccountCircleIcon/>
            </span>
        </div>
    </div>
  )
}
