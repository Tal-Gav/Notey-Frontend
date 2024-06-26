import { Box, IconButton } from "@mui/material";
import createNoteIcon from "../../assets/create-note.svg";
import discardNoteIcon from "../../assets/x.svg";
import saveNoteIcon from "../../assets/v.svg";
import { setIsCreateNoteMode } from "../../store/isCreateNoteModeSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addNote } from "../../store/notesSlice";
import { useEffect } from "react";
import { clearNoteFields } from "../../store/newNoteSlice";
import { axiosConfig, notesURL } from "../../constants";

const CreateNoteButton = () => {
  const dispatch = useDispatch();
  const isCreateNoteMode = useSelector((state) => state.isCreateNoteMode);
  const newNoteTitle = useSelector((state) => state.newNote.title);
  const newNoteContent = useSelector((state) => state.newNote.content);

  const handleSaveNote = async () => {
    try {
      const newNote = { title: newNoteTitle, content: newNoteContent };
      const res = await axios.post(notesURL, newNote, axiosConfig);
      console.log(res);
      const newNoteWithId = { ...newNote, _id: res.data._id };
      console.log(newNoteWithId);
      dispatch(addNote(newNoteWithId));
      dispatch(setIsCreateNoteMode(false));
      dispatch(clearNoteFields());

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Box>
      {isCreateNoteMode ? (
        <Box display={"flex"} flexDirection={"column"}>
          <IconButton form="note" type="submit" onClick={handleSaveNote}>
            <img
              src={saveNoteIcon}
              style={{
                width: "3vw",
                filter:
                  "invert(10%) sepia(100%) saturate(5422%) hue-rotate(267deg) brightness(108%) contrast(128%)",
              }}
              alt="Save Note"
            />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(setIsCreateNoteMode(false));
              dispatch(clearNoteFields());
            }}
          >
            <img
              src={discardNoteIcon}
              style={{
                width: "4vw",
                filter:
                  "invert(10%) sepia(100%) saturate(5422%) hue-rotate(267deg) brightness(108%) contrast(128%)",
              }}
              alt="Discard Note"
            />
          </IconButton>
        </Box>
      ) : (
        <IconButton
          onClick={() => {
            dispatch(setIsCreateNoteMode(true));
          }}
        >
          <img
            src={createNoteIcon}
            style={{
              width: "4vw",
              filter:
                "invert(10%) sepia(100%) saturate(5422%) hue-rotate(267deg) brightness(108%) contrast(128%)",
            }}
            alt="Create Note"
          />
        </IconButton>
      )}
    </Box>
  );
};

export default CreateNoteButton;
