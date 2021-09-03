
const { Input } = require('enquirer');

function randRange(num) {
  const min = 10**(num+3)
  const max = 10**(num+4)
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function displayQ(int){
  return new Promise(
    function(onFulfilled) {
      process.stdout.write(int)
      setTimeout(function(){onFulfilled(process.stdout.clearLine())}, 1000)
    }
  )
}

function checkAnswer(int, answer) {
  (int === answer) ? console.log('Good!') : console.log('No good')
}

function Answer(int){
  return new Promise(
    function(onFulfilled){
    const prompt = new Input({
      name: 'number',
      message: 'Please enter a number'
    });
    prompt.run()
      .then(answer => {onFulfilled(checkAnswer(int, answer.toString()))})
      .catch(console.error);
    }
  )
}

function oneQuestion(int){
  return new Promise(
    function(onFulfilled){
      displayQ(int)
        .then(
          function(){
            onFulfilled((Answer(int)))
          }
        )
    }
  )
}

function displayQ(int){
  return new Promise(
    function(onFulfilled) {
      process.stdout.write(int)
      setTimeout(function(){onFulfilled(process.stdout.clearLine())}, 1000)
    }
  )
}

function countdown(seconds){

  return new Promise(
    function(onFulfilled){
      let int = randRange(i).toString()
      for(let i=3; i>=0; i--){
        setTimeout(function(){
          if(i>0) console.log(i + '...')
          else onFulfilled(oneQuestion(int))
        },(seconds-i)*1000)
      }
  })
}

async function threeQ(){
  for(i=0; i<5; i++){
    await countdown(3)
  }
  console.log('お疲れ様でした。')
}

threeQ()

