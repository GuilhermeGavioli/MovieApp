// import clientPromise from '../../lib/mongodb';






// const movies = [


//     {
//         movie: "Sonic",
//         id: "17",
//         year: 2020,
//         genre: "Adventure, Aciton, Comedy",
//         director: "Jeff Fowler",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9f/Sonic_the_Hedgehog_2019.jpg/250px-Sonic_the_Hedgehog_2019.jpg",
    
//         description: "Sonic, o porco-espinho azul mais famoso do mundo, se junta com os seus amigos para derrotar o terrível Doutor Eggman, um cientista louco que planeja dominar o mundo, e o Doutor Robotnik, responsável por aprisionar animais inocentes em robôs.",
//     voters: []
//     },
    
//     {
//         movie: "Inception",
//         id: "18",
//         year: 2010,
//         genre: "Science Fiction, Action, Adventure",
//         director: "Christopher Nolan",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/8/84/AOrigemPoster.jpg/200px-AOrigemPoster.jpg",
    
//         description: "Dom Cobb é um ladrão com a rara habilidade de roubar segredos do inconsciente, obtidos durante o estado de sono. Impedido de retornar para sua família, ele recebe a oportunidade de se redimir ao realizar uma tarefa aparentemente impossível: plantar uma ideia na mente do herdeiro de um império. Para realizar o crime perfeito, ele conta com a ajuda do parceiro Arthur, o discreto Eames e a arquiteta de sonhos Ariadne. Juntos, eles correm para que o inimigo não antecipe seus passos.",
//     voters: []
//     },
    
//     {
//         movie: "Pirates of the Caribbean: Dead Men tells no Tales",
//         id: "19",
//         year: 2017,
//         genre: "Fantasy, Adventure, Action, Comedy",
//         director: "Joachim Ronning, Espen Sandberg",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/6/6e/Pirates_of_the_Caribbean_Dead_Men_Tell_No_Tales_IMAX.jpg/250px-Pirates_of_the_Caribbean_Dead_Men_Tell_No_Tales_IMAX.jpg",
//         description: "Salazar é a nova pedra no sapato do capitão Jack Sparrow. Ele lidera um exército de piratas fantasmas assassinos e está disposto a matar todos os piratas existentes na face da Terra. Para escapar, Sparrow precisa encontrar o Tridente de Poseidon, que dá ao seu dono o poder de controlar o mar.",
//         voters: []
//     },
    
//     {
//         movie: "The Shawshank Redemption",
//         id: "20",
//         year: 1994,
//         genre: "Drama",
//         director: "Frank Darabont",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d2/The_Shawshank_Redemption_p%C3%B4ster.png/233px-The_Shawshank_Redemption_p%C3%B4ster.png",
    
//         description: "Andy Dufresne é condenado a duas prisões perpétuas consecutivas pelas mortes de sua esposa e de seu amante. Porém, só Andy sabe que ele não cometeu os crimes. No presídio, durante dezenove anos, ele faz amizade com Red, sofre as brutalidades da vida na cadeia, se adapta, ajuda os carcereiros, etc.",
    
//     voters: []
//     },
    
//     {
//         movie: "The Shining",
//         id: "21",
//         year: 1980,
//         genre: "Classic, Horror, Thriller",
//         director: "Stanley Kubrick",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/2/22/Shining.png/220px-Shining.png",
    
//         description: "Jack Torrance se torna caseiro de inverno do isolado Hotel Overlook, nas montanhas do Colorado, na esperança de curar seu bloqueio de escritor. Ele se instala com a esposa Wendy e o filho Danny, que é atormentando por premonições. Jack não consegue escrever e as visões de Danny se tornam mais perturbadoras. O escritor descobre os segredos sombrios do hotel e começa a se transformar em um maníaco homicida, aterrorizando sua família.",
    
//     voters: []
//     },
    
    
//     {
//         movie: "The Good, The Bad and The Ugly",
//         id: "22",
//         year: 1966,
//         genre: "Classic, Western",
//         director: "Sergio Leone",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/1/12/The_Good_the_Bad_and_the_Ugly.jpg/230px-The_Good_the_Bad_and_the_Ugly.jpg",
    
