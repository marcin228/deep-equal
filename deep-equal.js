const deepEqual = function(a, b){

    let isObj = false, isArr = false;

    // moved primitive check up in a function body to ommit unnecessary checks if basic case is met
    // it sped up script by 40%
    if(a !== Object(a))
        if(a == b) return true;
            else return false;

    try{ for(let key in a){} }catch(e){ isArr = true; }
    try{ for(let key of a){} }catch(e){ isObj = true; }

    // to save some processing time we can return early without comparing each element of arrays if lengths are different
    if(Object.keys(a).length != Object.keys(b).length) return false;

    if(isObj)
        for(let k in a)
            if(!deepEqual(a[k], b[k])) return false;
    
    if(isArr)
        for(let k of a)
            if(!deepEqual(a[k], b[k])) return false;

    return true;
}

let a, b;
const arr = [1,2,3];

console.time('total')

for(let i1 = 0; i1 < 10_000; i1++){

    // the same shallow objects
    a = { id: 1 };
    b = { id: 1 };
    if(true != deepEqual(a, b))
        throw new Error('test failed.');

    // different shallow objects
    a = { id: 1 };
    b = { id: 2 };
    if(false != deepEqual(a, b))
        throw new Error('test failed.');

    // different types
    a = { id: 1 };
    b = 1;
    if(false != deepEqual(a, b))
        throw new Error('test failed.');

    // the same objects with the same arrays
    a = { arr: arr, id: 1 };
    b = { arr: arr, id: 1 };
    if(true != deepEqual(a, b))
        throw new Error('test failed.');

    // the same objects with the different arrays
    a = { arr: arr, id: 1 };
    b = { arr: [1,2,3,4], id: 1 };
    if(false != deepEqual(a, b))
        throw new Error('test failed.');

    // the same objects with the different arrays
    a = { deep: {arr: [1,2,3], num: 0 }, id: 1 };
    b = { deep: {arr: [1,2,3,4], num: 0}, id: 1 };
    if(false != deepEqual(a, b))
        throw new Error('test failed.');

    // the same objects with nested objects with the same arrays
    a = { deep: {arr: [1,2,3], num: 0 }, id: 1 };
    b = { deep: {arr: [1,2,3], num: 0 }, id: 1 };
    if(true != deepEqual(a, b))
        throw new Error('test failed.');

    // the same objects with nested objects with the same arrays and differently named properties
    a = { deep: {arr: [1,2,3], num: 0 }, id: 1 };
    b = { deep: {arr: [1,2,3], nums: 0 }, id: 1 };
    if(false != deepEqual(a, b))
        throw new Error('test failed.');

    // the same objects with nested objects with the same arrays and properties with different values
    a = { deep: {arr: [1,2,3], num: 0 }, id: 1 };
    b = { deep: {arr: [1,2,3], num: 1 }, id: 1 };
    if(false != deepEqual(a, b))
        throw new Error('test failed.');
}

console.timeEnd('total');