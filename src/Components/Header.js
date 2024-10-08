import { fetchPosts, setSearchQuery } from "../Store/redditSlice";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    // dispatch(setSearchQuery(searchQuery));
    dispatch(fetchPosts({ searchQuery: searchQuery }));
  };

  return (
    <>
      <Navbar>
        <Container fluid>
          <Navbar.Brand href="/">Readit-Hub</Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
