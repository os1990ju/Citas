/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, ScrollView, View, TextInput, Pressable, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
const Fromulario = ({ modalVisible,cerrarModal, pacientes, setPacientes,setPaciente:setPacienteApp, paciente:pacienteObj}) => {
  const [paciente, setPaciente] = useState('');
  const [id, setId] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [date, setDate] = useState(new Date());
  //console.log(pacienteObj);
  //implementar useEffect para cargar el paciente cuando lo valla a editar
  useEffect( () => {
    if(Object.keys(pacienteObj).length > 0){
      setId(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setPropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      setDate(pacienteObj.date)
      setSintomas(pacienteObj.sintomas)

    }
  },[pacienteObj]) 

  const handleCita = ()=>{

    if ([paciente, propietario, email, date, sintomas].includes('')){
      console.log('hay errores');
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios',
      );
    }

    const nuevoPaciente = {
      
      paciente,
      propietario,
      email,
      telefono,
      date,
      sintomas,
    };

     if(id){
      //  editanto
       nuevoPaciente.id = id;
       const pacientesActualizados = pacientes.map(pacienteState =>
         pacienteState.id === nuevoPaciente.id ? nuevoPaciente:
         pacienteState)
       setPacientes(pacientesActualizados)
       setPacienteApp({})
     }else{
      //  nuevo registro
       nuevoPaciente.id = Date.now()
       setPacientes([...pacientes,nuevoPaciente])
     }
    
    cerrarModal();
    setId('');
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setSintomas('');
    setDate(new Date());
    
  };
  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>Nueva ooo {''}
            <Text style={styles.tituloBold}>Cita</Text></Text>

          <Pressable 
          style={styles.btnCancelar} 
          onPress={() => {
            cerrarModal()
            setPacienteApp({})
            setId('')
            setPaciente('')
            setPropietario('')
            setEmail('')
            setTelefono('')
            setSintomas('')
            setDate(new Date())
          }}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
               />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={newText => setPropietario(newText)} />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
             placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={newText => setEmail(newText)} />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Telefono propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono propietario"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={newText => setTelefono(newText)}
              maxLength={10} />
          </View>

          <View style={[styles.campo, styles.sintomasInput]}>
            <Text style={styles.label}>Sintomas paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Sintomas paciente"
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={newText => setSintomas(newText)}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha de alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker date={date}
                locale="es"
                // eslint-disable-next-line no-shadow
                onDateChange={(date) => setDate(date)} />
            </View>
          </View>

          <Pressable
          style={styles.btnNuevaCita}
          onPress={handleCita}
          >
            <Text style={styles.btnNuevaCitaTexto}>Agregar
            Paciente</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 20,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 40,
    marginHorizontal: 30,
    // marginBottom:10,
  },
  label: {
    color: '#FFF',
    marginBottom: 5,
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',

  },
  input: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
    marginBottom: 40,
  },
  fechaContenedor: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 40,
    borderRadius: 10,
  },
  btnNuevaCita:{
    marginVertical:50,
    backgroundColor:'#F59E0B',
    paddingVertical:15,
    marginHorizontal:30,
    borderRadius:10,

  },
  btnNuevaCitaTexto:{
    textAlign:'center',
    color:'#5827A4',
    textTransform:'uppercase',
    fontWeight:'700',
  },
});
export default Fromulario;