//         description: "Durante a Guerra Civil Americana, um pistoleiro misterioso e dois estrangeiros decidem juntar suas forças para encontrar um tesouro escondido. Cada um dos homens conhece apenas uma parte da localização da fortuna, o que força essa parceria. O problema é que nenhum deles tem a intenção de dividir a riqueza.",
    
//     voters: []
//     },
    
//     {
//         movie: "Kung Fu Panda",
//         id: "23",
//         year: 2008,
//         genre: "Animation, Comedy",
//         director: "John Stevenson",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/7/76/Kungfupanda.jpg/200px-Kungfupanda.jpg",
    
//         description: "Po é um panda que trabalha na loja de macarrão da sua família e sonha em transformar-se em um mestre de kung fu. Seu sonho se torna realidade quando, inesperadamente, deve cumprir uma profecia antiga e estudar a arte marcial com seus ídolos, os Cinco Furiosos.",
    
//     voters: []
//     },
    
    
//     {
//         movie: "Raya and the Last Dragon",
//         id: "24",
//         year: 2021,
//         genre: "Animation, Adventure",
//         director: "Don Hall Carlos López Estrada",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/e/ea/Raya_and_the_Last_Dragon.png",
    
//         description: "Após uma reunião entre as tribos que acaba com seu clã sendo petrificado, Raya, agora uma exilada, sai em busca de um último dragão para que possa restabelecer a natureza do local. A princesa acaba encontrando Sisu, a última da espécie que decide ajudar Raya e deixar seus irmãos dragões orgulhosos.",
    
//     voters: []
//     },
    
//     {
//         movie: "Titanic",
//         id: "25",
//         year: 1998,
//         genre: "Classic, Romance",
//         director: "James Cameron",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/2/22/Titanic_poster.jpg/250px-Titanic_poster.jpg",
    
//         description: "Um artista pobre e uma jovem rica se conhecem e se apaixonam na fatídica jornada do Titanic, em 1912. Embora esteja noiva do arrogante herdeiro de uma siderúrgica, a jovem desafia sua família e amigos em busca do verdadeiro amor.",
    
//     voters: []
//     },
    
//     {
//         movie: "Avatar",
//         id: "26",
//         year: 2009,
//         genre: "Science Fiction, Action",
//         director: "James Cameron",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/b0/Avatar-Teaser-Poster.jpg/250px-Avatar-Teaser-Poster.jpg",
    
//         description: "No exuberante mundo alienígena de Pandora vivem os Na'vi, seres que parecem ser primitivos, mas são altamente evoluídos. Como o ambiente do planeta é tóxico, foram criados os avatares, corpos biológicos controlados pela mente humana que se movimentam livremente em Pandora. Jake Sully, um ex-fuzileiro naval paralítico, volta a andar através de um avatar e se apaixona por uma Na'vi. Esta paixão leva Jake a lutar pela sobrevivência de Pandora.",
    
//     voters: []
//     },
    
    
//     {
//         movie: "Avengers: Infinity War",
//         id: "27",
//         year: 2018,
//         genre: "Super-Hero, Action, Adventure, Science Fiction, Epic",
//         director: "Anthony and Joe Russo",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/90/Avengers_Infinity_War.jpg/250px-Avengers_Infinity_War.jpg",
    
//         description: "Homem de Ferro, Thor, Hulk e os Vingadores se unem para combater seu inimigo mais poderoso, o maligno Thanos. Em uma missão para coletar todas as seis pedras infinitas, Thanos planeja usá-las para infligir sua vontade maléfica sobre a realidade.",
    
//     voters: []
//     },
    
//     {
//         movie: "Avengers: Endgame",
//         id: "28",
//         year: 2019,
//         genre: "Super-Hero, Action, Adventure, Science Fiction, Epic",
//         director: "Anthony and Joe Russo",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg",
    
//         description: "Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco.",
    
