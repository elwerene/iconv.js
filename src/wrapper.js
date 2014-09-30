/**
 * License: LGPL v3
 * @author mb@w69b.com (Manuel Braun)
 */
module.exports.convert = function (globalScope) {
    // *in_bytes, in_len, *in_charset, *out_charset
    var convert_c = Module.cwrap('convert_c', 'number', [
            'number',
            'number',
            'string',
            'string'
        ]);
    var heap = Module.HEAPU8;
    var free = Module._free;
    var malloc = Module._malloc;
    /**
   * Converts bytes from inCharset to outCharset. Returns converted byte
   * sequence or null on error.
   * @param {(Array.<number>|Uint8Array)} inBytes input byte sequence.
   * @param {string} inCharset encoding of inBytes.
   * @param {string} outCharset desired encoding of output.
   * @return {Array.<number>} byte sequence of string encoded in outCharset, or
   * null in case of errors.
   */
    function convert(inBytes, inCharset, outCharset) {
        if (!inBytes || typeof inBytes.length !== 'number') {
            return null;
        }
        if (inBytes.length === 0) {
            return [];
        }
        // Real stuff, fill buffer with bytes.
        var len = inBytes.length;
        var inBuffer = malloc(len);
        for (var i = 0; i < len; ++i) {
            heap[inBuffer + i] = inBytes[i];
        }
        var resultPtr = convert_c(inBuffer, len, inCharset, outCharset);
        free(inBuffer);
        if (resultPtr === 0) {
            return null;
        }
        // Result is a zero-terminated byte sequence.
        var outBytes = [];
        var currentPtr = resultPtr;
        while (true) {
            var currentByte = heap[currentPtr++];
            if (currentByte === 0) {
                break;
            }
            outBytes.push(currentByte);
        }
        free(resultPtr);
        return outBytes;
    }
    return convert;
}();