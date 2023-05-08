import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Linking } from 'react-native';
import { Navigation } from './components/Navigation';
import { COLORS } from './vars/colors';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation/>
      <StatusBar animated={false} style="light" barStyle='light-content' backgroundColor={COLORS.default} />
    </QueryClientProvider>

  );
}

const styles = StyleSheet.create({

})


