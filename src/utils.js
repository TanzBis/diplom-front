export const getFormDataFromPlainObj = object => {
    const formData = new FormData();

    for (let value in object) {
        formData.append(value, object[value]);
    }

    return formData;
};

export const getIntersection = (arr1, arr2) => {
    let result = [];

    for (let elem of arr1) {
        if (inArray(elem, arr2)) {
            result.push(elem);
        }
    }

    return result;
}

export function inArray(elem, arr){
    return arr.indexOf(elem) !== -1;
}