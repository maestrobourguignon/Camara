import { Text, TouchableOpacity, StyleSheet} from "react-native";

export default ({title, onPress}) => {
  return(
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#EEE',
    padding: 10,
    width: 200,
    borderRadius: 8,
  },
  txt:{
    textTransform:'uppercase',
    color: '#000',
    fontWeight: 'bold'
  }
})



