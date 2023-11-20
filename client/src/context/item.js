import React from 'react';
import { useState } from "react";

const ItemContext = React.createContext();

function ItemProvider({children}) {
    const [item, setItem] = useState([])

    return (
        <ItemContext.Provider value={{item, setItem}}>
            {children}
        </ItemContext.Provider>
    );
}

export { ItemContext, ItemProvider};