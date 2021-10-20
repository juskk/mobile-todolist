import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Button } from 'react-native';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native';

import { getAllTodos } from '../../../service/http.service';
import TodoContainer from '../../../components/TodoContainer';
import TodoFilterController from '../../../components/TodoFilterController';
import Pagination from '../../../components/Pagination';

const TodosScreen: React.FC = () => {  
  const [recall, setRecall] = React.useState<boolean>(false)
  const [searchText, setSearchText] = React.useState<string>('')
  const [filterByCompleted, setFilterByCompleted] = React.useState(false)
  const [completed, setCompleted] = React.useState<boolean>(false);
  const [filterByPublic, setFilterByPublic] = React.useState(false)
  const [isPublic, setIsPublic] = React.useState<boolean>(false)
  const [page, setPage] = React.useState<number>(1)

  const [loged, setLoged] = React.useState<any>(null)
  const [userId, setUserId] = React.useState<any>('')
  const isFocused = useIsFocused();
  
  const { data, isLoading, isFetching, isError } = useQuery(['todos', {createdBy: userId, recall, page}], 
  () => getAllTodos(userId, {search: searchText, completed, filterByCompleted, isPublic, filterByPublic, page}), {refetchOnReconnect: "always", keepPreviousData: true});

  if (isFocused) {
    checkToken()
  }

  React.useEffect( () => {
    AsyncStorage.getItem('id').then( res => {
      setUserId(res);
    } )
  }, [loged] )

  if (loged === null) return null
  if (!loged) return (
    <View style={styles.guestDiv}>
      <Text>log in to start adding todos!</Text>
    </View>
  )

  const pages = Math.ceil(data?.data.length / data?.data.perPage)

  async function checkToken() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLoged(true)
    } else {
      setLoged(false)
    }
  };

   function searchWithParams(params: any) {
    setPage(1)
    setRecall(prev => !prev)
  }

  function reset() {
    setPage(1)
    setSearchText('')
    setFilterByCompleted(false)
    setCompleted(false)
    setFilterByPublic(false)
    setIsPublic(false)
    setRecall(prev => !prev)
  }

  function prevPage() {
    setPage(prev => Math.max(1, prev - 1))
  }
  function nextPage() {
    setPage(prev => pages === prev ? prev : prev + 1)
  }

  function changeCompletedFilter() {
    setFilterByCompleted(prev => !prev)
  }
  function changePublicFilter() {
    setFilterByPublic(prev => !prev)
  }

  function changeCompleted() {
    setCompleted(prev => !prev)
  }
  function changeIsPublic() {
    setIsPublic(prev => !prev)
  }

  

  const loader = (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="purple" />
    </View>
  );
  const error = (
    <View>
      <Text>an error occure</Text>
    </View>
  ) 

  if (isError) return error
  if (isLoading) return loader
  return (
    <View style={styles.container}>
      <TodoFilterController 
        searchText={searchText}
        changeText={setSearchText}
        filterByCompleted={filterByCompleted}
        changeCompletedFilter={changeCompletedFilter}
        completed={completed}
        changeCompleted={changeCompleted}
        filterByPublic={filterByPublic}
        changePublicFilter={changePublicFilter}
        isPublic={isPublic}
        changeIsPublic={changeIsPublic}
        reset={reset}
        search={() => searchWithParams({search: searchText})}/>
      {data 
      ? !isFetching 
        ? <TodoContainer todos={data.data.todos} /> 
        : loader 
      : loader}
      <Pagination 
        page={page} 
        pages={pages} 
        prevPage={prevPage} 
        nextPage={nextPage}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestDiv: {
    alignItems: 'center', 
    justifyContent: 'center'
  }
});

export default TodosScreen;
