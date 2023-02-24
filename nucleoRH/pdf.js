const { jsPDF } = window.jspdf;
const autoTable = window.default

let PerTxt = "Periodo 4: del 8 de febrero de 2023 al 20 de febrero de 2023"
let date = new Date()
let Hoy = date.toLocaleDateString()
let leyenda = 'Manifiesto que el presente registro de entradas y salidas corresponde fielmente a mi registro de asistencias de forma digital correspondiente al\n periodo 4, del 8 de febrero de 2023 al 20 de febrero de 2023 por lo cual ratifico el presente registro firmando de conformidad.'

const downloadPDF = (filter) => {
    let datapdf = GlobalData
    let filtered = $('#tableND').DataTable().rows( { filter : 'applied'} ).data().toArray()
    if (!filter) {
        filter = []
        for (let f = 0; f < filtered.length; f++) {
            filter.push(parseInt(filtered[f][0]))
        }
    }
    console.log(filter)
    if (filter) {
        datapdf = []
        for (let i = 0; i < filter.length; i++) {
            const f = filter[i];
            datapdf.push(GlobalData.filter((emp) => {
                return emp.empnomina === f
            })[0])
        }
    }

    var doc = new jsPDF("landscape");
    let head = [['Fecha', 'Horario', 'Retardos', 'Checadas', 'Observaciones']]

    for (let i = 0; i < datapdf.length; i++) {
        if (i > 0) doc.addPage();
        const d = datapdf[i];
        console.log(d)

        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold');
        doc.text("Entradas y salidas por Usuario", 30, 15);
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')
        doc.text(d.empname + " | " + d.empnomina, 30, 20);

        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold');
        doc.text(PerTxt, 185, 15);
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')
        doc.text('Impreso: ' + Hoy, 185, 20);

        doc.roundedRect(20, 25, 255, 0.6, 0.3, 0.3, 'F')

        let body = []
        let Retardos = 0

        for (let j = 0; j < d.empfechas.length; j++) {
            const e = d.empfechas[j];
            'Fecha', 'Horario', 'Retardos', 'Checadas', 'Observaciones'

            let hor = e.horariodia;
            let Horario = `E: ${new Date(hor.horadiaentrada.Time).getUTCHours()}:${new Date(hor.horadiaentrada.Time).getUTCMinutes() < 10 ? "0" : ""}${new Date(hor.horadiaentrada.Time).getUTCMinutes()} SC: ${new Date(hor.horadiasalidacomida.Time).getUTCHours()}:${new Date(hor.horadiasalidacomida.Time).getUTCMinutes() < 10 ? "0" : ""}${new Date(hor.horadiasalidacomida.Time).getUTCMinutes()} RC: ${new Date(hor.horadiaregresocomida.Time).getUTCHours()}:${new Date(hor.horadiaregresocomida.Time).getUTCMinutes() < 10 ? "0" : ""}${new Date(hor.horadiaregresocomida.Time).getUTCMinutes()} S: ${new Date(hor.horadiasalida.Time).getUTCHours()}:${new Date(hor.horadiasalida.Time).getUTCMinutes() < 10 ? "0" : ""}${new Date(hor.horadiasalida.Time).getUTCMinutes()}`;
            let Checadas = ""

            if (e.checadas.length > 0) {
                for (let k = 0; k < e.checadas.length; k++) {
                    const check = new Date(e.checadas[k].check.replace('Z', ''))
                    if (k > 0) Checadas += "  "
                    Checadas += `${check.getUTCHours()}:${check.getUTCMinutes()}`
                }
            } else {
                Checadas = "SIN CHECADAS"
            }
            Retardos += e.minutosretardo

            let data = [
                new Date(e.dia.replace('Z', '')).toLocaleDateString('es-mx', { weekday: "short", year: "numeric", month: "short", day: "numeric" }),
                Horario,
                e.minutosretardo.toString(),
                Checadas,
                e.observaciones
            ]
            body.push(data)
        }

        let didParseCell = (cont) => {
            let content = cont.cell.raw
            if (cont.section === "body" && parseInt(cont.cell.raw) >= 20) console.log(content, cont)
        }
        let foot = [['', '', Retardos.toString()]]
        let footStyles = { fillColor: [207, 235, 255], textColor: [25, 44, 71] }
        if (Retardos > 20) footStyles = { fillColor: [179, 209, 255], textColor: [25, 44, 71] }


        autoTable(doc, {
            styles: { halign: 'center' },
            footStyles,
            margin: { top: 40 },
            didParseCell,
            head,
            body,
            foot,
        })

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        doc.text(leyenda, 150, 175, null, null, "center");

        doc.roundedRect(110, 195, 80, 0.6, 0.3, 0.3, 'F')

        doc.text(d.empname, 150, 200, null, null, "center");


    }
    doc.save("detalles.pdf");
}

