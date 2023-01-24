import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

const api_route =
  process.env.API_ROUTE || "https://dental.nucleodediagnostico.mx";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log(pathname)

  // check login ----------------------------------------------------------------
  if (pathname === "/login") {
    const _token = req.cookies.get("Token");

    if (_token) {
      var requestOptions = {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: _token.name + "=" + _token.value,
        },
      };
      fetch(api_route + "/common/ms/auth", requestOptions).then((response) => {
        if (response.status === 200) {
          console.log("to home");
          return NextResponse.redirect(api_route + "/home");
        } else {
          NextResponse.redirect(api_route + "/login");
        }
      });
    }
  }

  ////// logOut //////
  if (req.nextUrl.pathname.startsWith("/logout")) {
    const _token = req.cookies.get("Token");

    if (_token) {
      var requestOptions = {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: _token.name + "=" + _token.value,
        },
      };
      fetch(api_route + "/common/web/logout", requestOptions)
        .then((response) => {
            console.log(response.status)
          if (response.status === 200) {
            console.log("to index");
            return NextResponse.redirect(api_route);
          } else {
            console.log("to home logout");
            return NextResponse.redirect(api_route + "/home");
          }
        })
        .catch((error) => {
          return NextResponse.redirect(api_route + "/home");
        });
    } else return NextResponse.redirect(api_route + "/home");
  }
  /////logout/////

  if (req.nextUrl.pathname.startsWith("/home")) {
    const _token = req.cookies.get("Token");

    if (_token) {
      var requestOptions = {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: _token.name + "=" + _token.value,
        },
      };
      fetch(api_route + "/common/ms/auth", requestOptions)
        .then((response) => {
          if (response.status === 200) {
            console.log("auth");
            return NextResponse.rewrite(req.url);
          } else {
            return NextResponse.redirect(api_route + "/login");
          }
        })
        .catch((error) => {
          return NextResponse.redirect(api_route + "/login");
        });
    } else return NextResponse.redirect(api_route + "/login");
  }
  return NextResponse.next();
}
