const hidingKey = ['password'];
const maskingKey = ['email', 'mobile_no', 'mobileNo'];

export const maskingString = (str) => {
    var newStr = '';
    for (var index = 0; index < str.length; index++) {
        newStr = index > 2 ? newStr + '*' : newStr + str[index];
    }

    return newStr;
}

export const objectToLogStr = (obj) => {
    const newObj = { ...obj };
    var logStr = '';
    for(var key of Object.keys(newObj)) {
        if (hidingKey.includes(key)) {
            continue;
        }
        const value = maskingKey.includes(key) ? maskingString(newObj[key]) : newObj[key];
        
        
        if (logStr === '') {
            logStr = `${key} : ${value}`;
        } else {
            logStr = `${logStr}, ${key} : ${value}`;;
        }
    }

    return `{ ${logStr} }`
}