// Este código es un middleware que se encarga de realizar la autenticación y la gestión de sesión en una aplicación web
import { NextResponse } from "next/server";

const api_route =
  process.env.API_ROUTE || "https://dental.nucleodediagnostico.mx";

/* El middleware toma una solicitud (req) y una respuesta (res) como entrada y determina si el usuario
 está autorizado para acceder a una página específica */
export async function middleware(req, res) {
  const { pathname } = req.nextUrl;
  let url = req.nextUrl.clone();


  /* Check Auth 
   Si la ruta de la solicitud comienza con "/home", se verifica si existe un token 
   de autenticación en la cookie de la solicitud */
  if (req.nextUrl.pathname.startsWith("/home")) {
    const _token = req.cookies.get("Token");
    console.log(req.cookies)
    /* Si hay un token de autenticación, se envía una solicitud GET a /common/ms/auth
     con el token en los encabezados de la solicitud */
    if (_token) {
      let parms = {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: _token.name + "=" + _token.value,
        },
      };
      /* Si la respuesta del servidor es exitosa (status code 200), se imprimen en la 
      consola el resultado de la respuesta, el status code y el status text */
      await fetch(api_route + "/common/ms/auth", parms)
        .then((res) => {
          res
            .text()
            .then((result) => console.log(result, res.status, res.statusText));
            /* Si la respuesta del servidor no es exitosa (status code distinto a 200), 
            la dirección URL se cambia a "/login" y se elimina la cookie "Token" */
          if (res.status !== 200) {
            url.pathname = "/login";
            req.cookies.delete("Token");
          }
        })

        /* En caso de error en la solicitud HTTP, la dirección URL también se 
        cambia a "/login" y se elimina la cookie "Token" */
        .catch((err) => {
          url.pathname = "/login";
          req.cookies.delete("Token");
        });

      /* la ruta actual (almacenada en la variable url.pathname) es igual a la ruta especificada
      en la variable pathname, la función NextResponse.next() es llamada para permitir que la 
      solicitud continúe su proceso normal */
      if (url.pathname === pathname) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(url);
      }
    // Si la ruta actual no es igual a la ruta especificada en pathname, se redirige a la ruta almacenada en la variable url.
    } else {
      req.cookies.delete("Token");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  /* Check Login.
   Este de código  se encarga de gestionar la autenticación de un usuario,
   si la ruta actual (indicada por la variable "pathname") es "/login" */
  else if (pathname === "/login") {
    // Se busca un token en las cookies del usuario con el nombre "Token"
    const _token = req.cookies.get("Token");
    if (_token) {
      var parms = {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: _token.name + "=" + _token.value,
        },
      };
      /* Si se encuentra el token, se hace una petición GET a la ruta 
      "/common/ms/auth" de la API, incluyendo el token en la cabecera "Cookie" */
      await fetch(api_route + "/common/ms/auth", parms)
        .then((res) => {
          if (res.status === 200) {
            url.pathname = "/home";
          }
        })
        .catch((err) => {});
      if (url.pathname === pathname) {
        req.cookies.delete("Token");
        return NextResponse.next();
      } else {
        return NextResponse.redirect(url);
      }
      /* Si no se encuentra el token, se elimina cualquier cookie con el 
      nombre "Token" y se permite la siguiente acción */
    } else {
      req.cookies.delete("Token");
      return NextResponse.next();
    }
  }

  /* Logout 
  Se verifica si la ruta actual es "/logout" y si existe un token en las
  cookies con nombre "Token" */
  else if (pathname === "/logout") {
    const _token = req.cookies.get("Token");
    if (_token) {
      let parms = {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: _token.name + "=" + _token.value,
        },
      };
      /* Si existe un token, se crea una petición HTTP POST a la API con 
      las cabeceras incluyendo el token en formato 
      "Cookie: nombre_del_token=valor_del_token" */
      await fetch(api_route + "/common/web/logout", parms)
        .then((res) => {
          console.log(parms);
          res.text().then((result) => console.log(result));
          if (res.status !== 200) {
            url.pathname = "/";
            req.cookies.delete("Token"); // se elimina el token
          } else {
            url.pathname = "/home";
            req.cookies.delete("Token"); // si se manda correctamente a home el token se elimina
          }
        })
        // En caso de error en la petición se redirige a "/home".
        .catch((err) => {
          url.pathname = "/home";
        });
      if (url.pathname === pathname) {
        req.cookies.delete("Token");
        return NextResponse.next();
      } else {
        req.cookies.delete("Token");
        return NextResponse.redirect(url);
      }
      // Si no existe un token, se elimina cualquier token en las cookies y se redirige a "/login".
    } else {
      req.cookies.delete("Token");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
  // Si no se cumple nada, se continúa con la siguiente acción.
  else return NextResponse.next();
}
