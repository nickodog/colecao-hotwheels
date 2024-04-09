# colecao-hotwheels
 site de gerenciamento de coleção de carrinhos Hot Wheels

Ao iniciar, temos a página inicial do site, o componente ”Home”,
que possui uma breve mensagem de boas-vindas e o componente
”Navigation”, que está presente em todas as páginas permitindo a
navegação entre elas. O componente ”Navigation” é uma ’navbar’
formada de divs que contém links dentro, utilizando da biblioteca
React Router, criando os URLs, as rotas para cada página do site.
Ele é chamado no ”App.js”, dentro de um Router, junto das Routes
para cada página, permitindo que apareça em todas as páginas.
Na página inicial temos também um “carousel” de imagens
relacionadas à hot wheels, com botões de slide que avançam e
retrocedem as imagens (feito com bootstrap).

A página ”Sobre” usa o componente ”About”, com uma breve
mensagem que explica o uso do site.

A página ”Carros” é onde fica a lista de todos os posts feito pelo
usuário na página ”Adicionar Carro”. É usado o componente
”ListarCarros”, o qual faz um get na rota “/cars”, buscando as
informações dos carros e os listando, permitindo as funções de
excluir e modificar algum item da lista.
No caso da modificação de um item, ele aparece como um link na
lista, e quando ele é clicado, redireciona para uma página
semelhante à ”Adicionar Carro”, usando o componente “CarDetail”,
mas, neste caso, é feito um get na rota “/cars/id do carro", puxando
as informações de um carro pelo seu id, e então, quando é feito o
submit, emite um put que repõem o carro na lista com as
informações atualizadas.
Para excluir um carro, clicamos no ícone de lixeira do lado do link,
onde somos levados para a rota “/cars/delete/id do carro” que usa o
componente “DeleteCar", mostrando uma confirmação se
queremos ou não deletar o carro. Se pressionado o botão "sim”,
envia um delete para rota "/cars/id do carro”, que exclui o carro do
"carsData.json”
A lista de carros é o arquivo “carsData.json” que fica na
“hotwheels-api”, dentro da pasta “data”. Se não há nenhum item na
lista, uma mensagem aparece.

A página ”Adicionar Carro” é do componente ”AddCarros”. É aqui
que fica o form para adicionar os carros, que manda um post na
rota ”/cars”, adicionando o carro no ”carsData.json“. Todos os forms
do site usam States para monitorar cada input e usam dos
componentes na pasta hooks ”useHotwheels.js” e
”useHotwheelsApi.js” para executar os verbs PUT, GET, DELETE e
POST usando o axios.

Fazemos uso também do cypress, para testar nossos
componentes. Há 3 testes ao todo neste projeto, os quais usam e
mostram todos os componentes documentados neste arquivo. Para iniciar
a API, crie um terminal, digite o comando “cd hotwheels-api"
e o comando “npm start” logo após. Para iniciar o projeto React,
abra outro terminal, digite o comando “cd olamundo2” e então “npm
start”. Para iniciar o cypress, abra outro terminal, digite o comando
“cd olamundo2" e então o comando “npx cypress open”.