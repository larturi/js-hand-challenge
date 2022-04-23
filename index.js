const MIN_CELL = 0
const MAX_CELL = 255

const clamp = (value) => value > MAX_CELL ? MIN_CELL : value < MIN_CELL ? MAX_CELL : value

const getNextFistIndex = (index, instructions) => {
  let fists = 1
  for (let i = index + 1; i < instructions.length; i++) {
    if (instructions[i] === '🤜') fists++
    if (instructions[i] === '🤛') fists--
    if (fists === 0) return i
  }
}

const getPrevFistIndex = (index, instructions) => {
  let fists = 1
  for (let i = index - 1; i >= 0; i--) {
    if (instructions[i] === '🤛') fists++
    if (instructions[i] === '🤜') fists--
    if (fists === 0) return i
  }
}

function translate (string) {
  const memory = [0]

  let pointer = 0
  let index = 0
  let output = ''

  const arrayOfInstructions = Array.from(string)

  const actions = {
    '👉': () => {
      pointer++
      memory[pointer] = memory[pointer] || 0
    },
    '👈': () => {
      pointer--
      memory[pointer] = memory[pointer] || 0
    },
    '👆': () => {
      memory[pointer] = clamp(memory[pointer] + 1)
    },
    '👇': () => {
      memory[pointer] = clamp(memory[pointer] - 1)
    },
    '🤜': () => {
      if (memory[pointer] === 0) {
        index = getNextFistIndex(index, arrayOfInstructions)
      }
    },
    '🤛': () => {
      if (memory[pointer] !== 0) {
        index = getPrevFistIndex(index, arrayOfInstructions)
      }
    },
    '👊': () => {
      output += String.fromCharCode(memory[pointer])
    }

  }

  while (index < arrayOfInstructions.length) {
    const action = arrayOfInstructions[index]
    actions[action]()
    // console.log({ action, index, output, pointer })
    index++
  }

  return output
}

// console.log(translate('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊'))
// console.log(translate('👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊'))

module.exports = translate