//     voters: []
//     },
    
    
//     {
//         id: "29",
//         year: 2006,
//         movie: "Monster House",
//         genre: "Fantasy, Animation, Horror",
//         director: "Gil Kenan",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/8/8d/Monster_House.jpg/200px-Monster_House.jpg",
//         description: "Nenhum adulto acredita quando três adolescentes falam que existe uma casa no bairro que é uma criatura perigosa. Com o Dia das Bruxas se aproximando, eles têm que descobrir uma forma de destruir a casa antes que ela faça mal a crianças inocentes.",
//         voters: [],
    
//     },
    
//     {
//         id: "30",
//         year: 1994,
//         genre: "Classic, Animation",
//         movie: "Lion King",
//         director: "Rob Minkoff e Roger Allers",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/b3/The_Lion_King.jpg/235px-The_Lion_King.jpg",
//         description: "Este desenho animado da Disney mostra as aventuras de um leão jovem de nome Simba, o herdeiro de seu pai, Mufasa. O tio malvado de Simba, Oscar, planeja roubar o trono de Mufasa atraindo pai e filho para uma emboscada. Simba consegue escapar e somente Mufasa morre. Com a ajuda de seus amigos,Timon e Pumba, ele reaparece como adulto para recuperar sua terra, que foi roubada por seu tio Oscar.",
//         voters: [],
    
//     },
    
//     {
//         id: "31",
//         year: 2009,
//         movie: "Up",
//         genre: "Animation, Adventure",
//         director: "Pete Docter",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/a8/Up_p%C3%B4ster.jpg/243px-Up_p%C3%B4ster.jpg",
//         description: "Carl Fredricksen é um vendedor de balões que, aos 78 anos, está prestes a perder a casa em que sempre viveu com sua esposa, a falecida Ellie. Após um incidente, Carl é considerado uma ameaça pública e forçado a ser internado. Para evitar que isto aconteça, ele põe balões em sua casa, fazendo com que ela levante voo. Carl quer viajar para uma floresta na América do Sul, onde ele e Ellie sempre desejaram morar, mas descobre que um problema embarcou junto: Russell, um menino de 8 anos.",
//         voters: [],
    
//     },
    
//     {
//         id: "32",
//         year: 1964,
//         movie: "A Fistful of Dollars",
//         genre: "Western, Spaghetti Western, Action",
//         director: "Sergio Leone",
//         img_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Clint_Eastwood_-_1960s.JPG/200px-Clint_Eastwood_-_1960s.JPG",
//         description: "Um pistoleiro chega numa cidade Mexicana que se encontra em guerra, San Miguel. Os dois grupos rivais notam que o forasteiro é muito habilidoso e cada um oferece uma proposta para ele ajudá-los na disputa. Ganancioso, ele acaba aceitando as duas propostas.",
//         voters: [],
    
//     },
    
//     {
//         id: "33",
//         year: 1965,
//         movie: "For a Few Dollars More",
//         genre: "Western, Spaghetti Western, Action",
//         director: "Sergio Leone",
//         img_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/La_Muerte_Ten%C3%ADa_un_Precio.jpg/230px-La_Muerte_Ten%C3%ADa_un_Precio.jpg",
//         description: "No Velho Oeste, um bandido assassino conhecido como El Indio e sua gangue estão aterrorizando e roubando os cidadãos da região. Com uma recompensa pela cabeça de El Indio, dois caçadores de recompensas, Monco e o coronel Douglas Mortimer, querem receber o prêmio. Após seu primeiro encontro, os dois homens se veem como rivais, mas acabam concordando em se tornar parceiros na procura do criminoso cruel.",
//         voters: [],
    
//     },
    
//     {
//         id: "34",
//         year: 2017,
//         movie: "Cars 3",
//         genre: "Animation, Comedy",
//         director: "Brian Free",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/94/Cars_3_poster.jpg/250px-Cars_3_poster.jpg",
//         description: "Durante mais uma disputa eletrizante nas pistas, o campeão Relâmpago McQueen acelerou demais e acabou perdendo o controle. Agora, após ter capotando várias vezes e quase ter partido dessa para melhor, o vermelinho vai ter sua vida alterada para sempre. O acidente foi tão grave que, com os estragos, McQueen pode ter que se aposentar de vez.",
//         voters: [],
    
