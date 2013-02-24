/**
* iconv.js is basically just a wrapper around compiled libiconv compiled to js.
* So we just do some arbitary sanity check to see if things work and assume
* libiconv does it's job correctly.
*/
describe('iconv tests', function() {

  /**
   * Converts string to charset and back to utf8.
   * Should result in the same utf8-sequence if all characters can be
   * represented in the given charset.
   */
  function testIdentity(str, charset) {
    var utf8Bytes = utf8.stringToUTF8Bytes(str);
    expect(utf8Bytes).not.toBeFalsy();
    var converted = iconv.convert(utf8Bytes, 'UTF-8', charset);
    expect(converted).not.toBeFalsy();
    var backConverted = iconv.convert(converted, charset, 'UTF-8');
    expect(backConverted).toEqual(utf8Bytes);
  }

  it('converts from utf8 to 8859-15', function() {
    var utf8Bytes = utf8.stringToUTF8Bytes('€œ');
    var isoBytes = iconv.convert(utf8Bytes, 'UTF-8', 'ISO8859-15');
    expect(isoBytes).toEqual([0xA4, 0xBD]);
  });

  it('converts from utf8 to 8859-1', function() {
    var utf8Bytes = utf8.stringToUTF8Bytes('¼½');
    var isoBytes = iconv.convert(utf8Bytes, 'UTF-8', 'ISO8859-1');
    expect(isoBytes).toEqual([0xBC, 0xBD]);
  });

  it('converts from utf8 to shift-jis', function() {
    var utf8Bytes = utf8.stringToUTF8Bytes('橿');
    var converted = iconv.convert(utf8Bytes, 'UTF-8', 'SHIFT-JIS');
    utf8Bytes = utf8.stringToUTF8Bytes('羸');
    converted = iconv.convert(utf8Bytes, 'UTF-8', 'SHIFT-JIS');
    expect(converted).toEqual([0xe3, 0xbe]);
  });

  it('should convert forth and back', function() {
    testIdentity('hello öÄÖ€i', 'ISO8859-15');
    testIdentity('äöÄlke@$', 'ISO8859-1');
    testIdentity('駕滑葛褐', 'SHIFT-JIS');
  });

  it('should return null on invalid charsets', function() {
    expect(iconv.convert([0x20], 'UTF-8', 'invalid')).toBeNull();
    expect(iconv.convert([0x20], 'invalid', 'UTF-8')).toBeNull();
  });

  it('should return null on invalid encoding', function() {
    expect(iconv.convert([0xFF, 0xFF], 'UTF-8', 'UTF-8')).toBeNull();
  });
});
