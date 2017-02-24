import Immutable from 'immutable';
import { Effects, loop } from 'redux-loop';
import config from 'config';
import axios from 'axios';
import * as actions from './actions';

const initialState = Immutable.fromJS({
    smileys: {},
    spotlight: undefined
});

function smileys() {
    return axios.get(config.api.HTTP_URL)
      .then(actions.receivePeople)
      .catch(console.error)
}


export default (state = initialState, action) => {
    switch (action.type) {

    case "FETCH_PEOPLE": {
        return loop(
            state,
            Effects.promise(smileys)
        )
    }

    case "RECEIVE_PEOPLE": {
        return state.set('smileys', Immutable.fromJS(action.data));
    }

    case "SEARCH": {
        const candidate = state.get('smileys').findEntry( entry => {
            let laa = entry.find( smile => {
                let name = smile.get('name');
                if (name) {
                    console.info("FOUND")
                    return name.toLowerCase().indexOf(action.name.toLowerCase()) >= 0
                } else {
                    return false;
                }
            });
            return laa !== undefined;

        });
        if (candidate) {
            return state.set("spotlight", candidate[0]);
        } else {
            return state.set("spotlight", undefined)
        }

    }

    default:
        return state;
    }
}

