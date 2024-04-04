import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import DetailedPostView from "../Features/posts/DetailedPostView";
import HomePage from "../Pages/HomePage";
import Header from "../Components/Header";

// import Home from './Features/Home/Home';

const App = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route
                    path="/reddit-project"
                    element={<HomePage/>}
                />
                <Route
                    path="/posts/:postId"
                    element={<DetailedPostView/>}
                />
            </Routes>
        </Router>
    );
};

export default App;
