import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DetailedPostView from "../Features/posts/DetailedPostView";
import Header from "../Components/Header";
import HomePage from "../Pages/HomePage";

// import Home from './Features/Home/Home';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route
					path="/"
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
