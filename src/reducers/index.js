
import { combineReducers } from 'redux';

import user from './user';
import chat from './chat';
const combined = combineReducers({ user ,chat});
export default combined;
