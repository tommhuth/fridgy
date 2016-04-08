module.exports = function(string) {
    return string ? string.charAt(0).toUpperCase() + string.substr(1).toLowerCase() : "";
};