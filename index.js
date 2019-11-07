// Load up the discord.js library
const Discord = require("discord.js");

// This is your bot. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `bot.something`, or `bot.something`,
// this is what we're refering to. Your bot.
const bot = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token fff
// config.prefix contains the message prefix.

class Queue {
  constructor(nome, ident) {
    this.ident = ident;
    this.nome = nome;
  }
}

var deus_queue =[];


bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size}`); 
  // Example of changing the bot's playing game to something useful. `bot.user` is what the
  // docs refer to as the "botUser".
  bot.user.setActivity(`I am burre`);
});




bot.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  function printQueue(a){
    for(let i = 0; i < a.length; i++)
      message.channel.send(a[i].nome + " - " + a[i].ident + "\n");
  }

  // function divideByTeams(a){
  //   var teams=[];
  //   for(let i = 0; i< a.length; i++){
  //     message.channel.send("``` Team " + )
  //   }
  //   return teams
  // }
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
  }

  if(command === "queue") {
    let flag = 0;
    var lol = new Queue(message.member.user.tag,message.member.user.id);
    if(deus_queue.length<=0){
      deus_queue.push(lol);
      message.channel.send("``` user: " + message.member.user.tag + " added```");
      message.channel.send("``` " + deus_queue.length + " ```");
    }
    else{
      for(let i = 0; i<deus_queue.length;i++){
        if(deus_queue[i].ident === lol.ident){
          flag++;
        }
      }
      if(flag <= 0){
        deus_queue.push(lol);
        message.channel.send("``` user: " + message.member.user.tag + " added```");
        message.channel.send("``` " + deus_queue.length + " ```");
      }
      else{
        message.channel.send("``` ja tas na queue malandro ```");
      }
    }
  }
  
  if(command === "check"){
    var tudo = [];
    var team = [];
    for (let i = 0; i < deus_queue.length; i++) {
      tudo[Math.floor(i/5)]= "";
    }
    for (let i = 0; i < deus_queue.length; i++) {
      tudo[Math.floor(i/5)] = tudo[Math.floor(i/5)] + "\n" + deus_queue[i].nome; 
    
    }
    for(let i = 0; i < tudo.length;i++){
      team[i] = i;
      message.channel.send("``` Team: " + team[i] + "\n\t" + tudo[i]+ "```");
    }
  }

  if(command === "print"){
    printQueue(deus_queue);
  }

  if(command === "leave"){
    let counter = 0;
    var lol = new Queue(message.member.user.tag,message.member.user.id);
    if(deus_queue.length <= 0){
      message.channel.send("Na tas na queue");
    }
    else{
      for(let i = 0; i<deus_queue.length; i++){
        if(lol.ident === deus_queue[i].ident){
          counter++;
          deus_queue.splice(i);
          message.channel.send("``` " + lol.nome + " removido```");
        }
      }
      if(counter < 1){
        message.channel.send("Na tas na queue");
      }
    }
  }
});

bot.login(config.token);