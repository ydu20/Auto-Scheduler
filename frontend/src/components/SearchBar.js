
const SearchBar = ({setSearchQuery}) => {
    return (
        <div className = "search-bar">
            <input 
                onInput = {e => setSearchQuery(e.target.value)}
                type = "text"
                placeholder = "Course Search"
                name = "s"
            />
        </div>
    )
}

export default SearchBar;