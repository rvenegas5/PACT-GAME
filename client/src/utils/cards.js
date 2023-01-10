function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const normal = [
  {
    content:
      "Te acabas de mudar a tu nueva casa con tu familia, los gastos económicos los tienen muy limitados y lo sabes bien. De repente en la parte de al frente de tu casa llega una perrita a cubrirse del sol todos los días, tiene apenas 6 meses y no sabes si es de otra familia, ¿Qué harías? ",
    type: "normal",
    options: {
      a: "Hacer que la liguen para evitar que quede preñada, ya que pasa mucho tiempo en la calle",
      b: "Ignorarla cada vez que la veas",
      c: "Adoptarla y ligarla para evitar el gasto de más perritos",
      d: "Ligarla y darla en adopción",
    },
    pet: "dog",
  },
  {
    content:
      "Te dan de cuidar a un gato durante una semana, te encariñas con el gato, pero te das cuenta de que en su hogar lo maltratan mucho porque tiene marcas de golpes y desnutrición. ¿Qué harías?",
    type: "normal",
    options: {
      a: "Denunciar a los dueños de maltrato animal con pocas esperanzas de que se resuelva el problema",
      b: "“Adoptar” al gato para evitar que siga sufriendo una situación de maltrato y decirle a los dueños que se perdió",
      c: "Regresar al gato con sus dueños cuando termine la semana",
      d: "Ligar al gato y darlo en adopción",
    },
    pet: "cat",
  },
  {
    content:
      "En tu trabajo constantemente aparece una perrita callejera, tú sueles darle de comer y ella se lleva bien contigo y tus compañeros de trabajo.  ¿Qué harías? ",
    type: "normal",
    options: {
      a: "Adoptarla y llevarla al veterinario para que la bañen y le quiten las pulgas y garrapatas",
      b: "Convencer a tus compañeros de trabajo para ver quién la puede adoptar",
    },
    pet: "dog",
  },
  {
    content:
      "Te encuentras trotando en un parque cuando te percatas que un hombre se encuentra golpeando a un can contra una malla. ¿Qué es lo primero que haces?",
    type: "normal",
    options: {
      a: "Grabar el hecho para que luego se puedan tomar acciones legales contra el perpetuador del maltrato",
      b: "Intentar detener al señor mediante llamados de atención",
      c: "Llamar a la unidad de bienestar animal de la ciudad para que se proceda con el rescate del can",
      d: "Llamar a la policía para que se proceda con el arresto del hombre",
    },
    pet: "dog",
  },
  {
    content:
      "El perro de tu vecino es muy cercano a ti, todos los días lo ves por la ventana de tu patio jugar. Un día su dueño lo lleva con una correa a pasear, pero no regresa con él, luego de 2 días de no verlo, te enteras de que lo abandonó en un parque cerca de tu casa, ¿qué haces?",
    type: "normal",
    options: {
      a: "Denunciar al dueño por abandonar su mascota",
      b: "Comenzar una búsqueda para recuperarlo",
      c: "Hablar con el dueño para crear conciencia, que se arrepienta y te ayude a buscarlo",
      d: "Ligar al perro y darlo en adopción",
    },
    pet: "dog",
  },
  {
    content:
      "Has escuchado que el perro de tus vecinos ha llorado constantemente durante los tres últimos días.Luego de tocar el timbre en repetidas ocasiones te das cuenta de que no hay nadie en casa. Además, puedes observar por el cerramiento que no posee agua ni alimento. ¿Qué harías?",
    type: "normal",
    options: {
      a: "Llamar a los dueños de casa, explicarles el estado actual del canino y monitorear al perro hasta que los propietarios regresen a casa",
      b: "Llamar a algún centro encargado del rescate animal y reportar el incidente",
      c: "Comprar alimento para perros e intentar pasarlo por los huecos del cerramiento",
      d: "Rescatar al perro, ligarlo y darlo en adopción",
    },
    pet: "dog",
  },
  {
    content:
      "Como actuarías si durante varias ocasiones has visto que un niño de 5 años de tu vecindario tiene comportamientos abusivos con su mascota cuando sus padres no lo observan",
    type: "normal",
    options: {
      a: "Intentar explicarle al niño cuales son las formas correctas de tratar a un animal",
      b: "Hablar con los padres del infante acerca de los maltratos que está sufriendo la mascota cuando no lo supervisan",
    },
    pet: "dog",
  },
  {
    content:
      "Cual sería tu respuesta si en un día extremadamente caluroso observas que en un estacionamiento se encuentra un perro encerrado en un vehículo con las ventanas cerradas y sin el aire acondicionado encendido",
    type: "normal",
    options: {
      a: "Anotar el número de placa del automóvil e intentar encontrar al dueño del perro.",
      b: "Monitorear el estado del canino y en caso de señales de golpes de calor acercarse lo más rápido posible a algún guardia de seguridad",
      c: "Llamar al 911 o rescate animal lo más pronto posible",
      d: "Romper el vidrio, rescatar al perro, ligarlo y darlo en adopción",
    },
    pet: "dog",
  },
  {
    content:
      "Últimamente tu familia y tu sienten que tienen la estabilidad económica y las ganas de tener un compañero más en la familia, tus hijos están muy interesados en un perro golden que vieron ¿qué harías?",
    type: "normal",
    options: {
      a: "Veo páginas de adopción en busca de un perro cualquiera para darle una mejor vida",
      b: "No me complico y compro un perro de la raza que mis hijos querían en mercadolibre",
      c: "Busco en diferentes portales de adopción un perro que sea parecido o la raza que estoy buscando",
      d: "Rescato el primer perro bonito de la calle que encuentre",
    },
    pet: "dog",
  },
  {
    content:
      "Te vas a un viaje de negocios que es importante para la empresa en la que trabajas y el cual durará entre dos semanas y un mes, dependiendo de cómo salgan las cosas. Tienes un perrito que no se puede quedar solo en todo ese tiempo ¿Qué haces?",
    type: "normal",
    options: {
      a: "Se lo dejas a un amigo o a un familiar que no tiene mucha experiencia, pero en el que confías mucho",
      b: "Lo dejas en una guardería canina,aunque no tienes referencia de este lugar",
      c: "Contratas a alguien que se encargue de ir a tu casa y le deje suficiente alimento para el día",
      d: "Lo llevas contigo",
    },
    pet: "dog",
  },
  {
    content:
      "¿Cuál actividad de maltrato animal piensas que es la que se suele ver más en la actualidad?",
    type: "normal",
    options: {
      a: "Suele verse muchos casos de personas que compran animales para fines comerciales como su reproducción",
      b: "En muchos lugares enfocados en el entretenimiento compran animales para entrenarlos fuertemente",
      c: "Es muy común ver personas que compran animales solo para protección de sus hogares sin pensar en su bienestar",
      d: "Se ve mucho el maltrato animal en los circos",
    },
    pet: "cat",
  },
  {
    content:
      "Trabajas en un laboratorio donde para probar la efectividad de una cura para el cáncer se deben realizar pruebas en animales. Normalmente la empresa no recurre a estos métodos, pero para estas últimas fases era estrictamente necesario. ¿Qué haces?",
    type: "normal",
    options: {
      a: "Reporto la situación, los animales no deberían sufrir a nuestra costa",
      b: "Lo dejo pasar, solo quedan unas cuantas pruebas más por realizar y es por un bien mayor. Además, es probable que la situación no se vuelva a repetir",
    },
    pet: "dog",
  },
  {
    content:
      "Te encuentras haciendo las compras en el supermercado y de regreso a casa notas que en un basurero hay una gata con 5 gatitos recién nacidos, frente a esta situación ¿qué harías?",
    type: "normal",
    options: {
      a: "Publicar en redes sociales la información para encontrarles un hogar a estos gatitos",
      b: "Los llevas a un albergue o fundación animal para que les busquen hogares",
      c: "Decides llevarlos a tu casa y cuidarlos",
      d: "Los dejas ahí, ya que no tienes tiempo para cuidarlos",
    },
    pet: "cat",
  },
  {
    content:
      "Vas caminando por la calle y te encuentras con una caja de cartón que tiene un grupo de gatitos recién nacidos en la calle, ¿qué haces?",
    type: "normal",
    options: {
      a: "No puedes resistirte así que te los llevas a la casa y los terminas adoptando",
      b: "Publicas sus fotos en páginas de adopción hasta encontrarle una familia",
      c: "Te quedas esperando a ver si su mama regresa a por ellos",
      d: "Los dejas ahí, ya que no tienes tiempo para cuidarlos",
    },
    pet: "cat",
  },
  {
    content:
      "Si tuvieras que escoger una sola opción ¿Qué es lo principal qué harías para acabar con el maltrato animal?",
    type: "normal",
    options: {
      a: "Aviso a las autoridades cada que vea alguna situación de maltrato animal",
      b: "No compraría artículos en los que se realizaron pruebas con animales",
      c: "No asisto a lugares donde se usan a los animales como medio de entretenimiento (circos,etc)",
      d: "Difundo y apoyo en redes sociales",
    },
    pet: "foca",
  },
  {
    content:
      "Vas saliendo de tu casa cuando observas a lo lejos una funda plástica moviéndose. Cuando abres la misma descubres a un gato con varias heridas. ¿Cuál es tu reacción inmediata?",
    type: "normal",
    options: {
      a: "Sacar al gato de la funda y acercarte al veterinario más cercano para una revisión completa del animal",
      b: "Sacar al gato de la funda y llevarlos a un centro de rescate animal para que le encuentre un hogar",
    },
    pet: "cat",
  },
  {
    content:
      "Regresas caminando por el parque que siempre transitas hacia tu casa y de repente te encuentras con una gatita mansa que se te acerca, está preñada y quiere que la acaricies, ¿Qué harías?",
    type: "normal",
    options: {
      a: "Seguir caminando e ignorarla",
      b: "Ir a tu casa y regresar con comida",
      c: "Ir a tu casa y plantear la situación de adoptarla a tus padres, pero si no funciona, no regresas",
      d: "La acaricias y la llevas a tu casa",
    },
    pet: "cat",
  },
  {
    content:
      "Estas pasando por la ciudad y ves que hay un nido de aves con polluelos recién nacidos en una palmera ubicada en un lugar muy peligroso, al ver esta situación ¿qué haces?",
    type: "normal",
    options: {
      a: "Consideras que las aves son animales que pueden cuidarse muy bien e hicieron su nido en ese lugar para evitar depredadores, por lo que pasas sin hacer nada",
      b: "Consigues una escalera y mueves el nido a un lugar más seguro",
      c: "Te llevas el nido y crías a las aves en tu casa",
      d: "Llamas a algún experto en animales para que te ayude a decidir qué hacer",
    },
    pet: "birds",
  },
  {
    content:
      "Tu vecino tiene dos loros que los ha criado desde pequeños, pero siempre los ha tenido encerrados. Un día se abre la puerta de la jaula por accidente y estos loros salen volando y se posan cerca de tu casa. En estas condiciones ¿qué harías? ",
    type: "normal",
    options: {
      a: "No hacer nada y no avisarle a tu vecino donde están para que puedan ser libres",
      b: "Comunicarte con tu vecino y decirle el paradero de sus loros",
      c: "Llamar al control de animales salvajes para que los capturen y los lleven a un refugio para reintroducirlos a la naturaleza",
      d: "Atraparlos y entregarlos a tu vecino",
    },
    pet: "parrot",
  },
  {
    content:
      "Si vas pasando por una casa, ves que tienen un chimpancé de mascota en malas condiciones y sabes que es un animal salvaje en peligro de extinción. ¿Qué harías?",
    type: "normal",
    options: {
      a: "Llamar a una fundación protectora de animales",
      b: "Ir a hablar con los duelos acerca de la situación de su mascota para concientizarlos de que no es correcto tener un animal así sin los debidos cuidados",
      c: "Hacer un seguimiento durante un mes para ver si la situación sigue igual y luego de eso llamar a alguna organización protectora de animales",
      d: "No hacer nada, ya que no es tu problema",
    },
    pet: "monkey",
  },
  {
    content:
      "Te enteras de que tu hermano ha adoptado como mascota una cría de mono araña, especie en peligro de extinción. Lo adoptó debido a que su madre murió en cautiverio dentro de un circo. El mono está muy bien cuidado y tu hermano, quien está muy encariñado con su mascota, prometió que cuando el animal sea adulto lo devolverá a su hábitat natural",
    type: "normal",
    options: {
      a: "Llamas a las autoridades pertinentes y reportas el caso, aunque sabes que tu hermano sufrirá las consecuencias",
      b: "Le permites que lo tenga, solo será por un tiempo. Además, el mono está en excelente cuidado y parece feliz",
      c: "Le explicas todo lo que implica tener al mono a su cuidado y las consecuencias que tendrá si le llega a pasar algo al animal, con el fin de que recapacite y lo lleve con rescate animal",
      d: "No haces nada, ya que no es tu problema",
    },
    pet: "monkey",
  },
  {
    content:
      "Vas conduciendo por la calle en tu motocicleta y de repente sale un gato corriendo desde una casa y lo atropellas, ¿qué haces?",
    type: "normal",
    options: {
      a: "Llevarlo a un veterinario en tu motocicleta",
      b: "Llamar a un veterinario porque no quieres mover al animal para evitar más lesiones",
      c: "Llevarlo a tu casa para curarlo",
      d: "Continuar tu camino, ya que estas cosas pasan",
    },
    pet: "cat",
  },
  {
    content:
      "Tienes un pez en casa con su pecera, un día van a una playa cercana y vez que tu pez tiene un comportamiento diferente cuando lo acercas al mar. Tu pez desea mucho nadar en el mar, en este contexto, liberarías a tu pez?",
    type: "normal",
    options: {
      a: "SI, ya que, el ruido que hacen las personas dentro de las casas afecta la salud de los peces",
      b: "No, el proximo año puedo volver y pensar en liberarlo",
      c: "Liberarlo a un acuario cercano para tener la posibilidad de visitarlo",
      d: "No, ya que, el pez se acostumbró a vivir en la pecera y no sobreviviría en el mar",
    },
    pet: "fish",
  },
  {
    content:
      "Un día vas por la calle y ves como un par de personas detienen un vehículo y dejan botado un gatito de 4 meses en la calle, ¿Qué harías en esta situación sabiendo que tus padres no quieren animales en casa?",
    type: "normal",
    options: {
      a: "Darle algo para comer y luego marcharme porque no puedo llevarlo a mi casa",
      b: "Llevarlo a mi casa a escondidas porque mis padres no quieren mascotas en casa",
      c: "Tratar de seguir  y conversar con las personas que dejaron abandonado al gatito",
      d: "Llamar a la policía para que se haga cargo del gatito",
    },
    pet: "cat",
  },
  {
    content:
      "Tienes un vecino que en el patio de su casa tiene un perro amarrado todo el día, tu vecino cree que es por protección pero el perro suele aullar porque no quiere estar amarrado. ¿Qué harías en esta situación?",
    type: "normal",
    options: {
      a: "Llamarías a una fundacion para que te ayude con el perro",
      b: "Tratarías de conversar con tu vecino acerca de tener al perro amarrado",
      c: "Denunciar a tu vecino por maltrato animal",
      d: "No hacer nada, ya que no es tu problema",
    },
    pet: "dog",
  },
  {
    content:
      "Estás navegando en Facebook y de pronto te aparece una publicidad en la que hacen mención a la venta (no regulada) de cachorros de raza a un determinado precio. ¿Qué harías al ver esto?",
    type: "normal",
    options: {
      a: "Denunciar la publicidad",
      b: "Contactarte con las personas y tratar de hacerles ver que la venta no regulada de animales está mal",
      c: "Usar tus redes sociales para hacer un llamado de atención a las autoridades pertinentes",
      d: "No hacer nada, ya que no es tu problema",
    },
    pet: "dog",
  },
  {
    content:
      "Un dia ordinario entras a internet y te encuentras con una pagina que hace mención al maltrato animal, con contenido relacionado a este, ¿Cuál sería tu primera acción?",
    type: "normal",
    options: {
      a: "Compartir y divulgar estos hechos en tus redes",
      b: "Denunciar la página publicamente",
      c: "Guardar toda la informacion posible relacionada a la pagina, para presentarla a las autoridades perinentes",
      d: "No hacer nada, ya que no es tu problema",
    },
    pet: "dog",
  },
  {
    content:
      "Conoces de un caso donde un hombre de muy mala reputación tiene un perro en pésimas condiciones, viendo esto ¿Qué haces?",
    type: "normal",
    options: {
      a: "Seguir caminando e ignorarlo",
      b: "Denunciarlo de manera anónima para evitar que ese hombre tenga represalias contigo",
      c: "Denunciarlo publicamente con datos y fotos de evidencia para que los procesos sean mas certeros",
      d: "No hacer nada, ya que no es tu problema",
    },
    pet: "dog",
  },
  {content: "/mas1.jpg",
    type: "especial",
    options: {},
    pet:{},
  },
  {content: "/mas3.jpg",
    type: "especial",
    options: {},
  },
  {content: "/menos1.jpg",
    type: "especial",
    options: {},
  },
  {content: "/menos3.jpg",
    type: "especial",
    options: {},
  },
  {content: "/pierde.jpg",
    type: "especial",
    options: {},
  },
  {content: "/reverse.jpg",
    type: "especial",
    options: {},
  },
  {content: "/mas1.jpg",
    type: "especial",
    options: {},
    pet:{},
  },
  {content: "/mas3.jpg",
    type: "especial",
    options: {},
  },
  {content: "/menos1.jpg",
    type: "especial",
    options: {},
  },
  {content: "/menos3.jpg",
    type: "especial",
    options: {},
  },
  {content: "/pierde.jpg",
    type: "especial",
    options: {},
  },
  {content: "/reverse.jpg",
    type: "especial",
    options: {},
  },
];
const knowledge = [
  {
    content:
      "¿Cuál de las siguientes características no es propia de una mantarraya?",
    type: "knowledge",
    options: {
      a: "Su cuerpo está compuesto totalmente por cartílago",
      b: "Contienen un aguijón en su cola que puede atravesar a un humano",
      c: "Se consideran animales solitarios",
      d: "Poseen el cerebro más grande de todos los peces",
    },
    pet: "stingray",
  },
  {
    content: "Los gatos no pueden percibir el siguiente sabor",
    type: "knowledge",
    options: {
      a: "Dulce",
      b: "Agrio",
      c: "Salado",
      d: "Todos los anteriores",
    },
    pet: "cat",
  },
  {
    content: "¿Cuántos años vive aproximadamente un conejo?",
    type: "knowledge",
    options: {
      a: "18-21 años",
      b: "12-18 años",
      c: "9-12 años",
      d: "6-9 años",
    },
    pet: "rabbit",
  },
  {
    content: "¿Cuán alto pueden saltar las ratas?",
    type: "knowledge",
    options: {
      a: "Hasta 30 centímetros",
      b: "Hasta 15 centímetros",
      c: "Hasta 22 centímetros",
      d: "No pueden saltar",
    },
    pet: "rabbit",
  },
  {
    content:
      "¿Cuál de las siguientes opciones acerca de los peces payasos es verdadera?",
    type: "knowledge",
    options: {
      a: "Existen alrededor de 20 especies conocidas de peces payasos",
      b: "Todos los de esta especie nacen siendo machos",
      c: "Son reconocidos por ser excelentes nadadores",
      d: "Todos los anteriores"
    },
    pet: "clownfish",
  },
  {
    content:
      "¿Cuál de los siguientes animales solo puede ver en blanco y negro?",
    type: "knowledge",
    options: {
      a: "Hurón",
      b: "Gato",
      c: "Perico",
      d: "Hamster",
    },
    pet: "all",
  },
  {
    content:
      "Los gatos ronronean a una frecuencia entre 25 y 150 hercios. Estudios han demostrado que las vibraciones a estas velocidades pueden...",
    type: "knowledge",
    options: {
      a: "Adormecer a los ratones",
      b: "Reparar la densidad ósea y reducir la inflamación",
      c: "Facilitar su digestión",
      d: "Todas las anteriores"
    },
    pet: "cat",
  },
  {
    content:
      "Las orejas ayudan al gato a oír direccionalmente, esto les permite...",
    type: "knowledge",
    options: {
      a: "Moverlas de manera independiente",
      b: "Escuchar mejor cuando hace frío",
      c: "Desorientar a sus depredadores",
      d: "Orientarse en el espacio"
    },
    pet: "cat",
  },
  {
    content: "¿Por qué sacan tanto la lengua los perros? ",
    type: "knowledge",
    options: {
      a: "Para mostrar su júbilo o carácter afable",
      b: "Es un gesto inconsciente como respirar",
      c: "Para regular su temperatura corporal",
      d: "Para enfriar su cuerpo",
    },
    pet: "dog",
  },
  {
    content: "Los hamsters pueden comer:",
    type: "knowledge",
    options: {
      a: "Fruta, son herbívoros",
      b: "Carne, son carnívoros",
      c: "De todo, son omnívoros",
      d: "Nada, no necesitan comer",
    },
    pet: "hamster",
  },
  {
    content:
      "De la raza o el tamaño no solo depende la edad de un perro, si no también uno de los sentidos más importantes para nuestros amigos los canes. En este sentido, ¿Sabes cuál es el perro con el mejor olfato de todos?",
    type: "knowledge",
    options: {
      a: "El perro de San Umberto, o bloodhound",
      b: "El basset hound",
      c: "El pastor belga malinois",
      d: "El perro de agua español",
    },
    pet: "dog",
  },
];

export { normal, knowledge };
