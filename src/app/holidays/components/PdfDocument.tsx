import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { Event } from '../../store/types/eventTypes';

const styles = StyleSheet.create({
  // header
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    border: '1pt solid #000',
  },
  header: {
    width: '100%',
    backgroundColor: 'lightgray',
    textAlign: 'center',
    padding: 10,
    borderBottom: '2pt solid blue',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  // cuerpo
  body: {
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 25,
    borderBottom: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    fontSize: 10,
  },
  label: {
    color:'#1D1D1D',
    padding: 4,
    flex: 1,
    fontSize: 10,
  },
  text: {
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    borderStyle: 'solid',
    alignItems: 'center',
  },
  parr: {
    fontSize: 9.5,
    marginBottom: 20,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    padding: 5,
    textAlign: 'center',
  },
  // footer
  footer: {
    width: '100%',
    textAlign: 'center',
    padding: 10,
    position:'absolute',
    bottom: 0,
  },
});

interface PdfDocumentProps {
  event: Event;
}

export const PdfDocument: React.FC<PdfDocumentProps> = ({ event }) => {
  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Image source='/Icesa.png' style={{ width: 50, height: 50 }} />
          <Text style={styles.headerText}>ICESA S.A</Text>
        </View>

        {/* Cuerpo */}
        <View style={styles.body}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>FECHA DE SOLICITUD:</Text>
              <Text style={styles.text}>{formatDate(event.start)}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>FECHA DE INGRESO:</Text>
              {/* <Text style={styles.text}>{formatDate(event.user.dateOfJoining)}</Text> */}
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>CIUDAD:</Text>
              <Text style={styles.text}>{event.user.country}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>NOMBRE COMPLETOS:</Text>
              <Text>{event.user.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>AREA:</Text>
              <Text>{event.user.area}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>DEPARTAMENTO:</Text>
              <Text>{event.user.department}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>CARGO:</Text>
              <Text>{event.user.position}</Text>
            </View>
          </View>
          <Text style={styles.title}>FECHA DE VACACIONES</Text>
          <View style={styles.row}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>DESDE</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>HASTA</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>No. DIAS QUE TOMA</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>{formatDate(event.start)}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{formatDate(event.end)}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{event.requestedDays}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.title}>FECHA DE REINGRESO</Text>
          <View style={styles.row}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>{formatDate(event.end)}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.parr}>[ ] Si,vencida mi licencia y/o vacaciones. no reanudate mis labores en ICESA S.A y habiendo trasncurrido más de tres dias
            de inasistencia al trabajo, ICESA S.A me considerará comprendido en lo dispuesto en el Articulo 171 del Código del trabajo
            vigente,para lo cual firmo el presente documento, relevando a ICESA S.A de toda responsabilidad</Text>
          <Text style={styles.parr}>
            [ ] Acumulación por un año solicitada por: ALCIVAR VACA MARIA JOSE de acuerdo al artículo 73 del Código del Trabajo.
          </Text>
          <Text style={styles.parr}>
            [ ] Acumulación solicitada por el empleado por el periodo __ -- __ #de días: ___ de acuerdo al artículo 474 del Código del trabajo.
            a liquidarse de acuerdo al Articulo 70 del mismo Código :
          </Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>DIAS TOMADOS:</Text>
              <Text>___</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>DIAS PENDIENTES:</Text>
              <Text>___</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>APROBADO POR: </Text>
            <Text style={styles.text}>{event.user?.boss?.name}</Text>
          </View>
        </View>
        {/* Pie de página */}
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.parr}>EMPLEADO</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
