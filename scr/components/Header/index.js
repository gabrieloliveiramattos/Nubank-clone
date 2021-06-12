import React from 'react';
import { Container, Top, Logo, Title } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../../assets/Nubank_Logo.png';
import MenuUp from '../MenuUp';

export default function Header() {
  return (
    <Container>
      <Top>
        <Logo source={logo} />
        <Title>Gabriel</Title>
      </Top>
      <Icon name="keyboard-arrow-down" size={20} color="#FFF" />
      <MenuUp />
    </Container>
  );
}