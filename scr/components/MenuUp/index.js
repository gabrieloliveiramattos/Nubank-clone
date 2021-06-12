import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Content, Card, CardHeader, CardContent, Title, Description, CardFooter, Annotation } from './styles';
import { Animated } from 'react-native';
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import MenuDown from '../MenuDown';
import Tabs from '../tabs';

export default function MenuUp(){
  
  const [show, setShow] = React.useState(false);
  let offset = 0;
  const translateY = new Animated.Value(0);
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

    return(
        <Content>
            <MenuDown translateY={translateY} />
            <PanGestureHandler
                onGestureEvent={animatedEvent}
                onHandlerStateChange={onHandlerStateChanged}
            >
                <Card 
                    style={{
                        transform: [{
                            translateY: translateY.interpolate({
                                inputRange: [-200, 0, 380],
                                outputRange: [-50, 0, 380],
                                extrapolate: 'clamp',
                            }),
                        }],
                    }}
                >
                    <CardHeader>
                        <Icon name="attach-money" size={28} color="#666" />
                        <TapGestureHandler onActivated={()=>{setShow(!show)}}>
                          <Icon name={show == false ? "visibility-off" : "visibility" } size={28} color="#666" />
                        </TapGestureHandler>
                    </CardHeader>
                    <CardContent>
                        <Title>Saldo disponivel</Title>
                        <Description>R$ { show == false ? "***" : "268.456,95"} </Description>
                    </CardContent>
                    <CardFooter>
                        <Annotation>Transferencia de R$ { show == false ? "***" : "2.348,42"} recebida de Bill Gates hoje ás 09:00</Annotation>
                    </CardFooter>
                </Card>
            </PanGestureHandler>
        </Content>
    );
}