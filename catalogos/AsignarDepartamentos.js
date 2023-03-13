import React, { useEffect } from 'react';
import $ from 'jquery';

function AsignarPermisosDepartamentos() {
    useEffect(() => {
        $.ajax({
            type: "GET",
            url: "/PermisosDepartamentos/",
            success: function (data) {
                if (data.banderaPermisos === true) {
                    alert("No tienes permiso para ver esta página. Redireccionando a Home");
                    window.location.href = "/home";
                } else {
                    // Validación para URPCREAR
                    if (data.listaPermisos[0].urpCrear === true) {
                        $("#btnAgregarDepartamentos").show();
                    } else {
                        $("#btnAgregarDepartamentos").hide();
                    }

                    // Validación para URPMOSTRAR
                    if (data.listaPermisos[0].urpMostrar !== true) {
                        window.location.href = "/home";
                    }

                    // Validación para URPMODIFICAR
                    if (data.listaPermisos[0].urpModificar === true) {
                        $(".EditarDepartamentos").show();
                    } else {
                        $(".EditarDepartamentos").hide();
                    }

                    // Validación para URPELIMINAR
                    if (data.listaPermisos[0].urpEliminar === true) {
                        $(".EliminarDepartamentos").show();
                    } else {
                        $(".EliminarDepartamentos").hide();
                    }
                }
            }
        });
    }, []);

    return null;
}

export default AsignarPermisosDepartamentos;
