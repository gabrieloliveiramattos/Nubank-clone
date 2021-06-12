import React from 'react';
import { Container } from './styles';
import Header from '../../components/Header';
import Tabs from '../../components/tabs';
import { StatusBar } from 'react-native';


export default function Home() {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#8B10AE" />
      <Header />
      <Tabs />
    </Container>
);
}