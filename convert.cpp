// #include <string.h>
// #include <stdio.h>

// #include <string>

#include "./iconv_string.h"
#include "./convert.h"


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
      return NULL;
    }
  }
}

// bool IConv::convert(const std::string& in, std::string& out,
//                            const std::string& from_encoding,
//                            const std::string& to_encoding) {
//   char* result = NULL;
//   if(convert_c(in.c_str(), &result,
//                from_encoding.c_str(), to_encoding.c_str())) {
//     out.assign(result);
//     return true;
//   }
//   return false;
// };

// int main(int argc, char** argv) {
//  char * s = "\xB6\xE2ʸ\xC2\xCE";
//  char* result = NULL;
//  convert(s, &result, "EUC-JP", "UTF-8");
//  printf("result: %s\n", result);
// }
//
// int main(int argc, char** argv) {
//  const char * s = "\xB6\xE2ʸ\xC2\xCE";
//  std::string result;
//  iconv::convert(s, result, "EUC-JP", "UTF-8");
//  printf("result: %s\n", result.c_str());
// }
