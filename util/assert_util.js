export const assertNotNull = (obj, error) => {
    if (!obj) {
        throw error;
    }
}

export const assertNotBlank = (str, error) => {
    if (!str || str === '') {
        throw error;
    }
}

export const assertTrue = (condition, error) => {
    if (!condition) {
        throw error;
    }
}