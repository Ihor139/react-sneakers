import React from "react";

import { ReactComponent as SearchIco } from "../../media/svg/search-ico.svg";
import { ReactComponent as ClearInput } from "../../media/svg/search-clear.svg";
import { useStateContext } from "../ContextProvider";

import styles from "./Search.module.scss";

function Search() {
  const { searchValue, setSearchValue } = useStateContext();

  return (
    <>
      <div className={styles.search}>
        <span className={styles.ico}>
          <SearchIco width="20" height="20" />
        </span>
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className={styles.input}
          placeholder="Search..."
        />
        {searchValue && (
          <div className={styles.btn} onClick={() => setSearchValue("")}>
            <ClearInput />
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
