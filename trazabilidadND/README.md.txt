# Microservicios Trazabilidad ND

## Comenzando 🚀

_Dockers._

### Pre-requisitos 📋

_Dockers, React js y Next js_

### Instalación 🔧

_Para poder obtener un entorno de desarrollo, se necesitan un par de extensiones que deben de ser previamente instaladas junto con VS code._
_Entre ellas se encuentran:_

```
*ES7+*
*Remote-SSH*
*Docker*
```

## Ejecutando las pruebas ⚙️

_Las pruebas que se realizaron fueron hechas a través de peticiones realizadas en *Postman*, las peticiones se realizan a través de enviar datos por medio de un Json. Cuando se reciben en el backend, los datos son formateados en el backend por medio de una estructura que corresponde a al forma en que son enviados los datos en el Json. Así mismo, las rutas que se están mandando ya están validadas para que primeramente entran por el middleware que se encarga de validar el token que se otorga si el usuario está correctamente logeado en el sistema._

### Y las pruebas de estilo de codificación ⌨️

_Las pruebas que se estuvieron realizado con el módulo de lotes, fueron directamente relacionadas a los registros de la base de datos. Así mismo, se fueron desarrollando de la misma manera que se realizaban las peticiones a otro microservicio que se encarga totalmente de la autenticación de los mismos a través de los middleware que nos validarán el Jwt._

## Despliegue 📦

_* Dockers_
_* Drivers de SqlServer_

## Construido con 🛠️

* [React js](https://es.reactjs.org/) - Librería de Javascript para organizar componentes
* [Next js](https://nextjs.org/) - Framework de React para renderizar desde el lado del servidor
* [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) Framework de CSS para estilos
* [Sweetalert2](https://sweetalert2.github.io/v10.html) Librería para estilos de alertas

## Versionado 📌

_Se utilizó el Node Version Manager (nvm)_

## Autores ✒️

* **Daniel Alejandro Hernández Gálvez** - *FrontEnd* - 
* **Diego Vidal Ávila Gradilla** - *FullStack* - 
