import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { DragonSprite } from '@/components/dragon/DragonSprite';
import { ArcaneButton } from '@/components/ui/ArcaneButton';
import { colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'NameDragon'>;

export function NameDragonScreen({ navigation }: Props) {
  const { state, nameDragon } = useGame();
  const [name, setName] = useState('');

  const save = () => {
    const clean = name.trim();
    if (!clean) return;
    nameDragon(clean);
    navigation.replace('TrueNestReveal');
  };

  return (
    <AnimatedBackground variant="dragon">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrap}>
        <Text style={styles.title}>Ele nasceu.</Text>
        <Text style={styles.subtitle}>Antes de revelar seu ninho verdadeiro, o filhote precisa ouvir o primeiro nome deste universo.</Text>
        <DragonSprite element={state.dragon.primaryElement} stage="newborn" />
        <View style={styles.inputWrap}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome do dragão"
            placeholderTextColor="rgba(248,241,231,0.38)"
            style={styles.input}
            maxLength={22}
          />
        </View>
        <ArcaneButton title="Sussurrar o nome" onPress={save} disabled={!name.trim()} />
      </KeyboardAvoidingView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center'
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 8
  },
  inputWrap: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,213,138,0.18)',
    backgroundColor: 'rgba(248,241,231,0.07)',
    marginBottom: 18
  },
  input: {
    color: colors.text,
    fontSize: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    textAlign: 'center'
  }
});
