#ifndef _CONVERT_H_
#define _CONVERT_H_

// #include <string>

extern "C" {
  char* __attribute__((used, noinline)) convert_c(
      const char* in, int in_len,
      const char* from_encoding, const char* to_encoding);
}

#endif  // _CONVERT_H_
