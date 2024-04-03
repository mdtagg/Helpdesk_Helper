import { useEffect,useState } from 'react'

function App() {

  const [formData,setFormData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      problem:e.target[0].value,
      expected:e.target[1].value,
      tried:e.target[2].value,
      suspect:e.target[3].value,
      zoomLink:e.target[4].value,
      codeBlock:e.target[5].value
    }
    setFormData(data)
  }

useEffect(() => {
  if(!formData) return;
  const divider = new Array(25).fill(null).map(entry => {
    entry = {
      "type":"text",
      "text":"=",
      "style":{"bold":true}
    }
    return entry
  })

  const body = {
    "blocks":[
      {
        "type":"header",
           "text":{
              "type":"plain_text",
              "text": "What is the problem?"
            }
      },
      {
        "type":"rich_text",
        "elements":[
          {
            "type":"rich_text_section",
            "elements":[
              ...divider
            ]
          }
        ]
      },
      {
        "type":"section",
        "fields":[
          {
            "type":"mrkdwn",
            "text":formData.problem
          }
        ]
      },
      {
        "type":"header",
           "text":{
              "type":"plain_text",
              "text": "What did I expect to happen?"
            }
      },
      {
        "type":"rich_text",
        "elements":[
          {
            "type":"rich_text_section",
            "elements":[
              ...divider
            ]
          }
        ]
      },
      {
        "type":"section",
        "fields":[
          {
            "type":"mrkdwn",
            "text":formData.expected
          }
        ]
      },
      {
        "type":"header",
           "text":{
              "type":"plain_text",
              "text": "What have I already tried?"
            }
      },
      {
        "type":"rich_text",
        "elements":[
          {
            "type":"rich_text_section",
            "elements":[
              ...divider
            ]
          }
        ]
      },
      {
        "type":"section",
        "fields":[
          {
            "type":"mrkdwn",
            "text":formData.tried
          }
        ]
      },
      {
        "type":"header",
           "text":{
              "type":"plain_text",
              "text": "Why I suspect its not working"
            }
      },
      {
        "type":"section",
        "fields":[
          {
            "type":"mrkdwn",
            "text":formData.suspect
          }
        ]
      },
      {
        "type":"rich_text",
        "elements":[
          {
            "type":"rich_text_section",
            "elements":[
              ...divider
            ]
          }
        ]
      },
      {
        "type":"header",
           "text":{
              "type":"plain_text",
              "text": "Zoom Link"
            }
      },
      {
        "type":"rich_text",
        "elements":[
          {
            "type":"rich_text_section",
            "elements":[
              {
                "type":"link",
                "url":formData.zoomLink
              }
            ]
          }
        ]
      },
      {
        "type":"rich_text",
        "elements":[
          {
            "type":"rich_text_preformatted",
            "elements":[
              {
                "type":"text",
                "text":formData.codeBlock,
                "style":{"code":true}
              }
            ]
          }
        ]
      },
    ]
  }
  function getData() {
    fetch('https://hooks.slack.com/services/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',{
      method:"POST",
      mode:"no-cors",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    })
    
  }
  getData()
  
},[formData])

  return (
    <>
      <h1>The Help Desk Helper</h1>

      <form 
        onSubmit={(e) => handleSubmit(e)} 
        id="main-form"
      >

        <label htmlFor="problem">What is the problem?</label>
        <textarea id="problem" name="problem" required></textarea>

        <label htmlFor="expected" >What did I expect to happen?</label>
        <textarea id="expected" name="expected" required></textarea>

        <label htmlFor="alreadyTried">What have I already tried?</label>
        <textarea id="alreadyTried" name="alreadyTried" required></textarea>

        <label htmlFor="suspect">Why I suspect its not working</label>
        <textarea id="suspect" name="suspect" required></textarea>

        <label htmlFor="zoomLink">Zoom Link</label>
        <input id="zoomLink" name="zoomLink" required></input>

        <label>Code Block</label>
        <textarea id="codeBlock" name="codeBlock" placeholder='Paste Code Here'></textarea>
      </form>

      <div className="form-buttons">
        <button 
          className="send-button"
          form="main-form"
          type="submit"
        >
          Send
        </button>
        <button 
          className="clear-button"
        >
            Clear
          </button>
      </div>
    </>
  )
}

export default App
