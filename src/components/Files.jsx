import React, { useEffect, useState } from "react";
import "./Files.css";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ListIcon from "@mui/icons-material/List";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Files() {
  const [files, setFiles] = useState([]);
  //for jora tapki mara dropdown button
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // create a reference to your firestore collection
    const ref = query(collection(db, "files"));

    // fetch all the documents from the collection
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      // create a new array of objects with data and id properties
      const filesArray = querySnapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));

      // store the new array in a state variable
      setFiles(filesArray);
    });
    return () => unsubscribe();
  }, []);

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KB",
      "MB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const handleDelete = async(file) => {
    await deleteDoc(doc(db,'files', file.id));
    handleClose();
  };

  return (
    <div className="files">
      <div className="files-header">
        <div className="header-left">
          <span>Menu</span>
          <ArrowDropDownOutlinedIcon />
        </div>

        <div className="header-right">
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </div>

      <div className="files-content">
        <div className="grid-view">
          {files.map((file) => {
            return (
              <div className="container">
                <a
                  href={file.data.url}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <InsertDriveFileIcon />
                </a>
                <div style={{display: 'grid', gridTemplateColumns: '160px 30px', alignItems: 'center', backgroundColor: 'whitesmoke',borderTop: '1px solid gray'}}>
                <p>
                  {file.data.name}
                </p>
                  <Button
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{height: '20px', }}
                  >
                    <MoreVertIcon style={{height: '20px'}}/>
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={()=>handleDelete(file)}>Delete</MenuItem>
                    
                  </Menu>
                </div>
              </div>
            );
          })}
        </div>

        <div className="list-view">
          <div className="details">
            <p>
              <b>Name</b>{" "}
              <b>
                <ArrowDropDownIcon />
              </b>
            </p>
            <p>
              <b>Owner</b>
            </p>
            <p>
              <b>Last modified</b>
            </p>
            <p>
              <b>File size</b>
            </p>
          </div>

          {files.map((file) => {
            return (
              <div className="details">
                <a
                  href={file.data.url}
                  target=""
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p>
                    <InsertDriveFileIcon /> {file.data.name}
                  </p>
                </a>

                <p>Me</p>
                <p>few seconds ago</p>
                <p>{formatBytes(file.data.size)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
