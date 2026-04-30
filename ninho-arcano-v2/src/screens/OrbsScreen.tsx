import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { colors } from '@/constants/colors';

export function OrbsScreen() {
  return (
    <AnimatedBackground variant="cradle">
      <View style={styles.wrap}>
        <RitualPanel>
          <Text style={styles.title}>As orbes vivem no Berço</Text>
          <Text style={styles.text}>Elas não devem virar uma lista. Volte ao Berço Arcano e arraste cada orbe até o ovo ou até a pedra.</Text>
        </RitualPanel>
      </View>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: colors.runeLit, fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 12 },
  text: { color: colors.text, fontSize: 16, lineHeight: 25, textAlign: 'center' }
});
