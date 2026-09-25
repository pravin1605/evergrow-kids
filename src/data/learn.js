const learningCategories = [
  {
    id: "alphabet",
    title: "Alphabet",
    icon: "🔤",
    description: "Learn letters from A to Z",
    color: "#f1f7ff",

    lessons: [
      { id: "letter-a", title: "A is for Apple", symbol: "A", image: "🍎", explanation: "A is the first letter of the alphabet.", example: "A for Apple" },
      { id: "letter-b", title: "B is for Ball", symbol: "B", image: "⚽", explanation: "B is for Ball.", example: "B for Ball" },
      { id: "letter-c", title: "C is for Cat", symbol: "C", image: "🐱", explanation: "C is for Cat.", example: "C for Cat" },
      { id: "letter-d", title: "D is for Dog", symbol: "D", image: "🐶", explanation: "D is for Dog.", example: "D for Dog" },
      { id: "letter-e", title: "E is for Elephant", symbol: "E", image: "🐘", explanation: "E is for Elephant.", example: "E for Elephant" },
      { id: "letter-f", title: "F is for Fish", symbol: "F", image: "🐟", explanation: "F is for Fish.", example: "F for Fish" },
      { id: "letter-g", title: "G is for Grapes", symbol: "G", image: "🍇", explanation: "G is for Grapes.", example: "G for Grapes" },
      { id: "letter-h", title: "H is for Hat", symbol: "H", image: "🎩", explanation: "H is for Hat.", example: "H for Hat" },
      { id: "letter-i", title: "I is for Ice Cream", symbol: "I", image: "🍦", explanation: "I is for Ice Cream.", example: "I for Ice Cream" },
      { id: "letter-j", title: "J is for Juice", symbol: "J", image: "🧃", explanation: "J is for Juice.", example: "J for Juice" },
      { id: "letter-k", title: "K is for Kite", symbol: "K", image: "🪁", explanation: "K is for Kite.", example: "K for Kite" },
      { id: "letter-l", title: "L is for Lion", symbol: "L", image: "🦁", explanation: "L is for Lion.", example: "L for Lion" },
      { id: "letter-m", title: "M is for Monkey", symbol: "M", image: "🐵", explanation: "M is for Monkey.", example: "M for Monkey" },
      { id: "letter-n", title: "N is for Nest", symbol: "N", image: "🪺", explanation: "N is for Nest.", example: "N for Nest" },
      { id: "letter-o", title: "O is for Orange", symbol: "O", image: "🍊", explanation: "O is for Orange.", example: "O for Orange" },
      { id: "letter-p", title: "P is for Panda", symbol: "P", image: "🐼", explanation: "P is for Panda.", example: "P for Panda" },
      { id: "letter-q", title: "Q is for Queen", symbol: "Q", image: "👑", explanation: "Q is for Queen.", example: "Q for Queen" },
      { id: "letter-r", title: "R is for Rabbit", symbol: "R", image: "🐰", explanation: "R is for Rabbit.", example: "R for Rabbit" },
      { id: "letter-s", title: "S is for Sun", symbol: "S", image: "☀️", explanation: "S is for Sun.", example: "S for Sun" },
      { id: "letter-t", title: "T is for Tiger", symbol: "T", image: "🐯", explanation: "T is for Tiger.", example: "T for Tiger" },
      { id: "letter-u", title: "U is for Umbrella", symbol: "U", image: "☂️", explanation: "U is for Umbrella.", example: "U for Umbrella" },
      { id: "letter-v", title: "V is for Van", symbol: "V", image: "🚐", explanation: "V is for Van.", example: "V for Van" },
      { id: "letter-w", title: "W is for Watermelon", symbol: "W", image: "🍉", explanation: "W is for Watermelon.", example: "W for Watermelon" },
      { id: "letter-x", title: "X is for Xylophone", symbol: "X", image: "🎼", explanation: "X is for Xylophone.", example: "X for Xylophone" },
      { id: "letter-y", title: "Y is for Yo-yo", symbol: "Y", image: "🪀", explanation: "Y is for Yo-yo.", example: "Y for Yo-yo" },
      { id: "letter-z", title: "Z is for Zebra", symbol: "Z", image: "🦓", explanation: "Z is for Zebra.", example: "Z for Zebra" },
    ],
  },

  {
    id: "numbers",
    title: "Numbers",
    icon: "🔢",
    description: "Learn numbers and counting",
    color: "#fff8e7",

    lessons: [
      { id: "number-one", title: "Number 1", symbol: "1", image: "🍎", explanation: "One means a single object.", example: "1 apple" },
      { id: "number-two", title: "Number 2", symbol: "2", image: "🍎🍎", explanation: "Two means two objects.", example: "2 apples" },
      { id: "number-three", title: "Number 3", symbol: "3", image: "🍎🍎🍎", explanation: "Three means three objects.", example: "3 apples" },
      { id: "number-four", title: "Number 4", symbol: "4", image: "🍎🍎🍎🍎", explanation: "Four means four objects.", example: "4 apples" },
      { id: "number-five", title: "Number 5", symbol: "5", image: "🖐️", explanation: "Five is the number of fingers on one hand.", example: "5 fingers" },
      { id: "number-six", title: "Number 6", symbol: "6", image: "⭐⭐⭐⭐⭐⭐", explanation: "Six means six objects.", example: "6 stars" },
      { id: "number-seven", title: "Number 7", symbol: "7", image: "🌈", explanation: "A rainbow has seven colors.", example: "7 colors" },
      { id: "number-eight", title: "Number 8", symbol: "8", image: "🐙", explanation: "An octopus has eight legs.", example: "8 legs" },
      { id: "number-nine", title: "Number 9", symbol: "9", image: "🪐", explanation: "Nine comes after eight.", example: "9 planets" },
      { id: "number-ten", title: "Number 10", symbol: "10", image: "🙌", explanation: "Ten is the number of fingers on both hands.", example: "10 fingers" },
    ],
  },

  {
    id: "colors",
    title: "Colors",
    icon: "🎨",
    description: "Discover beautiful colors",
    color: "#fff0f5",

    lessons: [
      { id: "color-red", title: "Red", symbol: "●", image: "🍎", explanation: "An apple can be red.", example: "Red Apple" },
      { id: "color-blue", title: "Blue", symbol: "●", image: "💧", explanation: "The sky and water can be blue.", example: "Blue Sky" },
      { id: "color-green", title: "Green", symbol: "●", image: "🌳", explanation: "Leaves and trees can be green.", example: "Green Tree" },
      { id: "color-yellow", title: "Yellow", symbol: "●", image: "🌞", explanation: "The sun can be yellow.", example: "Yellow Sun" },
      { id: "color-orange", title: "Orange", symbol: "●", image: "🍊", explanation: "An orange fruit is orange colored.", example: "Orange Fruit" },
      { id: "color-purple", title: "Purple", symbol: "●", image: "🍇", explanation: "Grapes can be purple.", example: "Purple Grapes" },
      { id: "color-pink", title: "Pink", symbol: "●", image: "🌸", explanation: "Some flowers are pink.", example: "Pink Flower" },
      { id: "color-brown", title: "Brown", symbol: "●", image: "🐻", explanation: "A bear can be brown.", example: "Brown Bear" },
    ],
  },

  {
    id: "shapes",
    title: "Shapes",
    icon: "🔺",
    description: "Learn simple shapes",
    color: "#f2f0ff",

    lessons: [
      { id: "shape-circle", title: "Circle", symbol: "●", image: "⚽", explanation: "A circle is round.", example: "A ball is round." },
      { id: "shape-square", title: "Square", symbol: "■", image: "🪟", explanation: "A square has four equal sides.", example: "A window can be square." },
      { id: "shape-triangle", title: "Triangle", symbol: "▲", image: "🔺", explanation: "A triangle has three sides.", example: "A triangle has 3 corners." },
      { id: "shape-rectangle", title: "Rectangle", symbol: "▭", image: "📱", explanation: "A rectangle has four sides, two long and two short.", example: "A phone is a rectangle." },
      { id: "shape-star", title: "Star", symbol: "★", image: "⭐", explanation: "A star has five points.", example: "Stars shine at night." },
      { id: "shape-heart", title: "Heart", symbol: "♥", image: "❤️", explanation: "A heart shape shows love.", example: "A heart means love." },
    ],
  },

  {
    id: "animals",
    title: "Animals",
    icon: "🐾",
    description: "Meet fun animals",
    color: "#effff1",

    lessons: [
      { id: "animal-dog", title: "Dog", symbol: "🐶", image: "🐶", explanation: "A dog is a friendly animal.", example: "Dogs can bark." },
      { id: "animal-cat", title: "Cat", symbol: "🐱", image: "🐱", explanation: "A cat is a small pet animal.", example: "Cats can meow." },
      { id: "animal-cow", title: "Cow", symbol: "🐮", image: "🐮", explanation: "A cow is a farm animal.", example: "A cow says moo." },
      { id: "animal-lion", title: "Lion", symbol: "🦁", image: "🦁", explanation: "A lion is called the king of the jungle.", example: "A lion can roar." },
      { id: "animal-elephant", title: "Elephant", symbol: "🐘", image: "🐘", explanation: "An elephant is the largest land animal.", example: "Elephants have big ears." },
      { id: "animal-monkey", title: "Monkey", symbol: "🐵", image: "🐵", explanation: "A monkey loves to climb trees.", example: "Monkeys eat bananas." },
      { id: "animal-rabbit", title: "Rabbit", symbol: "🐰", image: "🐰", explanation: "A rabbit has long ears and hops.", example: "Rabbits love carrots." },
      { id: "animal-duck", title: "Duck", symbol: "🦆", image: "🦆", explanation: "A duck loves to swim in water.", example: "Ducks say quack." },
    ],
  },

  {
    id: "fruits",
    title: "Fruits",
    icon: "🍎",
    description: "Learn tasty fruits",
    color: "#fff3ed",

    lessons: [
      { id: "fruit-apple", title: "Apple", symbol: "🍎", image: "🍎", explanation: "An apple is a fruit.", example: "Red Apple" },
      { id: "fruit-banana", title: "Banana", symbol: "🍌", image: "🍌", explanation: "A banana is a yellow fruit.", example: "Yellow Banana" },
      { id: "fruit-orange", title: "Orange", symbol: "🍊", image: "🍊", explanation: "An orange is a round fruit.", example: "Orange Fruit" },
      { id: "fruit-grapes", title: "Grapes", symbol: "🍇", image: "🍇", explanation: "Grapes grow in small bunches.", example: "Purple Grapes" },
      { id: "fruit-mango", title: "Mango", symbol: "🥭", image: "🥭", explanation: "A mango is a sweet, juicy fruit.", example: "Sweet Mango" },
      { id: "fruit-strawberry", title: "Strawberry", symbol: "🍓", image: "🍓", explanation: "A strawberry is small and red with seeds outside.", example: "Red Strawberry" },
      { id: "fruit-pineapple", title: "Pineapple", symbol: "🍍", image: "🍍", explanation: "A pineapple has a spiky skin.", example: "Spiky Pineapple" },
      { id: "fruit-watermelon", title: "Watermelon", symbol: "🍉", image: "🍉", explanation: "A watermelon is big, green outside and red inside.", example: "Juicy Watermelon" },
    ],
  },

  {
    id: "vegetables",
    title: "Vegetables",
    icon: "🥕",
    description: "Discover healthy vegetables",
    color: "#f2fff0",

    lessons: [
      { id: "vegetable-carrot", title: "Carrot", symbol: "🥕", image: "🥕", explanation: "A carrot is a healthy vegetable.", example: "Orange Carrot" },
      { id: "vegetable-tomato", title: "Tomato", symbol: "🍅", image: "🍅", explanation: "A tomato is often red.", example: "Red Tomato" },
      { id: "vegetable-broccoli", title: "Broccoli", symbol: "🥦", image: "🥦", explanation: "Broccoli is a green vegetable.", example: "Green Broccoli" },
      { id: "vegetable-potato", title: "Potato", symbol: "🥔", image: "🥔", explanation: "A potato grows under the ground.", example: "Brown Potato" },
      { id: "vegetable-corn", title: "Corn", symbol: "🌽", image: "🌽", explanation: "Corn has many small yellow kernels.", example: "Yellow Corn" },
      { id: "vegetable-onion", title: "Onion", symbol: "🧅", image: "🧅", explanation: "An onion has many layers.", example: "Round Onion" },
    ],
  },

  {
    id: "body-parts",
    title: "Body Parts",
    icon: "🧒",
    description: "Learn about your body",
    color: "#fff4f7",

    lessons: [
      { id: "body-eyes", title: "Eyes", symbol: "👀", image: "👀", explanation: "We use our eyes to see.", example: "I see with my eyes." },
      { id: "body-ears", title: "Ears", symbol: "👂", image: "👂", explanation: "We use our ears to hear.", example: "I hear with my ears." },
      { id: "body-hands", title: "Hands", symbol: "🖐️", image: "🖐️", explanation: "We use our hands to hold things.", example: "I use my hands to play." },
      { id: "body-nose", title: "Nose", symbol: "👃", image: "👃", explanation: "We use our nose to smell.", example: "I smell with my nose." },
      { id: "body-mouth", title: "Mouth", symbol: "👄", image: "👄", explanation: "We use our mouth to eat and talk.", example: "I eat with my mouth." },
      { id: "body-feet", title: "Feet", symbol: "🦶", image: "🦶", explanation: "We use our feet to walk and run.", example: "I run with my feet." },
    ],
  },

  {
    id: "weather",
    title: "Weather",
    icon: "🌤️",
    description: "Learn about the weather",
    color: "#eaf7ff",

    lessons: [
      { id: "weather-sunny", title: "Sunny", symbol: "☀️", image: "☀️", explanation: "A sunny day is bright and warm.", example: "It is sunny today." },
      { id: "weather-rainy", title: "Rainy", symbol: "🌧️", image: "🌧️", explanation: "On a rainy day, water falls from the clouds.", example: "It is raining outside." },
      { id: "weather-cloudy", title: "Cloudy", symbol: "☁️", image: "☁️", explanation: "A cloudy sky is covered with clouds.", example: "The sky is cloudy." },
      { id: "weather-windy", title: "Windy", symbol: "🌬️", image: "🌬️", explanation: "On a windy day, the air moves fast.", example: "It is windy today." },
      { id: "weather-snowy", title: "Snowy", symbol: "❄️", image: "❄️", explanation: "On a snowy day, soft white flakes fall.", example: "It is snowing outside." },
    ],
  },

  {
    id: "family",
    title: "Family",
    icon: "👨‍👩‍👧‍👦",
    description: "Learn about family members",
    color: "#fef6e4",

    lessons: [
      { id: "family-mother", title: "Mother", symbol: "👩", image: "👩", explanation: "Mother takes loving care of us.", example: "I love my mother." },
      { id: "family-father", title: "Father", symbol: "👨", image: "👨", explanation: "Father looks after the family.", example: "I love my father." },
      { id: "family-sister", title: "Sister", symbol: "👧", image: "👧", explanation: "A sister is a girl in the family.", example: "I play with my sister." },
      { id: "family-brother", title: "Brother", symbol: "👦", image: "👦", explanation: "A brother is a boy in the family.", example: "I play with my brother." },
      { id: "family-grandparents", title: "Grandparents", symbol: "👴👵", image: "👴👵", explanation: "Grandparents are our parents' parents.", example: "I visit my grandparents." },
    ],
  },
];

export default learningCategories;