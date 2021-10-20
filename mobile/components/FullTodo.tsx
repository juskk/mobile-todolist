import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet, ScrollView,
} from 'react-native';
import { useQuery } from 'react-query';

import { getTodo } from '../service/http.service';
import Checkbox from '../UI/Checkbox';
import { mainColor } from '../styles/globalStyles';

const FullTodo: React.FC = () => {
  const props: any = useRoute().params;
  const toGetTodo = () => getTodo(props.id)
  const { data, isLoading, isError } = useQuery<any>(['todo', { id: props.id }], toGetTodo);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>An error occurred</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.modContainer}>
          <Text style={styles.pageTitle}>VIEW MOD:</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.section}>
            <Text style={styles.titleText}>Title</Text>
            <Text>{data.title}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleText}>Description</Text>
            <Text>{data.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleText}>Year</Text>
            <Text>{data.year}</Text>
          </View>
          <View style={[styles.checkboxView, styles.section]}>
            <Text style={styles.titleText}>Completed</Text>
            <View style={styles.checkbox}><Checkbox checked={data.completed} /></View>
          </View>
          <View style={[styles.checkboxView, styles.section]}>
            <Text style={styles.titleText}>Public</Text>
            <View style={styles.checkbox}><Checkbox checked={data.public} /></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FullTodo;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '80%',
    width: '100%',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: mainColor,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    minHeight: '100%',
    height: '100%',
  },
  modContainer: { alignItems: 'center', justifyContent: 'center' },
  infoContainer: { justifyContent: 'flex-start' },
  section: {
    marginVertical: 4,
  },
  titleText: {
    fontWeight: '700',
    marginBottom: 2,
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  checkbox: {
    marginLeft: 10,
  },
});
