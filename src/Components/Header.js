import { fetchPosts, setSearchQuery } from "../store/redditSlice";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";

function Header() {
	const [searchQuery, setSearchQueryLocal] = useState("");
	const dispatch = useDispatch();

	const handleSearch = () => {
		dispatch(setSearchQuery(searchQuery));
		dispatch(fetchPosts({ searchQuery: searchQuery }));
	};

	return (
		<>
			{[false].map((expand) => (
				<Navbar
					key={expand}
					expand={expand}
					className="bg-body-tertiary mb-3"
				>
					<Container fluid>
						<Navbar.Brand href="#">Readit-Hub</Navbar.Brand>
						<Form className="d-flex">
							<Form.Control
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
								value={searchQuery}
								onChange={(e) => setSearchQueryLocal(e.target.value)}
							/>
							<Button
								variant="outline-success"
								onClick={handleSearch}
							>
								Search
							</Button>
						</Form>
						<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end"
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									Offcanvas
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Form className="d-flex">
									<Form.Control
										type="search"
										placeholder="Search"
										className="me-2"
										aria-label="Search"
									/>
									<Button variant="outline-success">Search</Button>
								</Form>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>
	);
}

export default Header;