const downloadPDFsinFirma = (filters) => {
    let datapdfS = GlobalData

    if (filters) {
        datapdfS = []
        for (let i = 0; i < filters.length; i++) {
            const f = filters[i];
            datapdfS.push(GlobalData.filter((emp) => {
                return emp.empnomina === f
            })[0])
        }
    }

    var doc = new jsPDF("landscape");
    let head = [['Fecha', 'Horario', 'Retardos', 'Checadas', 'Observaciones']]

    for (let i = 0; i < datapdfS.length; i++) {
        if (i > 0) doc.addPage();
        const d = datapdfS[i];
        console.log(d)

        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold');
        doc.text("Entradas y salidas por Usuario", 30, 15);
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')
        doc.text(d.empname + " | " + d.empnomina, 30, 20);

        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold');
        doc.text(PerTxt, 185, 15);
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')
        doc.text('Impreso: ' + Hoy, 185, 20);

        doc.roundedRect(20, 25, 255, 0.6, 0.3, 0.3, 'F')

        let body = []

        for (let j = 0; j < d.empfechas.length; j++) {
            const e = d.empfechas[j];
            'Fecha', 'Horario', 'Retardos', 'Checadas', 'Observaciones'

            let hor = e.horariodia;
            let Horario = `E: ${new Date(hor.horadiaentrada.Time).getUTCHours()}:${new Date(hor.horadiaentrada.Time).getUTCMinutes() < 10 ? "0" : ""}${new Date(hor.horadiaentrada.Time).getUTCMinutes()} SC: ${new Date(hor.horadiasalidacomida.Time).getUTCHours()}:${new Date(hor.horadiasalidacomida.Time).getUTCMinutes() < 10 ? "0" : ""}${new Date(hor.horadiasalidacomida.Time).getUTCMinutes()} RC: ${new Date(hor.horadiaregresocomida.Time).getUTCHours()}:${new Date(hor.horadiaregresocomida.Time).getUTCMinutes() < 10 ? "0" : ""}${new Date(hor.horadiaregresocomida.Time).getUTCMinutes()} S: ${new Date(hor.horadiasalida.Time).getUTCHours()}:${new Date(hor.horadiasalida.Time).getUTCMinutes() < 10 ? "0" : ""}${new Date(hor.horadiasalida.Time).getUTCMinutes()}`;
            let Checadas = ""

            if (e.checadas.length > 0) {
                for (let k = 0; k < e.checadas.length; k++) {
                    const check = new Date(e.checadas[k].check.replace('Z', ''))
                    if (k > 0) Checadas += "  "
                    Checadas += `${check.getUTCHours()}:${check.getUTCMinutes()}`
                }
            } else {
                Checadas = "SIN CHECADAS"
            }

            let data = [
                new Date(e.dia.replace('Z', '')).toLocaleDateString('es-mx', { weekday: "short", year: "numeric", month: "short", day: "numeric" }),
                Horario,
                e.minutosretardo.toString(),
                Checadas,
                e.observaciones
            ]
            body.push(data)
        }
        autoTable(doc, {
            styles: { halign: 'center' },
            margin: { top: 50 },
            columnStyles: { Checadas: { halign: 'center' } },
            head,
            body
        })
    }
    doc.save("detalle.pdf");
}
