import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { RitualPanel } from '@/components/ui/RitualPanel';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ArcaneButton } from '@/components/ui/ArcaneButton';
import { officialPhrases } from '@/constants/lore';
import { colors } from '@/constants/colors';

export function TravessiaScreen() {
  return (
    <AnimatedBackground variant="cosmic">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Travessia" subtitle="A função futura que moverá o vínculo para outro aparelho." />
        <RitualPanel style={styles.panel}>
          <Text style={styles.quote}>{officialPhrases.crossing}</Text>
          <Text style={styles.text}>Nesta versão local/offline, a Travessia permanece como preparação de lore e interface.</Text>
          <Text style={styles.text}>Quando o jogo tiver servidor, cada dragão terá um ID global, cada aparelho terá um vínculo, e a Travessia moverá esse vínculo com segurança.</Text>
          <Text style={styles.text}>O aparelho antigo será liberado somente quando o vínculo atravessar. Nenhum ovo ou dragão será duplicado.</Text>
        </RitualPanel>
        <ArcaneButton title="Travessia ainda não disponível" disabled onPress={() => undefined} />
      </ScrollView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 48, paddingHorizontal: 20, paddingBottom: 36 },
  panel: { marginBottom: 20 },
  quote: { color: colors.runeLit, fontSize: 22, lineHeight: 31, fontWeight: '900', textAlign: 'center', marginBottom: 18 },
  text: { color: colors.text, fontSize: 15, lineHeight: 24, marginBottom: 12 }
});
