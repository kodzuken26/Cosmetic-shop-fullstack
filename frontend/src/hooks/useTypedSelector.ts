import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "../store/reducers";

export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector