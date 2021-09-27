import { 
  SET_MANUSCRIPT_ID, 
} from "../constants";

export const initialManuscriptId = {
  manuscriptId: 'poop'
}

export const manuscriptIdReducer = (state = initialManuscriptId, { payload, type }) => {

  switch (type) {
      case SET_MANUSCRIPT_ID:
          //console.log(`manuscriptIdReducer =>\n\tvalue of state ${JSON.stringify(state)}\n\tvalue of id ${JSON.stringify(payload)}\n\tvalue of type ${type}`)
          return {
              manuscriptId: payload.manuscriptId
          };
      default:
          return state;
  }
}