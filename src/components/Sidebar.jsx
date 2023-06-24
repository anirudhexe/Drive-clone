import React from "react";
import { useState } from "react";
import "./Sidebar.css";
import Button from "@mui/material/Button";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import { Modal } from "@mui/material";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFile = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

    const fileRef = ref(storage, `files/${file.name}`);

    const uploadTask = uploadBytesResumable(fileRef, file);

    // Monitor the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        setUploading(false);
        // Handle successful uploads on complete
        console.log("Upload successful");

        // Get the download URL of the uploaded file
        getDownloadURL(fileRef)
          .then((url) => {
            // Store the download URL in a variable
            const fileUrl = url;
            addFileToFirestore(fileUrl);
            // Do something with the URL
          })
          .catch((error) => {
            // Handle any errors
            console.log(error);
          });
      }
    );
  };

  function addFileToFirestore(fileUrl) {
    // Create a collection reference
    const filesCollection = collection(db, "files");

    // Add a new document with the download URL and any other data
    addDoc(filesCollection, {
      url: fileUrl,
      name: file.name,
      size: file.size,
      time: new Date()
      // any other data you want to store
    })
      .then((docRef) => {
        // Document written with ID: docRef.id
        console.log("Document added with ID: ", docRef.id);
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="modal-pop">
          <form>
            <div className="modal-heading">
              <h3>Select file you want to upload</h3>
            </div>

            <div className="modal-body">
              {uploading ? (
                <Button
                  variant="contained"
                  className="submit-btn"
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    backgroundColor: "green",
                  }}
                >
                  uploading
                </Button>
              ) : (
                <>
                  <input
                    onChange={handleFile}
                    type="file"
                    style={{
                      marginTop: "20px",
                      backgroundColor: "lightgray",
                      padding: "20px",
                      borderRadius: "5px",
                    }}
                  />
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    className="submit-btn"
                    style={{ marginTop: "20px", width: "100%" }}
                  >
                    Submit
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>

      <div className="sidebar">
        <div className="sidebar-btn">
          <Button
            onClick={handleOpen}
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "3px",
              borderRadius: "15px",
              marginLeft: "20px",
            }}
          >
            <span style={{ fontSize: "30px", marginLeft: "15px" }}>+</span>{" "}
            <span
              style={{
                textTransform: "none",
                marginLeft: "10px",
                marginRight: "15px",
              }}
            >
              New
            </span>{" "}
          </Button>
        </div>

        <div className="sidebar-options">
          <div className="option option-active">
            <MobileScreenShareIcon />
            <span>My Drive</span>
          </div>

          <div className="option">
            <DevicesIcon />
            <span>Computers</span>
          </div>

          <div className="option">
            <PeopleAltOutlinedIcon />
            <span>Shared with me</span>
          </div>

          <div className="option">
            <AccessTimeOutlinedIcon />
            <span>Recents</span>
          </div>

          <div className="option">
            <StarOutlineOutlinedIcon />
            <span>Starred</span>
          </div>

          <div className="option">
            <DeleteOutlineOutlinedIcon />
            <span>Trash</span>
          </div>

          <div className="option">
            <CloudOutlinedIcon />
            <span>Storage</span>
          </div>

          <div className="progress-bar">
            <progress size="tiny" value="50" max="100" />
            <span>6.9 GB of 15 GB used</span>
          </div>
        </div>
      </div>
    </>
  );
}
