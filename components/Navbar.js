import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../Context/Auth-context";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Bucket from "./Bucket";

const pagesForUser = ["Menu", "Orders"];
const pagesForAdmin = [
  "Menu",
  "Orders",
  "Dashboard",
  "Manage Menu",
  "Manage Orders",
  "Manage Tables",
  "QR",
];
const pages = ["Menu"];
const settings = ["Profile", "Logout"];

const Navbar = () => {
  const { loggedIn, loggedinUser, handleLogout } = useAuth();

  // console.log(loggedIn, loggedinUser);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (value) => {
    console.log(value);
    if (value === "Logout") {
      handleLogout();
    } else if (value === "Profile") {
      Router.push("/profile");
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const styles = {
    hoverStyle: {
      color: "red",
      "&:hover": { color: "blue !important" },
    },
  };

  return (
    <>
      {" "}
      {loggedIn ? (
        <AppBar
          className="mb-3 "
          style={{ backgroundColor: "#E6034D" }}
          position="static"
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    borderBottom: "none",
                    color: "white",
                  }}
                  href="/"
                >
                  <img
                    style={{ height: "50px" }}
                    src="/static/images/logofinal1.png"
                  />
                </Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {loggedinUser?.role === "user"
                    ? pagesForUser.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">
                            <Link
                              style={{
                                textDecoration: "none",
                                borderBottom: "none",
                              }}
                              href={`/${page.replace(/\s/g, "").toLowerCase()}`}
                            >
                              {page}
                            </Link>
                          </Typography>
                        </MenuItem>
                      ))
                    : pagesForAdmin.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">
                            <Link
                              style={{
                                textDecoration: "none",
                                borderBottom: "none",
                              }}
                              href={`/${page.replace(/\s/g, "").toLowerCase()}`}
                            >
                              {page}
                            </Link>
                          </Typography>
                        </MenuItem>
                      ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <Link
                  style={{ textDecoration: "none", borderBottom: "none" }}
                  href="/"
                >
                  <img
                    style={{ height: "50px" }}
                    src="/static/images/logofinal1.png"
                  />
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {loggedinUser?.role === "user"
                  ? pagesForUser.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        <Link
                          style={{
                            textDecoration: "none",
                            borderBottom: "none",
                          }}
                          href={`/${page.replace(/\s/g, "").toLowerCase()}`}
                        >
                          {page}
                        </Link>
                      </Button>
                    ))
                  : pagesForAdmin.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        <Link
                          style={{
                            textDecoration: "none",
                            borderBottom: "none",
                          }}
                          href={`/${page.replace(/\s/g, "").toLowerCase()}`}
                        >
                          {page}
                        </Link>
                      </Button>
                    ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {/* <Badge className="mx-3" badgeContent={4} color="secondary">
                  <i class="fas fa-shopping-basket"></i>
                </Badge> */}
                <div className="d-flex">
                  <Bucket />
                  {loggedIn ? (
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}

                  {loggedIn ? (
                    ""
                  ) : (
                    <Button
                      style={{ color: "white", border: "white" }}
                      variant="outlined"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                  )}
                </div>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseNavMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <AppBar
          className="mb-3 "
          style={{ backgroundColor: "#E6034D" }}
          position="static"
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <Link
                  style={{ textDecoration: "none", borderBottom: "none" }}
                  href="/"
                >
                  <img
                    style={{ height: "50px" }}
                    src="/static/images/logofinal1.png"
                  />
                </Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link
                          style={{
                            textDecoration: "none",
                            borderBottom: "none",
                          }}
                          href={`/${page.replace(/\s/g, "").toLowerCase()}`}
                        >
                          {page}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <Link
                  style={{ textDecoration: "none", borderBottom: "none" }}
                  href="/"
                >
                  <img
                    style={{ height: "50px" }}
                    src="/static/images/logofinal1.png"
                  />
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "none", borderBottom: "none" }}
                      href={`/${page.toLowerCase()}`}
                    >
                      {page}
                    </Link>
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {loggedIn ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}

                {loggedIn ? (
                  ""
                ) : (
                  <div className="d-flex">
                    <Bucket />
                    <Button
                      style={{ color: "white", border: "white" }}
                      variant="outlined"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </div>
                )}

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseNavMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
};
export default Navbar;
