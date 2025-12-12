import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Elements
import Main from "./MAINPAGE/main.jsx";
import Mod from "./MODERATOR/login.jsx";
import Credits from './Credits/credits.jsx'
import LoadingScreen from "./LoadingScreen/loadingscreen.jsx"
import Error from "./Error/error.jsx";
import Statistics from "./Stats/statistics.jsx";
import GMap from "./GMAP/gmap.jsx";

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
                    <div id="main" style={{ display: 'flex', flexDirection: 'row' }}>
                        
                        <Main />
                        <div style={{ position: 'sticky', top: 0, height: '100vw', overflowY: 'visible', flex: '0 0 350px' }}>
                            <Statistics />
                        </div>
                        {/* GMap added to the /dashboard view */}
                    </div>

                </>
            ),
        },
        {
            path: "/mod",
            element: <Mod />, // No GMap here
        },
        {
            path: "/dashboard",
            element: (
                <>
                    <div id="main" style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'visible', flex: '0 0 350px' }}>
                            <Statistics />
                        </div>
                        <Main />
                        {/* GMap added to the /dashboard view */}
                    </div>
                </>
            ),
        },
        {
            path: "*",
            element: (
                <>
                    <Error />
                </>
            )
        },
        {
            path: "/statistics",
            element: (
                <>
                    <div id="main">
                        <Statistics />
                    </div>
                </>
            ),
        },
    ]);

    return (
        <div>
            {loading ? (
                <LoadingScreen />
            ) : (
                <RouterProvider router={route} />
            )}

        </div>
    );
}

export default App;