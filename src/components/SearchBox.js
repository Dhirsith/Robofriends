import React from 'react';

const SearchBox = ({ searchChange, value }) => (
    <div className="pa2">
        <label className="pa2" htmlFor="robot-search">Search robots by name</label>
        <input
            id="robot-search"
            className="pa3 ba b--green bg-lightest-blue"
            type="search"
            placeholder="Search robots"
            value={value}
            onChange={searchChange}
        />
    </div>
);

export default SearchBox;
