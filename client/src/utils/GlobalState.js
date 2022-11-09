import React, { createContext, useContext } from 'react';
import { useNewListingReducer } from './reducers';

const NewListingContext = createContext();
const { Provider } = NewListingContext;

const ListingProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useNewListingReducer({
        newListingImages: []
    });

    return <Provider value={[state, dispatch]} {...props} />
};

// const useNewListingContext = () => {
//     return useContext(NewListingContext);
// };

// export { ListingProvider, useStoreContext };

export { ListingProvider };