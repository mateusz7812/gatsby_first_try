import React from 'react';
import './index.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form
        action="/"
        method="get"
        autoComplete="off"
    >
        <label htmlFor="header-search">
            <span className="visually-hidden">
                Search blog posts
            </span>
        </label>
        <input
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s"
        />
        <button type="submit">Search</button>
    </form>
);

export const unFlattenResults = results =>
    results.map(post => {
        const { date, slug, author, title } = post;
        return { fields:{ slug } , frontmatter: { title, date, author } };
    });

export default SearchBar;