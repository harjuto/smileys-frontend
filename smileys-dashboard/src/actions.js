export function fetchPeople() {
    return {
        type: "FETCH_PEOPLE"
    }
}

export function receivePeople(response) {
    return {
        type: "RECEIVE_PEOPLE",
        data: response.data
    }
}

export function receiveSmiley(smiley) {
    return {
        type: "RECEIVE_SMILEY",
        smiley
    }
}

export function search(name) {
    return {
        type: "SEARCH",
        name
    }
}
