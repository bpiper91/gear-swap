import { UPDATE_NEW_LISTING_IMAGES } from '../utils/actions';
import { reducer } from '../utils/reducers';

const initialState = { newListingImages: [] };

test('UPDATE_NEW_LISTING_IMAGES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_NEW_LISTING_IMAGES,
        newListingImages: ['arbitraryURL', 'randomURL', 'uploadURL']
    });

    expect(newState.newListingImages.length).toBe(3);
    expect(initialState.newListingImages.length).toBe(0);
});