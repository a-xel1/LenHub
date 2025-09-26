import { FlatList, Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthChanged } from '@/src/services/auth';
import { listFollowers, Follower } from '@/src/services/followers';

export const options = {
  presentation: 'modal' as const,
  title: 'Followers',
};

export default function FollowersScreen() {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthChanged(async (user) => {
      setLoading(true);
      try {
        if (user?.uid) {
          const data = await listFollowers(user.uid);
          setFollowers(data);
        } else {
          setFollowers([]);
        }
      } finally {
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {followers.length === 0 ? (
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: '700' }}>No followers yet</Text>
          <Text style={{ opacity: 0.7, marginTop: 4 }}>When people follow you, they will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={followers}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
              </View>
              <Pressable style={styles.unfollow}><Text style={styles.unfollowText}>Unfollow</Text></Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 14 },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  name: { fontWeight: '700' },
  role: { opacity: 0.7, marginTop: 2 },
  unfollow: { backgroundColor: '#dc2626', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  unfollowText: { color: '#fff', fontWeight: '600' },
});


