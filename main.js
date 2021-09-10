#! /usr/bin/env node

const { Input } = require('enquirer')
const { Select } = require('enquirer')
const explanation = `Description of this game.
After the countdown, a number will be displayed for one second.
When the display disappears, type in the number that was displayed.
This will be repeated five times.
Let's try for perfection!`
let count = 0

function main () {
  const prompt = new Select({
    message: explanation,
    choices: ['Start Game']
  })

  prompt.run()
    .then(function () { startGame() })
}

async function startGame () {
  for (let n = 0; n < 5; n++) {
    await countdown(3, n)
  }
  switch (count) {
    case 5:
      console.log('Perfect!! You are Rank A!')
      break
    case 4:
      console.log('Great! You are Rank B.')
      break
    case 3:
      console.log('Good. You are Rank C.')
      break
    case 2:
      console.log("You are Rank D. Let's play again!")
      break
    case 1:
      console.log("You are Rank E. Let's play again!")
      break
    case 0:
      console.log("You are Rank F. Let's play again!")
      break
  }
}

function countdown (seconds, n) {
  return new Promise(
    function (resolve) {
      const int = randRange(n).toString()
      for (let i = 3; i >= 0; i--) {
        setTimeout(function () {
          if (i > 0) console.log(i + '...')
          else resolve(packageOneQA(int))
        }, (seconds - i) * 1000)
      }
    })
}

function randRange (num) {
  const min = 10 ** (num + 3)
  const max = 10 ** (num + 4)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function packageOneQA (int) {
  return new Promise(
    function (resolve) {
      oneQA(resolve, int)
    }
  )
}

async function oneQA (resolve, int) {
  await displayQuestion(int)
  resolve((answer(int)))
}

function displayQuestion (int) {
  return new Promise(
    function (resolve) {
      process.stdout.write(int)
      setTimeout(function () { resolve(process.stdout.clearLine()) }, 1000)
    }
  )
}

function answer (int) {
  return new Promise(
    function (resolve) {
      const prompt = new Input({
        name: 'number',
        message: 'Please enter a number'
      })
      prompt.run()
        .then(console.log(''))
        .then(function (answer) { resolve(checkAnswer(int, answer.toString())) })
    }
  )
}

function checkAnswer (int, answer) {
  if (int === answer) {
    console.log('Correct!!')
    count++
  } else {
    console.log('Not Correct...')
  }
}

main()
