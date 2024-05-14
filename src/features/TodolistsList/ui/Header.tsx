import React, {useEffect} from "react"
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../auth/model/auth.selectors";
import {useActions} from "../../../common/hooks/index";
import {authThunks} from "../../auth/model/auth.slice";
import {selectAppStatus, selectIsInitialized} from "../../../app/app.selectors";

const Header = () => {

    const status = useSelector(selectAppStatus);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const logoutHandler = () => logout();
    const {initializeApp, logout} = useActions(authThunks);

    useEffect(() => {
        initializeApp();
    }, []);

    const isInitialized = useSelector(selectIsInitialized);

    if (!isInitialized) {
        return (
            <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    {isLoggedIn && (
                        <Button color="inherit" onClick={logoutHandler}>
                            Log out
                        </Button>
                    )}
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
        </>
    )
}

export default Header;