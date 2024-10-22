module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/assets/");
    eleventyConfig.addWatchTarget("./src/assets/");

    return {
        dir: {
            input: "src",
            output: "docs",
            data: "_data",
            include: "_includes"
        },
    };
};