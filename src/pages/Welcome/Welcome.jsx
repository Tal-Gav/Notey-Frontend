import { Box, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import saveNoteIcon from "../../assets/v.svg";
import arrowImg from "../../assets/WelcomePage/arrow.png";
import vortexImg from "../../assets/WelcomePage/vortex.png";
import noteImg from "../../assets/WelcomePage/note.png";
import whiteBackground from "../../assets/white.jpg";
import { clearNoteFields } from "../../store/newNoteSlice";
import NewNote from "../../components/NewNote";
import { accountsURL, axiosConfig, notesURL } from "../../constants";
import { addNote } from "../../store/notesSlice";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const newNoteTitle = useSelector((state) => state.newNote.title);
  const newNoteContent = useSelector((state) => state.newNote.content);

  const setAccountData = (account) => {
    console.log(account);
    setId(account._id);
    setEmail(account.email);
    setFirstName(account.firstName);
    setLastName(account.lastName);
  };

  const getAccountData = async () => {
    axios
      .get(accountsURL + "/details", axiosConfig)
      .then((res) => {
        setAccountData(res.data.account);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveNote = async () => {
    try {
      const newNote = { title: newNoteTitle, content: newNoteContent };
      const res = await axios.post(notesURL, newNote, axiosConfig);
      const newNoteWithId = { ...newNote, _id: res.data._id };
      dispatch(addNote(newNoteWithId));
      dispatch(clearNoteFields());
      navigate("/notes");

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        overflow: "hidden",
        backgroundImage: `url(${whiteBackground})`,
        backgroundSize: "cover",
      }}
    >
      <Box pt={2} pl={4} flexDirection={"row"} display={"flex"}>
        <Box>
          <Box>
            <Typography
              color={"#6F00FF"}
              fontSize={"6em"}
              fontFamily={"Outfit-ExtraBold"}
            >
              Hi {firstName}!
            </Typography>
            <Typography
              color={"#6F00FF"}
              fontSize={"4em"}
              fontFamily={"Outfit-Regular"}
              letterSpacing={2}
            >
              Start your first note now
            </Typography>
          </Box>

          <Box display={"flex"} pl={6} pt={2}>
            <NewNote />
            <Box display="flex" alignItems="center" justifyContent="center">
              <IconButton
                form="note"
                type="submit"
                onClick={handleSaveNote}
                style={{
                  height: "50px", // Set a fixed height
                  width: "50px", // Set a fixed width
                }}
              >
                <img
                  src={saveNoteIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                    filter:
                      "invert(10%) sepia(100%) saturate(5422%) hue-rotate(267deg) brightness(108%) contrast(128%)",
                  }}
                  alt="Save Note"
                />
              </IconButton>
            </Box>
            <Box>
              <img
                src={arrowImg}
                style={{
                  width: "20vh",
                  height: "20vh",
                }}
                alt="Save Note"
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box pl={45}>
            <img
              src={vortexImg}
              style={{
                width: "44vh",
                height: "40vh",
              }}
              alt="Save Note"
            />
          </Box>
          <Box pl={5}>
            <img
              src={noteImg}
              style={{
                width: "54vh",
                height: "50vh",
              }}
              alt="Save Note"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
