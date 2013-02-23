#!/bin/bash

# point this to iconv compiled with emscripten
ICONV_INCLUDE=../libiconv_js/build/include  
ICONV_LIB=../libiconv_js/build/lib/.libs/libiconv.a

# /opt/emscripten/tools/bindings_generator.py bindings convert.h
emcc -c -I$ICONV_INCLUDE iconv_string.c && \
  emcc -c -I$ICONV_INCLUDE convert.cpp && \
  emcc -O2 -s WARN_ON_UNDEFINED_SYMBOLS=1 \
  -s EXPORTED_FUNCTIONS="['_convert_c', '_malloc', '_free']" \
  convert.o iconv_string.o $ICONV_LIB --post-js wrapper.js -o iconv.js
