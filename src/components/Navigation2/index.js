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
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

import Menu from "@material-ui/core/Menu";
import { red } from "@material-ui/core/colors";

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
  selected: {
    flexGrow: 1,
    color: red,
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
          {/*     <NavbarItem path="/" linkText="DermaApp" /> */}

          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className="selected">
              <Button variant="contained" color="primary" disableElevation>
                DermaApp
              </Button>
            </NavLink>
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
