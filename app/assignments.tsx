import { StyleSheet, View, Text } from 'react-native';

export const options = { presentation: 'modal' as const, title: 'Assignments' };

export default function AssignmentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assignments</Text>
      <Text style={styles.muted}>No assignments yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'transparent' },
  header: { fontWeight: '700', fontSize: 18 },
  muted: { opacity: 0.6, marginTop: 6 },
});