//     },
    
//     {
//         id: "35",
//         year: 2006,
//         movie: "Cars",
//         genre: "Animation, Comedy",
//         director: "John Lasseter",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Carros_p%C3%B4ster.jpg/250px-Carros_p%C3%B4ster.jpg",
//         description: "Relâmpago McQueen (Owen Wilson) é um carro de corridas ambicioso, que já em sua 1ª temporada na Copa Pistão torna-se um astro. Ele sonha em se tornar o 1º estreante a vencer o campeonato, o que possibilitaria que assinasse um patrocínio com a cobiçada Dinoco.",
//         voters: [],
    
//     },
//     {
//         id: "36",
//         year: 2011,
//         movie: "Cars 2",
//         genre: "Animation, Comedy",
//         director: "John Lasseter",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/7/7e/Carros_2_P%C3%B4ster.jpg/250px-Carros_2_P%C3%B4ster.jpg",
//         description: "O astro das corridas, Relâmpago McQueen, e o carro-guincho, Mate, viajam para disputar o primeiro Grand Prix Mundial, que irá revelar o carro mais veloz do planeta. Nessa jornada imperdível, Mate se envolve com um grupo de espionagem e vive grandes aventuras com seus amigos.",
//         voters: [],
    
//     },
    
//     {
//         id: "37",
//         year: 2006,
//         movie: "pirates of the caribbean dead man's chest",
//         genre: "Adventure, Action",
//         director: "Gore Verbinski",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d4/Pirates_of_the_Caribbean_2.jpg/250px-Pirates_of_the_Caribbean_2.jpg",
//         description: "Will e Elizabeth estão prestes a se casar quando o lendário pirata Davy Jones, comandante de um invencível navio assombrado, aparece para cobrar uma dívida do capitão Jack Sparrow, amigo do casal. Agora, a única chance de Sparrow se livrar de uma maldição de Jones é encontrando o baú da morte.",
//         voters: [],
    
//     },
    
//     {
//         id: "38",
//         year: 2001,
//         movie: "Harry Potter and the Philosopher's Stone",
//         genre: "Fantasy, Adventure",
//         director: "Chris Columbus",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/1/1d/Harry_Potter_Pedra_Filosofal_2001.jpg/250px-Harry_Potter_Pedra_Filosofal_2001.jpg",
//         description: "Harry Potter é um garoto órfão que vive infeliz com seus tios, os Dursleys. Ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos. Inicialmente, Harry é impedido de ler a carta por seu tio, mas logo recebe a visita de Hagrid, o guarda-caça de Hogwarts, que chega para levá-lo até a escola. Harry adentra um mundo mágico que jamais imaginara, vivendo diversas aventuras com seus novos amigos, Rony Weasley e Hermione Granger.",
//         voters: [],
    
//     },
    
//     {
//         id: "39",
//         year: 1996,
//         movie: "Space Jam",
//         genre: "Animation, Comedy",
//         director: "Joe Pytka",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d0/SpaceJam.jpg/243px-SpaceJam.jpg",
//         description: "Alienígenas querem que Pernalonga e sua turma tornem-se a principal atração de um parque de diversões. Prestes a ser capturado, Pernalonga propõe um jogo de basquete em troca de sua liberdade. E, para enfrentar o temível time alienígena, o coelho convoca um importante reforço, uma conhecida estrela do basquete americano.",
//         voters: [],
    
//     },
    
//     {
//         id: "40",
//         year: 2002,
//         movie: "Harry Potter and the Chamber of Secrets",
//         genre: "Fantasy, Adventure, Romance",
//         director: "Chris Columbus",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/3/33/Chamber_of_Secrets.jpg/250px-Chamber_of_Secrets.jpg",
//         description: "Após as sofríveis férias na casa dos tios, Harry Potter se prepara para voltar a Hogwarts e começar seu segundo ano na escola de bruxos. Na véspera do início das aulas, a estranha criatura Dobby aparece em seu quarto e o avisa de que voltar é um erro e que algo muito ruim pode acontecer se Harry insistir em continuar os estudos de bruxaria. O garoto, no entanto, está disposto a correr o risco e se livrar do lar problemático.",
//         voters: [],
    
