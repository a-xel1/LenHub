import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { createCourse } from '@/src/services/courses';
import { seedCourses } from '@/src/seed/courses';

export default function SeedScreen() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(0);

  const onSeed = async () => {
    try {
      setLoading(true);
      let count = 0;
      for (const c of seedCourses) {
        await createCourse({ ...c });
        count++;
        setDone(count);
      }
      Alert.alert('Seed Complete', `Inserted ${count} courses`);
    } catch (e: any) {
      Alert.alert('Seed failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seed Courses</Text>
      <Text>Prepared: {seedCourses.length}</Text>
      <Text>Inserted: {done}</Text>
      <Pressable style={styles.primary} disabled={loading} onPress={onSeed}>
        <Text style={styles.primaryText}>{loading ? 'Seeding...' : 'Seed Now'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  primary: { backgroundColor: '#0d3b66', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  primaryText: { color: '#fff', fontWeight: '600' },
});


