
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

  return {createProblemBlock,createSubject }
}

export default populateSlackMarkup