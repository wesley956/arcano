import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { colors } from '@/constants/colors';

export function RitualsScreen() {
  return (
    <AnimatedBackground variant="cosmic">
      <View style={styles.wrap}>
        <RitualPanel>
          <Text style={styles.title}>Rituais</Text>
          <Text style={styles.text}>Os rituais importantes acontecem no fluxo vivo: vínculo, incubação, nascimento, nome e Travessia.</Text>
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
