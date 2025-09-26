import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Text } from '@/components/Themed';

const students = Array.from({ length: 13 }).map((_, i) => ({
  id: String(i + 1),
  name: [
    'Amara Johnson','Ifeanyi Okafor','Kelechi Nwosu','Aisha Bello','Chinedu Obi','Zainab Abdullahi','Adaeze Nnamdi','Tunde Adebayo','Ngozi Umeh','Femi Dada','Sade Ogun','Kachi Eze','Yemi Alabi'
  ][i],
  avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  track: ['UI/UX Design','Frontend Dev','Backend Dev','Mobile Dev','Data Science','Product Mgmt'][i % 6],
}));

export default function StudentsStats() {
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>Total students</Text>
      <Text style={styles.meta}>{students.length} students enrolled.</Text>
      <View style={{ height: 12 }} />
      {students.map((s) => (
        <View key={s.id} style={styles.row}>
          <Image source={{ uri: s.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{s.name}</Text>
            <Text style={styles.track}>{s.track}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  meta: { opacity: 0.7, marginTop: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e5e7eb' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e5e7eb' },
  name: { fontWeight: '700' },
  track: { opacity: 0.6, marginTop: 2 },
});
