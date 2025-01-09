const LOADING = "store/LOADING";
const DONE_LOADING = "store/DONE_LOADING";

/**
 *
 * @param {Array} compsToLoad
 */
export function setCompsLoading(compsToLoad) {
  return { type: LOADING, payload: compsToLoad };
}

/**
 *
 * @param {Array} compsToUnLoad
 */
export function setCompsUnLoading(compsToUnLoad) {
  return { type: DONE_LOADING, payload: compsToUnLoad };
}

function loadComps(state, toLoad, bool) {
  let compsCopy = structuredClone(state.loadingComps);
  if (Array.isArray(toLoad)) {
    for (let i = 0; i < toLoad.length; i++) {
      compsCopy = { ...compsCopy, [toLoad[i]]: bool };
    }
  } else {
    compsCopy = { ...compsCopy, [toLoad]: bool };
  }
  return { ...state, loadingComps: compsCopy };
}

const DEFAULT_STATE = { loadingComps: {} };
export default function loadingReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADING: {
      return loadComps(state, action.payload, true);
    }
    case DONE_LOADING: {
      return loadComps(state, action.payload, false);
    }
    default:
      return state;
  }
}

export function selectLoadingState(state) {
  return state.loading.loadingComps;
}
