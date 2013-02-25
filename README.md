# iconv.js

iconv.js is libiconv compiled to javascript with emscripten and a simple wrapper
around it. So it supports all charsets that libiconv supports. 

It is intended to be used in WebApps that have to deal with multiple character
encodings of binary data.  It has quite a heavy footprint of 902K (gzipped),
mainly due to large character conversion tables included in libiconv. So you
probably only want to load it when really needed.

## Usage

Example:
```javascript
// utf8 bytes for '€œ'
// e.g. use utf8.js to obtain this from a string.
var bytes = [226, 130, 172, 197, 147 ];  
// Convert to ISO8859-15
var isoBytes = iconv.convert(utf8Bytes, 'UTF-8', 'ISO8859-15');
// Encoding of '€œ' in ISO8859-15
// isoBytes = [0xA4, 0xBD];
```

## API

```javascript
/**
* Converts bytes from inCharset to outCharset. Returns converted byte
* sequence or null on error.
* @param {(Array.<number>|Uint8Array)} inBytes input byte sequence.
* @param {string} inCharset encoding of inBytes.
* @param {string} outCharset desired encoding of output.
* @return {Array.<number>} byte sequence of string encoded in outCharset, or
* null in case of errors.
*/
function convert(inBytes, inCharset, outCharset) { }
```

The API is exported globally to window.iconv.

