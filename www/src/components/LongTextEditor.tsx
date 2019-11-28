import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EditorContext from "contexts/editorContext";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { FieldType } from "./Fields";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    test: { position: "absolute", top: 10, left: 10 },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: 600,
      width: "100%",
    },
    paper: { padding: theme.spacing(2) },
    root: {
      position: "relative",
      display: "flex",
      flexWrap: "wrap",
    },
    typography: {
      padding: theme.spacing(2),
    },
    textArea: {
      fontSize: 16,
      minWidth: 230,
      width: "100%",
    },
  })
);
interface Props {}

const LongTextEditor = (props: Props) => {
  const classes = useStyles();
  const editorContext = useContext(EditorContext);
  if (editorContext.fieldType !== FieldType.longText) return <></>;
  const isOpen = editorContext.editorValue !== null;
  return (
    <Modal
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
      onClose={(event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason === "escapeKeyDown") editorContext.cancel();
      }}
    >
      <Fade in={isOpen}>
        <Paper className={classes.paper}>
          <TextareaAutosize
            id={"TextareaAutosize"}
            className={classes.textArea}
            rowsMax={25}
            aria-label="maximum height"
            placeholder="enter text"
            defaultValue={editorContext.editorValue}
            autoFocus
            onChange={(e: any) => {
              editorContext.setEditorValue(e.target.value);
            }}
          />

          <Grid container justify="space-between">
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={editorContext.close}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={editorContext.cancel}
            >
              cancel
            </Button>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};
export default LongTextEditor;
