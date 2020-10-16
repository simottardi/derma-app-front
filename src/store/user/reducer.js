import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  HOMEPAGE_UPDATED,
  STORY_POST_SUCCESS,
  STORY_DELETE_SUCCESS
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  homepage: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case HOMEPAGE_UPDATED:
      return {
        ...state,
        homepage: { ...action.payload, stories: state.homepage.stories }
      };

    case STORY_POST_SUCCESS:
      return {
        ...state,
        homepage: {
          ...state.homepage,
          stories: [...state.homepage.stories, action.payload]
        }
      };

    case STORY_DELETE_SUCCESS:
      const storyId = action.payload;
      const newStories = state.homepage.stories.filter(
        story => story.id !== storyId
      );
      return {
        ...state,
        homepage: {
          ...state.homepage,
          stories: newStories
        }
      };

    default:
      return state;
  }
};
