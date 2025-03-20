type Props = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  };
  
  const SearchBar = ({ searchQuery, setSearchQuery }: Props) => {
    return (
      <input
        type="text"
        placeholder="Search engineers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
      />
    );
  };
  
  export default SearchBar;
  