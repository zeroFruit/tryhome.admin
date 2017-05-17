import axios from 'axios';

export const SITE_SELECTED      = 'SITE_SELECTED';
export const CREATE_ITEM        = 'CREATE_ITEM';
export const FETCH_ITEMS        = 'FETCH_ITEMS';
export const DELETE_ITEM        = 'DELETE_ITEM';
export const ITEM_SELECTED      = 'ITEM_SELECTED';
export const URL_REDIRECTED     = 'URL_REDIRECTED';
export const EDIT_SITE          = 'EDIT_SITE';
export const CHECK_SITE_EXIST   = 'CHECK_SITE_EXIST';
export const FETCH_SITE         = 'FETCH_SITE';
export const FETCH_ORDER_LIST   = 'FETCH_ORDER_LIST';
export const LOADING_SITE_DATA  = 'LOADING_SITE_DATA';
export const LOADING_ITEM_DATA  = 'LOADING_ITEM_DATA';
export const CHECK_FORM_ERR     = 'CHECK_FORM_ERR';

const CODE = {
  GET_SUCCESS: 0,
  GET_FAIL: 1,
  POST_SUCCESS: 20,
  POST_FAIL: 21,
  PUT_SUCCESS: 40,
  PUT_FAIL: 41,
  DELETE_SUCCESS: 60,
  DELETE_FAIL: 61,
  PARAMS_INSUFF: 100
};

const ROOT_URL = 'http://localhost:3000/api';

export function selectSite (site) {
  return {
    type: SITE_SELECTED,
    payload: site
  }
}

export function selectItem(item) {
  return {
    type: ITEM_SELECTED,
    payload: item
  }
}

export function urlRedirected ({ redirect }) {
  return {
    type: URL_REDIRECTED,
    payload: { redirect: false }
  };
}

export function createItem (formData) {
  const config = {
    'content-type': 'multipart/form-data'
  };
  const request = axios.post(`${ROOT_URL}/item`, formData, config);

  return (dispatch) => {
    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.POST_SUCCESS) {
        // error handling
      }
      alert('created item!');
      dispatch({ type: CREATE_ITEM, payload: { redirect: true }});
    })
  }
}

export function fetchItems ({ siteIndex }, page=0) {
  const request = axios.get(`${ROOT_URL}/item?siteIndex=${siteIndex}&page=${page}`);
  return (dispatch) => {
    dispatch({ type: LOADING_ITEM_DATA, payload: true });

    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.GET_SUCCESS) {
      }

      dispatch({ type: LOADING_ITEM_DATA, payload: false });
      dispatch({ type: FETCH_ITEMS, payload: res.data });
    })
    .catch(err => {
      console.log('fetchItems err', err);
    })
  };
}

export function deleteItem({ _id }) {
  const request = axios.delete(`${ROOT_URL}/item`, { data: { _id }});

  return (dispatch) => {
    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.DELETE_SUCCESS) {
        // error handling
      }
      dispatch({ type: DELETE_ITEM, payload: res.data });
    });
  }
}

export function editSite({ siteIndex, siteName, categories }) {
  const request = axios.put(`${ROOT_URL}/site`, { siteIndex, siteName, categories });

  return (dispatch) => {
    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.PUT_FAIL) {
        // error handling
      }
      dispatch({ type: EDIT_SITE, payload: res.data });
    })
  }
}

export function fetchSite({ siteIndex }) {
  const request = axios.get(`${ROOT_URL}/site?siteIndex=${siteIndex}`);

  return (dispatch) => {
    dispatch({ type: LOADING_SITE_DATA, payload: true });

    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.GET_SUCCESS) {
      }
      dispatch({ type: LOADING_SITE_DATA, payload: false });
      dispatch({ type: FETCH_SITE, payload: res.data });
    })
    .catch(err => {
      console.log('fetchSite err', err.toString());
    })
  }
}

export function checkSiteExist() {
  const request = axios.get(`${ROOT_URL}/site/exist`);

  return {
    type: CHECK_SITE_EXIST,
    payload: request
  }
}

export function fetchOrderList(index = 0) {
  const request = axios.get(`${ROOT_URL}/shoppinglist?index=${index}`);

  return dispatch => {
    request.then(res => {
      if (res.status !== 200 || res.data.code !== CODE.GET_SUCCESS) {
        // error handling
      }

      dispatch({
        type: FETCH_ORDER_LIST,
        payload: res.data
      });
    })
  }
}

export function checkFormErr(isErr) {
  return {
    type: CHECK_FORM_ERR,
    payload: isErr
  }
}
