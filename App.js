import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

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

    /* Ouvinte de evento para as notificações recebidas */
    Notifications.addNotificationResponseReceivedListener((notificacao) => {
      console.log(notificacao);
    });
    /* Ouvinte de evento para as respostas dadas às notificações */
    Notifications.addNotificationReceivedListener((resposta) => {
      console.log(resposta);
    });
  }, []);

  const enviarMensagem = async () => {
    const mensagem = {
      title: "lembrete",
      body: "Não se esqueça de tomar água!",
      sound: "default",
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
});
