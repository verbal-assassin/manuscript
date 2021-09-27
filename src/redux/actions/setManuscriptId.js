import { SET_MANUSCRIPT_ID } from "../constants";

export const setManuscriptId = (id) => ({
  type: SET_MANUSCRIPT_ID,
  payload: {manuscriptId: id}
})

export default setManuscriptId