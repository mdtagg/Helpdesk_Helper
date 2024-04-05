
// const createHighPriorityEmoji = () => {
//   const newArray = new Array(6).fill(null).map((entry,idx) => {
//     console.log(idx)
//     entry = {
//       "type":"emoji",
//       "name": idx % 2 === 0 ? "red_circle" : "triumph"
//     }
//     return entry
//   })
//   return newArray
// }

// console.log(createHighPriorityEmoji())
const createPriority = (priority) => {
  let emoji,message

  if(priority === "high") {
    emoji = "red_circle",
    message = "   (Really stuck, need help asap)"
  }

  if(priority === "medium") {
    emoji = "large_yellow_circle",
    message = "   (Could use some help soon but not urgent)"
  }

  if(priority === "low") {
    emoji = "large_green_circle",
    message = "   (Insight or clarification wanted, everything working)"
  }

  return {
    "type":"rich_text",
    "elements":[
      {
        "type":"rich_text_section",
        "elements":[
          {
            "type":"text",
            "text":"Priority: ",
            "style":{
              "bold":true,
              "italic":true
            }
          },
          {
            "type":"emoji",
            "name":emoji
          },
          {
            "type":"text",
            "text":message
          }
          // ...createHighPriorityEmoji()
        ]
      }
    ]
  }
}

function createHeader(data) {

  return {
    "type":"header",
      "text":{
          "type":"plain_text",
          "text": data
        }
  }
}

const createDivider = () => {
  const divider = new Array(25).fill(null).map(entry => {
    entry = {
      "type":"text",
      "text":"=",
      "style":{"bold":true}
    }
    return entry
  })
  return {
    "type":"rich_text",
    "elements":[
      {
        "type":"rich_text_section",
        "elements":[
          ...divider
        ]
      }
    ]
  }
}

const createSubject = (data) => {
  return {
    "type": "rich_text",
    "elements": [
      {
        "type": "rich_text_list",
        "elements": [
          {
            "type": "rich_text_section",
            "elements": [
              {
                "type": "text",
                "text": data
              }
            ]
          },
        ],
        "style": "bullet",
        "indent": 0,
      }
    ]
  }
}

const createLink = (data) => {
  return {
      "type":"rich_text",
      "elements":[
        {
          "type":"rich_text_section",
          "elements":[
            {
              "type":"link",
              "url":data
            }
          ]
        }
      ]
  }
}

const createCodeBlock = (data) => {
  return {
    "type":"rich_text",
    "elements":[
      {
        "type":"rich_text_preformatted",
        "elements":[
          {
            "type":"text",
            "text":data,
            "style":{"code":true}
          }
        ]
      }
    ]
  }
}

const createProblemBlock = (prompt,input,type) => {

  let subjectType

  switch(type) {
    case 'subject':
      subjectType = createSubject(input);
      break;
    case 'link':
      subjectType = createLink(input);
      break;
    case 'code':
      subjectType = createCodeBlock(input);
      break;

    default:
      return null
  }

  return [
    createHeader(prompt),
    createDivider(),
    subjectType
  ]
}

const populateSlackMarkup = () => {

  return {createProblemBlock,createSubject,createPriority }
}

export default populateSlackMarkup