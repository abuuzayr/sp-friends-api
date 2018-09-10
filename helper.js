let helper = {
    error: (res, msg) => {
        res.send({
            error: true,
            error_msg: msg
        })
    }
}

module.exports = helper;