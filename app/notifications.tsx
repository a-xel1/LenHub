import { FlatList, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthChanged } from '@/src/services/auth';
import { listNotifications, NotificationItem } from '@/src/services/notifications';

export const options = {
  presentation: 'modal' as const,
  title: 'Notifications',
};

export default function NotificationsScreen() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthChanged(async (user) => {
      setLoading(true);
      try {
        if (user?.uid) {
          const data = await listNotifications(user.uid);
          setItems(data);
        } else {
          setItems([]);
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
      {items.length === 0 ? (
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: '700' }}>No notifications yet</Text>
          <Text style={{ opacity: 0.7, marginTop: 4 }}>Your notifications will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.icon || 'https://images.unsplash.com/photo-1529336953125-c6c3ab9d5f13?w=200' }} style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
              {!!item.time && <Text style={styles.time}>{item.time}</Text>}
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 12, alignItems: 'center' },
  icon: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  title: { fontWeight: '700' },
  body: { marginTop: 2, opacity: 0.7 },
  time: { marginLeft: 8, opacity: 0.6 },
});


