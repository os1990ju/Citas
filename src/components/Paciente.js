import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const Paciente = ({item, setmodalVisible, pacienteEditar, eliminarPaciente, setModalPaciente, setPaciente }) => {

  const {paciente,date,id} = item;
  const formatearFecha = date => {
    const nuevaFecha = new Date(date);
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return nuevaFecha.toLocaleDateString('es-ES',opciones)
  };
  return (
  <Pressable
  onLongPress={()=>{
    setModalPaciente(true)
    setPaciente(item)
  }}>
<View style={styles.contenedor}>
    <Text style={styles.label}>Paciente</Text>
    <Text style={styles.texto}>{paciente}</Text>
    <Text style={styles.fecha}>{formatearFecha(date)}</Text>

    <View style={styles.contenedorBotones}>
      <Pressable 
      style={[styles.btn, styles.btnEditar]}
      onLongPress={()=>{
        setmodalVisible(true);
        pacienteEditar(id);
      }}
      >
        <Text style={styles.btnTexto}>Editar</Text>
      </Pressable>
      <Pressable 
        style={[styles.btn, styles.btnEliminar]}
        onLongPress={()=>{
          eliminarPaciente(id)
        }}
        >
        <Text style={styles.btnTexto}>Eliminar</Text>
      </Pressable>
    </View>
  </View>

  </Pressable>
    );
};

const styles = StyleSheet.create({
    marginTop:20,
    contenedor:{
        backgroundColor:'#FFF',
        padding:20,
        borderBottomColor:'#94a3B8',
        borderBottomWidth:1,
},
label: {
    color: '#374151',
    textTransform:'uppercase',
    fontWeight:'700',
    marginBottom:10
},
texto: {
    color:'#6D28D9',
    fontSize:24,
    fontWeight:'700',
    marginBottom:10,
},
fecha:{
    color:'#374151'
},
contenedorBotones:{
  flexDirection: 'row',
  justifyContent:'space-between',
  marginTop:20
},
btn:{
  paddingVertical:5,
  paddingHorizontal:20,
  borderRadius:5
},
btnEditar:{
  backgroundColor:'#F59E0B',
},
btnEliminar:{
 backgroundColor:'#EF4444',
},
btnTexto:{
  textTransform:'uppercase',
  fontWeight:'700',
  fontSize:12,
  color:'#FFF',
}
})

export default Paciente;
