import React from 'react'

import { View, Button, Text, StyleSheet } from 'react-native'
import { mainColor, secondColor } from '../styles/globalStyles';

interface IProps {
  pages: number,
  page: number,
  nextPage: () => void,
  prevPage: () => void,
}

const Pagination: React.FC<IProps> = ({pages, page, nextPage, prevPage}) => {
  return (
    <View style={styles.pagination}>
      <Button 
        title="prev" 
        onPress={prevPage}
        disabled={page === 1}
        color={mainColor}/>
      <Text style={styles.page}>{page}</Text>
      <Button 
        title="next" 
        onPress={nextPage}
        disabled={pages === page}
        color={mainColor}/>
    </View>
  )
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E9E6F0',
    borderTopRightRadius: 20
  },
  page: {
    fontWeight: '600',
    color: secondColor
  }
});

export default Pagination
