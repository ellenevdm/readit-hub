import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DetailedPostView from "../Features/posts/DetailedPostView";
import HomePage from "../Pages/HomePage";
import logo from "../logo.svg";

// import Home from './Features/Home/Home';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/reddit-project"
					element={<HomePage />}
				/>
				<Route
					path="/posts/:postId"
					element={<DetailedPostView />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
