module.exports = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch((error) => {
            console.error("Error in async handler:", error)
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                
            });
        
            next(error);
            });

    }
}
