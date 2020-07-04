![Logo CoffeeSes](https://github.com/rhamses/coffeses/blob/master/images/icons/icon-152x152.png)
# Bem vindo(a) ao CoffeeSés!
Este é o menu do Restaurante CoffeeSés, que todo dia tem um prato diferente para servir e pode te notificar da novidade sem mesmo precisar acessar o site. Atráves de um web app simples, de página única, que salva o cardápio dentro do navegador e é capaz de recupera-lo a qualquer momento. 

## Features
- **Registro de WebSocket** - Checagem de tecnologia para ver se o navegador suporta de fato WebSocket. Registro do websocket, verificações de status do websocket (registrando, esperando, ativando, falha)

- **Criação do Cache Offline** - Criação das funções de instalação do WebSocket, que neste caso cria o cache da aplicação dentro do navegador, além da função de fetch, que checa a existência deste cache e decide quando é o momento de puxar as informações da internet novamente. 

- **Pedido de Notificação e Push Notification** - A aplicação também conta com o pedido de aceite de envio de notificação para o usuário, além da inscrição do app dentro de um serviço de Push (Firebase neste caso). Além disso, também conta com as rotinas *push* e de interação do usuário com elas. 


## Para testar
- A API de demonstração pode ser acessada na url https://my-json-server.typicode.com/rhamses/coffeses/meals
- A URL do projeto pode ser acessada em https://coffeeses.netlify.app/
