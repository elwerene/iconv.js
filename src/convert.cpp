#include "./iconv_string.h"
#include "./convert.h"
#include <errno.h>
#include <string.h>
#include <stdio.h>
#include <iostream>

extern "C" {

  /**
   * returns false on failure
   */
  char* convert_c(const char* in, int in_len,
                const char* from_encoding, const char* to_encoding) {

    char* out = NULL;
    if (iconv_string(to_encoding, from_encoding,
                         in, in + in_len, &out, NULL) >= 0) {
      return out;
    } else {
      std::cout << "ERROR:" << strerror(errno) << std::endl;
      return NULL;
    }
  }
}

