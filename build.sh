#!/bin/bash

# point this to iconv compiled with emscripten
ICONV_INCLUDE=../libiconv_js/build/include  
ICONV_LIB=../libiconv_js/build/lib/.libs/libiconv.a

# /opt/emscripten/tools/bindings_generator.py bindings convert.h
emcc -c -I$ICONV_INCLUDE src/iconv_string.c && \
  emcc -c -I$ICONV_INCLUDE src/convert.cpp && \
  emcc -O2 -s WARN_ON_UNDEFINED_SYMBOLS=1 \
  -s EXPORTED_FUNCTIONS="['_convert_c', '_malloc', '_free']" \
  convert.o iconv_string.o $ICONV_LIB --post-js src/wrapper.js -o iconv.js

# emcc -c -I$ICONV_INCLUDE test.cpp
# emcc -s WARN_ON_UNDEFINED_SYMBOLS=1 \
# test.o convert.o iconv_string.o $ICONV_LIB -o test.html

# cleanup
rm -f convert.o iconv_string.o

testacular start --auto-watch=false --single-run=true
