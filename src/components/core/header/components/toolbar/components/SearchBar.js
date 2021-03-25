import { useState } from 'react';

export const SearchBar = props => {

  const activeTab = props.tablist[props.tablist.findIndex(el => el.active === true)];
  const [searchURL, setSearchURL] = useState(activeTab ? activeTab.url : '');
  const handleChange = (event) => {
    setSearchURL(event.target.value);
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      window.ipcRenderer.send('')
    }
  }

  return (
    <div className="flex flex-row items-center justify-start w-10/12 h-1/2 px-4 bg-night-tab-active rounded">
      <input
        className="w-full py-4 bg-transparent focus:outline-none text-gray-400 placeholder-gray-500"
        placeholder="Search or enter a URL"
        value={searchURL}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  )

}
