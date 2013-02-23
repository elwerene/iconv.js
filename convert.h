#ifndef _CONVERT_H_
#define _CONVERT_H_

// #include <string>

extern "C" {
  char* __attribute__((used, noinline)) convert_c(
      const char* in, int in_len,
      const char* from_encoding, const char* to_encoding);
}

// class IConv {
//  public:
//   static bool convert(const std::string& in, std::string& out,
//                const std::string& from_encoding,
//                const std::string& to_encoding);
//  private:
//   IConv() { };
// };

#endif  // _CONVERT_H_
