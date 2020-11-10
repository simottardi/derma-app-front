import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import { selectTokenDoctor } from "../../store/doctor/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  alignItemsAndJustifyContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Navigation() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = useSelector(selectToken);
  const tokenDoctor = useSelector(selectTokenDoctor);
  console.log("token", token, "tokenDoc", tokenDoctor);

  const loginLogoutControls =
    token || tokenDoctor ? <LoggedIn /> : <LoggedOut />;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DermaApp
          </Typography>

          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={handleMenu}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
              onClick={handleClose}
              className={classes.alignItemsAndJustifyContent}
            >
              {!token && !tokenDoctor ? (
                <NavbarItem onClick={handleMenu} path="/" linkText="Home" />
              ) : null}
              {token ? (
                <NavbarItem
                  onClick={handleClose}
                  path="/myhomepage"
                  linkText="My Page"
                />
              ) : null}
              {token ? (
                <NavbarItem
                  path="/myhistory"
                  linkText="My history"
                  onClick={handleClose}
                />
              ) : null}
              {tokenDoctor ? (
                <NavbarItem
                  path="/doctor/homepage"
                  linkText="Doctor Homepage"
                  onClick={handleClose}
                />
              ) : null}
              {loginLogoutControls}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
