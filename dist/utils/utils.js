"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseOptions(optionInfo, argv) {
    return Object.keys(optionInfo).reduce((options, key) => {
        let foundIndex = argv.indexOf(`--${key}`);
        if (foundIndex === -1) {
            options[key] = optionInfo[key].default;
            return options;
        }
        switch (optionInfo[key].type) {
            case Boolean:
                options[key] = true;
                break;
            case Number:
                options[key] = parseInt(argv[foundIndex + 1], 10);
                break;
            default:
                options[key] = argv[foundIndex + 1];
        }
        return options;
    }, {});
}
exports.parseOptions = parseOptions;
