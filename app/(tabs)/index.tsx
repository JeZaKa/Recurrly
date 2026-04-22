import ListHeading from '@/components/ListHeading';
import SubscriptionCard from '@/components/SubscriptionCard';
import UpcomingSubscriptionCard from '@/components/UpcomingSubscriptionCard';
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from '@/constants/data';
import { icons } from '@/constants/icons';
import image from '@/constants/image';
import { formatCurrency } from '@/lib/utils';
import dayjs from 'dayjs';
import { styled } from 'nativewind';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Image, Text, View, ScrollView } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

  const handlePress = useCallback((id: string) => {
    setExpandedSubscriptionId((current) => (current === id ? null : id));
  }, []);

  const renderSubscriptionItem = useCallback(
    ({ item }: { item: Subscription }) => (
      <SubscriptionCard
        {...item}
        expanded={expandedSubscriptionId === item.id}
        onPress={() => handlePress(item.id)}
      />
    ),
    [expandedSubscriptionId, handlePress]
  );

  const ListHeader = () => {
    return (
      <>
        <View className="home-header">
          <View className="home-user">
            <Image source={image.avatar} className="home-avatar" resizeMode="cover" />
            <Text className="home-user-name">{HOME_USER.name}</Text>
          </View>
          <Image source={icons.add} className="home-add-icon" />
        </View>
        <View className="home-balance-card">
          <Text className="home-balance-label">Balance</Text>
          <View className="home-balance-row">
            <Text className="home-balance-amount">
              {formatCurrency(HOME_BALANCE.amount)}
            </Text>
            <Text className="home-balance-date">
              {dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
            </Text>
          </View>
        </View>
        <View className="mb-5">
          <ListHeading title="Upcoming" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {UPCOMING_SUBSCRIPTIONS.length === 0 ? (
              <Text>No upcoming renewals yet.</Text>
            ) : (
              UPCOMING_SUBSCRIPTIONS.map((item) => (
                <UpcomingSubscriptionCard key={item.id} {...item} />
              ))
            )}
          </ScrollView>
        </View>
        <ListHeading title="All Subscriptions" />
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 p-5 bg-background">
      <FlatList
        data={HOME_SUBSCRIPTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderSubscriptionItem}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListHeaderComponent={ListHeader}
        extraData={expandedSubscriptionId}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No subscriptions yet.</Text>}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
}