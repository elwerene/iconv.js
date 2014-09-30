#!/bin/bash

# point this to iconv compiled with emscripten
ICONV_INCLUDE=../libiconv_js/include  
ICONV_LIB=../libiconv_js/lib/.libs/libiconv.a

# /opt/emscripten/tools/bindings_generator.py bindings convert.h
emcc -c -I$ICONV_INCLUDE src/iconv_string.c
emcc -c -I$ICONV_INCLUDE src/convert.cpp
emcc -O2 -s WARN_ON_UNDEFINED_SYMBOLS=1 \
  -s EXPORTED_FUNCTIONS="['_convert_c', '_malloc', '_free']" \
  -s DEFAULT_LIBRARY_FUNCS_TO_INCLUDE="['malloc', 'free']" \
  -s CLOSURE_ANNOTATIONS=1 \
  -s TOTAL_MEMORY=2097152 \
  -s TOTAL_STACK=524288 \
  convert.o iconv_string.o $ICONV_LIB --post-js src/wrapper.js -o iconv.js

# cleanup
rm -f convert.o iconv_string.o
