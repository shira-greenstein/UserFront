//React
import * as React from "react";
import { useEffect } from "react";

//Redux
import { getCustomersByUser } from "./redux/actions/customerAction";
import { useDispatch } from "react-redux";

//Route
import { Route, Routes } from "react-router-dom";

//Component
import Login from "./component/login/Login";
import Home from "./component/home/Home";
import Edit from "./component/edit/Edit";

//Style
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { checkToken } from "./service/service";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const user = await checkToken();
      if (!user) {
        navigate("/login");
      } else {
        dispatch(getCustomersByUser());
        navigate(`/home`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
