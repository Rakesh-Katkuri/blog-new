import { configureStore} from "@reduxjs/toolkit";
import likesSlice from "./reducer/likesSlice";

export const store = configureStore({
    reducer: {
        likes: likesSlice,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,})
})