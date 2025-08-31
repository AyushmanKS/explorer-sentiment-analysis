import background1 from "../assets/images/background1.jpeg";
import background2 from "../assets/images/background1.jpeg";
import background3 from "../assets/images/background1.jpeg";
import background4 from "../assets/images/background1.jpeg";
import background5 from "../assets/images/background1.jpeg";
import background6 from "../assets/images/background1.jpeg";
import background7 from "../assets/images/background1.jpeg";

import happyRobot from "../assets/images/happy_explorer.png";
import sadRobot from "../assets/images/sad_explorer.png";
import neutralRobot from "../assets/images/thinking_explorer.png";
import introRobot from "../assets/images/intro_explorer.png";
import nameRobot from "../assets/images/intro_explorer.png";
import thinkingRobot from "../assets/images/thinking_explorer.png";

import mapImage from "../assets/images/map.png";
import treasureChest from "../assets/images/treasure.png";
import treasureChestOpen from "../assets/images/treasure_open.png";

export const robotImages = {
  happy: happyRobot,
  sad: sadRobot,
  neutral: neutralRobot,
  intro: introRobot,
  name: nameRobot,
  thinking: thinkingRobot,
};

export const levelBackgrounds = [
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  background7,
  background1,
];

export const introduction = [
  {
    type: "intro",
    robot: "intro",
    text: "Hi! I'm Maya, and I'm looking for the legendary Sunstone of Joy!",
  },
  {
    type: "intro",
    robot: "thinking",
    text: "The legend says it's hidden in the Whispering Caves, which change their paths based on feelings. To get through, we need to follow the happy clues and avoid the sad ones.",
    image: mapImage,
  },
  {
    type: "intro",
    robot: "happy",
    text: "It's an adventure of emotions! Will you help me read the clues and find the Sunstone?",
  },
];

