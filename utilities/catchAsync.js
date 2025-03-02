module.exports = func => {
    return (req, res, next) => {
        // returns new function with these param that catch any errors and pass to next
        func(req, res, next).catch(next);
    }
}