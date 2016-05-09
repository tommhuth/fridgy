import _ from "lodash";

export default function(string) { 
    return _.isString(string) ? string.charAt(0).toUpperCase() + string.substr(1).toLowerCase() : "";
};