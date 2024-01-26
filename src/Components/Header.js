import { setSearchTerm, selectSearchTerm } from "../store/redditSlice";
import { useSelector, useDispatch } from "react-redux";

import React from 'react';


function Header(props) {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value));
    }
    return (
        <div>
            
        </div>
    );
}

export default Header;