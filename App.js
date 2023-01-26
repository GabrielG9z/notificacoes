import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

/* Manipulador de eventos de notificação */
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    /* Necessário para IOS */
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
          allowAnnouncements: true,
        },
      });
    }
    permissoesIos();

    /* Ouvinte de evento para as respostas dadas às notificações */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);

      /* Ouvinte de evento para as notificações recebidas, ou seja, quando a notificação aparece no topo da tela do dispositivo */
      Notifications.addNotificationResponseReceivedListener((resposta) => {
        console.log(resposta.notification.request.content.data);
        setDados(resposta.notification.request.content.data);
      });
    });
  }, []);

  const enviarMensagem = async () => {
    const mensagem = {
      title: "lembrete ♠️ ♣️ ♥️ ♦️ 🃏 ",
      body: "Não se esqueça de tomar água!",
      sound: Platform.OS === "ios" ? "default" : "", //necessário pro iOS
      data: { usuario: "Gabriel 🐣", cidade: "São Paulo 📍" },
    };

    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 5 },
    });
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text>Exemplo de sistema de notificações local</Text>
        <View style={styles.botao}>
          <Button title="Disparar Notificação" onPress={enviarMensagem} />
          {dados && (
            <View>
              <Text> {dados.usuario} </Text>
              <Text> {dados.cidade} </Text>
            </View>
          )}
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  botao: {
    borderRadius: 5,
    borderWidth: 2,
    margin: 6,
    borderColor: "green",
  },
  conteudo: {
    marginVertical: 8,
    backgroundColor: "purple",
  },
});
