import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type AvatarStyle = "2d" | "semi" | "3d"

type AvatarState = {
  selfieUrl?: string
  avatarUrl?: string
  style: AvatarStyle
  overlayProductImage?: string
  processing: boolean
}

const initialState: AvatarState = {
  style: "2d",
  processing: false,
}

const slice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setSelfie(state, action: PayloadAction<string | undefined>) {
      state.selfieUrl = action.payload
    },
    setAvatar(state, action: PayloadAction<string | undefined>) {
      state.avatarUrl = action.payload
    },
    setStyle(state, action: PayloadAction<AvatarStyle>) {
      state.style = action.payload
    },
    setOverlayProduct(state, action: PayloadAction<string | undefined>) {
      state.overlayProductImage = action.payload
    },
    setProcessing(state, action: PayloadAction<boolean>) {
      state.processing = action.payload
    },
  },
})

export const { setSelfie, setAvatar, setStyle, setOverlayProduct, setProcessing } = slice.actions
export default slice.reducer