export const story = [
  {
    level: 1,
    title: "The Village of Whispers",
    steps: [
      {
        type: "intro",
        robot: "intro",
        text: "Level 1: We're at the entrance to the caves. The villagers here have lots of advice. We need to find the hopeful clues that point to the right entrance!",
      },
      {
        type: "quiz",
        robot: "thinking",
        question:
          "1/5: Which villager sounds the most hopeful about the caves?",
        options: [
          "An old legend says the caves are there.",
          "What an amazing adventure awaits inside!",
          "My grandfather's name was Leo.",
        ],
        answer: "What an amazing adventure awaits inside!",
      },
      {
        type: "quiz",
        robot: "thinking",
        question: "2/5: Which villager sounds scared and is giving bad advice?",
        options: [
          "That path leads to a terrible, dark pit.",
          "The caves are made of rock.",
          "Some people bring lanterns inside.",
        ],
        answer: "That path leads to a terrible, dark pit.",
      },
      {
        type: "quiz",
        robot: "thinking",
        question:
          "3/5: Which piece of advice is a positive statement, not a question?",
        options: [
          "Did you bring enough rope?",
          "The journey will be the best you've ever had!",
          "Is that the entrance over there?",
        ],
        answer: "The journey will be the best you've ever had!",
      },
      {
        type: "quiz",
        robot: "thinking",
        question:
          "4/5: Which villager is excited, without using the word 'excited'?",
        options: [
          "I can't wait to hear about your discoveries!",
          "The cave entrance is on the north side.",
          "You should probably be careful.",
        ],
        answer: "I can't wait to hear about your discoveries!",
      },
      {
        type: "quiz",
        robot: "thinking",
        question: "5/5: Which clue has the STRONGEST positive feeling?",
        options: [
          "The stream inside is nice.",
          "I absolutely love the beautiful crystals in that cave!",
          "The entrance was okay.",
        ],
        answer: "I absolutely love the beautiful crystals in that cave!",
      },
      {
        type: "intro",
        robot: "happy",
        text: "Amazing! You helped me listen to the right villagers. We found the entrance!",
      },
    ],
  },
  {
    level: 2,
    title: "The Crumbling Map",
    steps: [
      {
        type: "intro",
        robot: "intro",
        text: "Level 2: Just inside, we found an old map! But it's covered in dirt and extra symbols. Let's clean it up so we can read it.",
      },
      {
        type: "cleanup",
        robot: "thinking",
        question:
          "1/5: The mapmaker added extra exclamation marks. Click them to remove them.",
        sentence: "The path is clear ! ! !",
        wordsToRemove: ["!", "!", "!"],
      },
      {
        type: "quiz",
        robot: "thinking",
        question:
          "2/5: The writing is messy with capital letters. Which version is easiest to read?",
        options: [
          "FOLLOW THE GLOWING MOSS",
          "Follow The Glowing Moss",
          "follow the glowing moss",
        ],
        answer: "follow the glowing moss",
      },
      {
        type: "cleanup",
        robot: "thinking",
        question:
          "3/5: Let's ignore the simple words like 'the' and 'a' to find the real meaning.",
        sentence: "Cross the bridge over a wide river",
        wordsToRemove: ["the", "a"],
      },
      {
        type: "quiz",
        robot: "thinking",
        question:
          "4/5: Another explorer left a modern note. Which one means something is 'great'?",
        options: [
          "That dead end was cringe.",
          "This waterfall slaps 🔥",
          "I'm so salty about this trap 🧂",
        ],
        answer: "This waterfall slaps 🔥",
      },
      {
        type: "cleanup",
        robot: "thinking",
        question:
          "5/5: Let's clean up this whole clue! Remove the extra symbols and simple 'stop words'.",
        sentence: "Wow , this was a truly , truly amazing discovery !!",
        wordsToRemove: [
          "Wow",
          ",",
          "this",
          "was",
          "a",
          "truly",
          ",",
          "truly",
          "!!",
        ],
      },
      {
        type: "intro",
        robot: "happy",
        text: "Incredible! The map is so much clearer now. On to the next challenge!",
      },
    ],
  },
  {
    level: 3,
    title: "The Echoing Falls",
    steps: [
      {
        type: "intro",
        robot: "intro",
        text: "Level 3: We're at a waterfall that echoes whispers through the cave. We need to listen for the key 'feeling' words to know which tunnel to take.",
      },
      {
        type: "sentiment-sleuth",
        robot: "thinking",
        question:
          "1/5: The echo says, 'That tunnel is dangerous and dark.' Click the word that gives it a NEGATIVE feeling.",
        sentence: "That tunnel is dangerous and dark.",
        answer: "dangerous",
      },
      {
        type: "sentiment-sleuth",
        robot: "thinking",
        question:
          "2/5: A whisper says, 'This way leads to a lovely grotto.' Click the POSITIVE word.",
        sentence: "This way leads to a lovely grotto.",
        answer: "lovely",
      },
      {
        type: "sentiment-sleuth",
        robot: "thinking",
        question:
          "3/5: Another echo warns, 'The air in there is awful.' Click the NEGATIVE word.",
        sentence: "The air in there is awful.",
        answer: "awful.",
      },
      {
        type: "sentiment-sleuth",
        robot: "thinking",
        question:
          "4/5: A happy sound says, 'What a brilliant path to follow!' Click the POSITIVE word.",
        sentence: "What a brilliant path to follow!",
        answer: "brilliant",
      },
      {
        type: "sentiment-sleuth",
        robot: "thinking",
        question:
          "5/5: A sad echo says, 'The last explorer felt hopeless here.' Click the word that shows a NEGATIVE feeling.",
        sentence: "The last explorer felt hopeless here.",
        answer: "hopeless",
      },
      {
        type: "intro",
        robot: "happy",
        text: "You have a great ear for feelings! We know which tunnel is the safe one. Let's go!",
      },
    ],
  },
  {
    level: 4,
    title: "The Gemstone River",
    steps: [
      {
        type: "intro",
        robot: "intro",
        text: "Level 4: A river flows through this chamber, filled with glowing gems. Each gem has a message. We need to sort them into 'Hopeful' and 'Doubtful' piles to see the path.",
      },
      {
        type: "sort",
        robot: "thinking",
        question: "Sort these gem messages into the correct piles!",
        items: [
          { id: "item-1", text: "Wonderful", category: "Hopeful Gems" },
          { id: "item-2", text: "Terrible", category: "Doubtful Gems" },
          { id: "item-3", text: "Joyful", category: "Hopeful Gems" },
          { id: "item-4", text: "Dreadful", category: "Doubtful Gems" },
        ],
        bins: ["Hopeful Gems", "Doubtful Gems"],
      },
      {
        type: "quiz",
        robot: "thinking",
        question: "A gem with a very positive message should go in which pile?",
        options: ["Hopeful Gems", "Doubtful Gems", "Neither"],
        answer: "Hopeful Gems",
      },
      {
        type: "quiz",
        robot: "thinking",
        question: "A gem that says 'Boring' belongs in which pile?",
        options: ["Hopeful Gems", "Doubtful Gems", "Neither"],
        answer: "Doubtful Gems",
      },
      {
        type: "intro",
        robot: "happy",
        text: "Perfect! By sorting the gems, you've made a path of hopeful stones for us to cross the river!",
      },
    ],
  },
  {
    level: 5,
    title: "The Guardian's Riddle",
    steps: [
      {
        type: "intro",
        robot: "intro",
        text: "Level 5: A giant Stone Guardian blocks our path! It will only let us pass if we can understand the feeling of its riddles.",
      },
      {
        type: "story-vibe",
        robot: "thinking",
        question: "What is the overall feeling of the Guardian's first riddle?",
        storyText:
          "An explorer came seeking gold. The journey was long, the food was cold, and his spirit felt tired and old. He found nothing but rocks and mold.",
        options: ["Positive", "Negative", "Neutral"],
        answer: "Negative",
      },
      {
        type: "story-vibe",
        robot: "thinking",
        question: "What is the vibe of this second story?",
        storyText:
          "A girl followed the sound of a song. The path was bright, nothing went wrong. She found a cave filled with light, and knew she was where she belonged.",
        options: ["Positive", "Negative", "Neutral"],
        answer: "Positive",
      },
      {
        type: "story-vibe",
        robot: "thinking",
        question: "How does this final riddle feel?",
        storyText:
          "A map showed a river and a tree. The explorer walked from point A to B. The journey took from one to three. This is a statement of fact, you see.",
        options: ["Positive", "Negative", "Neutral"],
        answer: "Neutral",
      },
      {
        type: "intro",
        robot: "happy",
        text: "You understood the Guardian's riddles perfectly! It has moved aside and let us pass.",
      },
    ],
  },
  {
    level: 6,
    title: "The Crystal Bridge",
    steps: [
      {
        type: "intro",
        robot: "intro",
        text: "Level 6: We've reached a deep chasm. The only way across is a bridge made of crystals that respond to emotion. We need to say the most positive things to make it strong!",
      },
      {
        type: "sentiment-strength",
        robot: "thinking",
        question:
          "1/3: To build the first step, which phrase has the STRONGEST positive feeling?",
        options: [
          "This is a good bridge.",
          "This is an amazing and wonderful bridge!",
          "This bridge is fine.",
        ],
        answer: "This is an amazing and wonderful bridge!",
      },
      {
        type: "sentiment-strength",
        robot: "thinking",
        question:
          "2/3: The bridge is flickering. Which phrase will make it the brightest?",
        options: [
          "I like crystals.",
          "I love these brilliant, glowing gems!",
          "The crystals are okay.",
        ],
        answer: "I love these brilliant, glowing gems!",
      },
      {
        type: "sentiment-strength",
        robot: "thinking",
        question:
          "3/3: One final step! Which is the most joyful and exciting thought?",
        options: [
          "The other side is neat.",
          "We're almost there, this is fun.",
          "This is the best and most excellent adventure ever!",
        ],
        answer: "This is the best and most excellent adventure ever!",
      },
      {
        type: "intro",
        robot: "happy",
        text: "It worked! Your powerful, positive thoughts made the bridge solid. We're across!",
      },
    ],
  },
  {
    level: 7,
    title: "The Sunstone Chamber",
    steps: [
      {
        type: "intro",
        robot: "intro",
        text: "Level 7: We're here! The final chamber. To reveal the Sunstone, we must place these ancient tiles in the right order, telling the story of our journey.",
      },
      {
        type: "order",
        robot: "thinking",
        question:
          "Place the steps of our adventure in the correct order from start to finish.",
        items: [
          "Cleaning the Map",
          "Sorting the Gems",
          "Hearing the Echoes",
          "Following Villager Clues",
        ],
        correctOrder: [
          "Following Villager Clues",
          "Cleaning the Map",
          "Hearing the Echoes",
          "Sorting the Gems",
        ],
      },
      {
        type: "intro",
        robot: "happy",
        text: "That's it! You put the story in the right order. The final door is opening!",
      },
    ],
  },
  {
    level: 8,
    title: "The Sunstone of Joy",
    steps: [
      {
        type: "treasure-reveal",
        robot: "happy",
        initialText:
          "We did it! We followed the feelings, solved the riddles, and found the Sunstone of Joy!",
        treasureImage: treasureChest,
        treasureOpenImage: treasureChestOpen,
        summaryTitle: "The Treasure of Knowledge!",
        summaryPoints: [
          "💎 We gathered hopeful clues from the villagers.",
          "📜 We cleaned up a crumbling, ancient map.",
          "✨ We decoded the feelings in echoing whispers.",
          "👑 We sorted gems by their positive or negative vibes.",
          "🗺️ We understood the stories of a Stone Guardian.",
          "📈 We used the strongest feelings to build a bridge.",
          "🧭 We put the steps of our adventure in order!",
        ],
      },
    ],
  },
];
