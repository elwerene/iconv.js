(function(globalScope) {
  // *in_bytes, in_len, *in_charset, *out_charset
  var convert_c = Module['cwrap']('convert_c', 'number', ['number', 'number', 'string', 'string']);
  var heap = Module['HEAPU8'];
  globalScope['iconv_convert'] = function(inBytes, inCharset, outCharset) {
    if (!inBytes.length) return null;
    // Real stuff, fill buffer with bytes.
    var inBuffer = Module['_malloc'](inBytes.length);
    for (var i = 0; i < inBytes.length; ++i) {
      heap[inBuffer + i] = inBytes[i];
    }
    var resultPtr = convert_c(inBuffer, inBytes.length, inCharset, outCharset);
    if (resultPtr == 0) return null;

    // Result is a zero-terminated byte sequence.
    var outBytes = [];
    var currentPtr = resultPtr;
    while (true) {
      var currentByte = heap[currentPtr++];
      if (currentByte == 0)
        break;
      outBytes.push(currentByte);
    };
    Module['_free'](resultPtr);
    return outBytes;
  };
})(self);
