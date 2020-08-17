import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    background: "blue",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  loginText: {
    textAlign: "center",
  },

  document: {
    backgroundColor: "#E9E9E9",
    borderRadius: "10px",
    padding: "60px 60px",
    boxShadow: "0 3px 5px 2px rgba(191, 191, 191, .3)",
  },
}));

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 80px",
  margin: "10px",
});

export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.document}>
        <div style={{ textAlign: "center" }}>
          <h1>LOGIN</h1>
        </div>
        <div>
          <TextField
            id="standard-full-width"
            label="Username"
            style={{ margin: 8 }}
            placeholder="Marcus"
            helperText="Your Username"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-full-width"
            label="Password"
            style={{ margin: 8 }}
            placeholder="MarcusIsNotMyPassword123"
            helperText="Your Password!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            type="password"
          />
          <div style={{ textAlign: "center" }}>
            <div style={{ padding: 10 }}>
              <MyButton>Proceed to login</MyButton> <br />
              <MyButton>I need a new account!</MyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
