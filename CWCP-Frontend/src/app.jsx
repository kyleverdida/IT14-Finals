import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Elements
import Main from "./MAINPAGE/main.jsx";
import Mod from "./MODERATOR/login.jsx";
import Credits from './Credits/credits.jsx'
import LoadingScreen from "./LoadingScreen/loadingscreen.jsx"
import Error from "./Error/error.jsx";
import Statistics from "./Stats/statistics.jsx";
function App() {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, []);

  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <div id="main">
            <Main />
            <Credits/>
          </div>
          
        </>
      ),
    },
    {
      path: "/mod",
      element: <Mod />,
    },
    {
      path: "/dashboard",
      element: (
        <>
          <div id="main">           
            <Main />
            <Statistics/>
          </div>
        </>
      ),
    },
    {
      path:"*",
      element:(
        <>
          <Error/>
        </>
      )
    },
    {
      path: "/statistics",
      element: (
        <>
          <div id="main">           
            <Statistics/>
          </div>
        </>
      ),
    },
  ]);

  return (
    <div>
      {loading ? (
        <LoadingScreen/>
      ) : (
        <RouterProvider router={route} />
      )}
    </div>
  );
}

export default App;
