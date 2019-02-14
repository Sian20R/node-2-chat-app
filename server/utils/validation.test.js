var {isRealString} = require('./validation');

describe('isRealString', () => {
    test("should reject non-string values", () => {
        var result = isRealString(12);
        expect(result).toBe(false);
    });

    test("should reject string with only spaces", () => {
        var result = isRealString("      ");
        expect(result).toBe(false);
    });

    test("should allow string with non-space characters", () => {
        var result = isRealString("helloworld");
        expect(result).toBe(true);
    });
})