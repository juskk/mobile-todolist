import React from 'react'
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Icon from '../UI/Icon';
import { mainColor, secondColor } from '../styles/globalStyles';
import Checkbox from '../UI/Checkbox';

interface IProps {
  searchText: string,
  changeText: any,
  filterByCompleted: boolean,
  changeCompletedFilter: () => void,
  completed: boolean,
  changeCompleted: any,
  filterByPublic: boolean,
  changePublicFilter: () => void,
  isPublic: boolean,
  changeIsPublic: any,
  reset: () => void,
  search: () => void,
}

const TodoFilterController: React.FC<IProps> = (props) => {

  const [dropDown, setDropDown] = React.useState(false)

  const dropDownStyles: any = !dropDown ?  styles.hidden : styles.visible;

  const toSearch = () => {
    props.search()
    setDropDown(false)
    Keyboard.dismiss()
  }
  const toReset = () => {
    props.reset()
    setDropDown(false)
    Keyboard.dismiss()
  }

  const completedField = (
    <View style={styles.part}>
      <Text style={styles.titleText}>Completed</Text>
      <Checkbox checked={props.completed} pressed={props.changeCompleted} />
    </View>
  )
  const publicField = (
    <View style={styles.part}>
      <Text style={styles.titleText}>Public</Text>
      <Checkbox checked={props.isPublic} pressed={props.changeIsPublic} />
    </View>
  )
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDropDown(prev => !prev)} style={styles.part}>
          <Text style={styles.headerText}>Filter</Text>
          <Icon name="caret-down-outline" color="white"/>
        </TouchableOpacity>
      </View>

      <View style={[styles.dropDown, dropDownStyles]}>

        <View style={styles.searchPart}>
          <Text style={styles.titleText}>Title:</Text>
          <TextInput 
            style={styles.input} 
            value={props.searchText} 
            onChangeText={props.changeText}/>
        </View>
        
        <View style={styles.searchPart}>
          <TouchableOpacity style={styles.part} onPress={props.changeCompletedFilter}>
            <Text>Filter by completed param:</Text>
            <Checkbox checked={props.filterByCompleted} pressed={props.changeCompletedFilter}/>
          </TouchableOpacity>
          {props.filterByCompleted ? completedField : null}
        </View>

        <View style={styles.searchPart}>
          <TouchableOpacity style={styles.part} onPress={props.changePublicFilter}>
            <Text>Filter by public param:</Text>
            <Checkbox checked={props.filterByPublic} pressed={props.changePublicFilter}/>
          </TouchableOpacity>
          {props.filterByPublic ? publicField : null}
        </View>

        <View style={styles.part}>
          <Button title="Search" onPress={toSearch} color={secondColor} />
          <Button title="Reset" onPress={toReset} color={secondColor} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    maxWidth: '100%',
    top: 0,
    width: '100%',
    height: 30,
    zIndex: 10
  },
  header: {
    width: 100,
    height: 36,
    backgroundColor: mainColor,
    justifyContent: 'center',
    borderBottomRightRadius: 20
  },
  headerText: {
    color: 'white',
    fontWeight: '800'
  },
  part: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  searchPart: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 14
  },
  input: {
    borderBottomWidth: 2,
    borderColor: secondColor,
    width: 110,
    marginLeft: 6
  },
  dropDown: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    position: 'absolute',
    marginTop: 40,
    zIndex: 10,
    elevation: 10,
    width: '70%',
    left: '15%',
    padding: 16,
    alignItems: 'center'
  },
  visible: {
    display: 'flex',
    position: 'absolute'
  },
  hidden: {
    display: 'none'
  },
})

export default TodoFilterController
