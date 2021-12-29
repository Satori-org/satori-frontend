//Parameter conversion processing
export const stringify = (obj:any) => {
    let str = "";
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            str += i + '=' + unescape(obj[i]) + '&'
        }
    }
    return str.slice(0, -1);
};
/*Assembly route parameters*/
export const buildSearch = (obj:any) => {
    return stringify(obj)
};

export function getRouteParams(str:string) {
    let d_str = decodeURI(str.slice(1));
    let data:any = {};
    d_str.split("&").forEach((item) => {
        let arr = item.split("=");
        let key = arr[0];
        if (key) {
            data[key] = arr[1];
        }
    });
    return data;
}

export function deepCompare(x: any, y: any) {
    var i, l, leftChain: any[], rightChain: any[];

    function compare2Objects(x: any, y: any) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof(x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true; //Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}

/* :xxx Pattern matching routing */
export function checkMatchModel(routePath = "", browserPath: string) {
    let matchesArr = routePath.match(/:[^/]+/g);
    let regExpStr = routePath.replace(/:[^/]+/g, "(.+)");
    let regExp = new RegExp(regExpStr, "");
    let values = browserPath.match(regExp)?.slice(1);
    let isMatchModel = matchesArr && values && values.length === matchesArr.length;

    return {
        keys: matchesArr?.map((item) => item.slice(1)),
        values,
        isMatchModel
    };
}
