resolve : {
    fallback: { 
        "querystring": require.resolve("querystring-es3") ,
        "path": require.resolve("path-browserify"),
        "buffer": require.resolve("buffer/"),
        "crypto": require.resolve("crypto-browserify"),
        "http": require.resolve("stream-http"),
        "stream": require.resolve("stream-browserify"),
        "url": require.resolve("url/"),
        "util": require.resolve("util/"),
}
}