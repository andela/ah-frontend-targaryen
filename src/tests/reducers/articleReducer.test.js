import articlesReducer from '../../reducers/articlesReducer';
import { GET_ALL_ARTICLES_SUCCESS } from '../../actions/types';

describe('article Reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      articlesPayload: {},
    };
  });

  it('should run initial state', () => {
    expect(articlesReducer(initialState, {})).toEqual(initialState);
  });
  it('should return all articles', () => {
    const action = {
      type: GET_ALL_ARTICLES_SUCCESS,
      payload: [{ author: 1 }],
    };
    const currentState = articlesReducer(initialState, action);
    expect(currentState).toEqual({
      articlesPayload: action.payload,
    });
  });
});
