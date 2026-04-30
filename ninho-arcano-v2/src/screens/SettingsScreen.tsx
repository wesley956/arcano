import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ArcaneButton } from '@/components/ui/ArcaneButton';
import { colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';

export function SettingsScreen() {
  const { state, setSetting, advanceOneDay, forceBirthReady, generateOrbs, resetGame } = useGame();

  const askReset = () => {
    Alert.alert(
      'Resetar vínculo?',
      'Isso apaga o estado local deste aparelho. Use apenas em desenvolvimento.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Resetar', style: 'destructive', onPress: () => { resetGame().catch(() => undefined); } }
      ]
    );
  };

  return (
    <AnimatedBackground variant="cradle">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Configurações" subtitle="Ajustes simples sem quebrar o encanto do vínculo." />
        <RitualPanel style={styles.panel}>
          <ToggleRow label="Som ambiente" value={state.settings.soundEnabled} onValueChange={(value) => setSetting('soundEnabled', value)} />
          <ToggleRow label="Vibração/haptics" value={state.settings.hapticsEnabled} onValueChange={(value) => setSetting('hapticsEnabled', value)} />
          <ToggleRow label="Movimento reduzido" value={state.settings.reducedMotion} onValueChange={(value) => setSetting('reducedMotion', value)} />
          <ToggleRow label="Modo dev" value={state.settings.devMode} onValueChange={(value) => setSetting('devMode', value)} />
        </RitualPanel>
        {state.settings.devMode ? (
          <RitualPanel style={styles.panel}>
            <Text style={styles.devTitle}>Modo dev</Text>
            <Text style={styles.devText}>Energia interna do ovo: {JSON.stringify(state.egg.energy)}</Text>
            <Text style={styles.devText}>Energia interna do Berço: {JSON.stringify(state.cradle.energy)}</Text>
            <Text style={styles.devText}>Offset de dias: {state.time.devOffsetDays}</Text>
            <ArcaneButton title="Avançar 1 dia" onPress={advanceOneDay} style={styles.button} />
            <ArcaneButton title="Gerar orbes" variant="ghost" onPress={generateOrbs} style={styles.button} />
            <ArcaneButton title="Forçar nascimento disponível" variant="ghost" onPress={forceBirthReady} style={styles.button} />
            <ArcaneButton title="Resetar estado local" variant="danger" onPress={askReset} style={styles.button} />
          </RitualPanel>
        ) : null}
      </ScrollView>
    </AnimatedBackground>
  );
}

function ToggleRow({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (value: boolean) => void }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleText}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} thumbColor={value ? colors.runeLit : colors.muted} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 48, paddingBottom: 36 },
  panel: { marginHorizontal: 20, marginBottom: 14 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  toggleText: { color: colors.text, fontSize: 15, fontWeight: '700' },
  devTitle: { color: colors.runeLit, fontSize: 18, fontWeight: '900', marginBottom: 10 },
  devText: { color: colors.muted, fontSize: 12, lineHeight: 18, marginBottom: 6 },
  button: { marginTop: 10 }
});
