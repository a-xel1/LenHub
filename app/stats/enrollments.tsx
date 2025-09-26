import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import { useEffect, useMemo, useState } from 'react';
import { listCourses } from '@/src/services/courses';

export default function EnrollmentsStats() {
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => { listCourses().then(setCourses).catch(() => setCourses([])); }, []);
  const totalEnrollments = useMemo(() => courses.reduce((s, c: any) => s + (c?.enrollmentCount || 0), 0), [courses]);
  const avgPerCourse = useMemo(() => (courses.length ? (totalEnrollments / courses.length).toFixed(1) : '0.0'), [courses, totalEnrollments]);

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>Total Enrollments</Text>
      <Text style={styles.meta}>{totalEnrollments} total enrollments • Avg {avgPerCourse} per course</Text>
      <View style={{ height: 12 }} />
      {courses.map((c: any) => (
        <View key={c.id} style={styles.row}>
          <Text style={styles.course}>{c.title}</Text>
          <Text style={styles.count}>{c.enrollmentCount || 0}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  meta: { opacity: 0.7, marginTop: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e5e7eb' },
  course: { flex: 1, marginRight: 12 },
  count: { fontWeight: '700' },
});