//     },
    
//     {
//         id: "41",
//         year: 2004,
//         movie: "Harry Potter and the Prisioner of Azkaban",
//         genre: "Fantasy, Adventure",
//         director: "Alfonso Cuarón",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/be/Harry_Potter_Prisioneiro_Azkaban_2004.jpg/250px-Harry_Potter_Prisioneiro_Azkaban_2004.jpg",
//         description: "É o início do terceiro ano na escola de bruxaria Hogwarts. Harry, Ron e Hermione têm muito o que aprender. Mas uma ameaça ronda a escola e ela se chama Sirius Black. Após doze anos encarcerado na prisão de Azkaban, ele consegue escapar e volta para vingar seu mestre, Lord Voldemort. Para piorar, os Dementores, guardas supostamente enviados para proteger Hogwarts e seguir os passos de Black, parecem ser ameaças ainda mais perigosas.",
//         voters: [],
    
//     },
    
//     {
//         id: "42",
//         year: 1988,
//         movie: "Who Framed Roger Rabbit",
//         genre: "Animation, Comedy, Adventure, Noir, Crime, Mistery",
//         director: "Robert Zemeckis",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/4/4b/Who_Framed_Roger_Rabbit.gif/233px-Who_Framed_Roger_Rabbit.gif",
//         description: "Na Hollywood dos anos 1940, uma época em que seres humanos e personagens de desenho animado existiam lado a lado, o coelho Roger Rabbit é acusado de um crime que não cometeu e se une a um detetive para limpar o seu nome e tentar provar a sua inocência.",
//         voters: [],
//     },
    
    
//     {
//         id: "43",
//         year: 2007,
//         movie: "Harry Potter and the Order of the Phoenix",
//         genre: "Fantasy, Adventure, Action, Romance",
//         director: "David Yates",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/98/Harry_Potter_Order_Phoenix_2007.jpg/235px-Harry_Potter_Order_Phoenix_2007.jpg",
//         description: "Após um verão desastroso, Harry volta para o seu quinto ano em Hogwarts, um dos mais difíceis que terá de encarar. Pouquíssimos alunos e pais acreditam nele ou em Dumbledore sobre a volta de Voldemort, e uma série interminável de artigos circula dizendo que eles estão completamente malucos. Ainda por cima, Dolores Umbridge, a nova professora de Defesa Contra as Artes das Trevas, prova ser a pessoa mais repugnante que Harry já conheceu.",
//         voters: [],
    
//     },
    
    
//     {
//         id: "44",
//         year: 2007,
//         movie: "Harry Potter and the Half-Blood Prince",
//         genre: "Fantasy, Adventure, Action, Romance",
//         director: "David Yates",
//         img_src: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/b0/Harry_Potter_Half_Blood_Prince_2009.jpg/250px-Harry_Potter_Half_Blood_Prince_2009.jpg",
//         description: "No sexto ano de Harry em Hogwarts, Lord Voldemort e seus Comensais da Morte estão criando o terror nos mundos bruxo e trouxa. Dumbledore convence seu velho amigo Horácio Slughorn para retornar a Hogwarts como professor de poções após Harry encontrar um estranho livro escolar. Draco Malfoy se esforça para realizar uma ação destinada por Voldemort, enquanto Dumbledore e Harry secretamente trabalham juntos a fim de descobrir o método para destruir o Lorde das Trevas uma vez por todas.",
//         voters: [],
    
//     },
 
// ]



// export default async function Insert(req, res) {
    
//     const client = await clientPromise;
//     const db = await client.db(process.env.MONGODB_DB);

//     movies.map(movie => { 
//         db.collection('new').insertOne({
//             id: movie.id,
//             movie: movie.movie,
//             year: movie.year,
//             genre: movie.genre,
//             director: movie.director,
//             img_src: movie.img_src,
//             description: movie.description,
//             voters: []
//         });

//     })
//     res.json({done: true})

// }
