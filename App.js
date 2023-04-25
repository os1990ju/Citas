import React, {useState} from 'react';
import {Text, StyleSheet, View, Pressable, FlatList, SafeAreaView, Alert, Modal} from 'react-native';
import Fromulario from './src/components/Fromulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';
const App = () => {
  //Los hooks se colocan en la parte superiro.
  const [modalVisible, setmodalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);
  //edicion
  const pacienteEditar = id =>{
    
  const pacienteFind = pacientes.filter(paciente => paciente.id === id);
  setPaciente(pacienteFind[0]); 
  //fconsole.log(pacienteFind);
  }
  //eliminar
  const eliminarPaciente = id =>{
    Alert.alert(
      'Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {text: 'Si, Eliminar', onPress:()=>{
          const pacientesActualizados = pacientes.filter(
            pacientesState => pacientesState.id !== id)
            setPacientes(pacientesActualizados)
        }}
      ]
    )
  }

  const cerrarModal = ()=>{
    setmodalVisible(false)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de citas {''}
        <Text style={styles.tituloBold}>Veterinarias</Text>
      </Text>
      <Pressable
        onPress={() => setmodalVisible(true)}
        style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>
      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay citas en este momento!</Text>
      ) : (
        <SafeAreaView style={styles.contenido}>
      <FlatList style={styles.listado}
        data={pacientes}
        renderItem={({item}) => {
          return (
            <Paciente 
            item={item} 
            setmodalVisible={setmodalVisible} 
            pacienteEditar={pacienteEditar}
            eliminarPaciente={eliminarPaciente}
            setModalPaciente={setModalPaciente}
            setPaciente={setPaciente}
            />
          )
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
      )}
      
      {modalVisible && (
        <Fromulario
        cerrarModal={cerrarModal}
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente = {setPaciente}
      />
      )}

<Modal
        visible={modalPaciente}
        animationType='slide'
      >
        <InformacionPaciente 
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
},
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 30,
    fontWeight: '600',
    color: '#374151',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado:{
    marginTop:20,
    marginHorizontal:30,
    marginBottom:20
  }
});
export default App;
