let helper = {
    error: (res, msg) => {
        msg = 'string' === typeof msg 
            ? msg 
            : 'An unknown error occurred';
        res.send({
            error: true,
            error_msg: msg
        })
    }
}

module.exports = helper;