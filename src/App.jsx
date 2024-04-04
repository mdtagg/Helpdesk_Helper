import { useEffect,useState } from 'react'
import populateSlackMarkup from './helpers';

function App() {

  const [ formData, setFormData ] = useState(null);
  const { createProblemBlock } = populateSlackMarkup()

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

  const body = {
    "blocks":[
      ...createProblemBlock("What is the problem?",formData.problem,'subject'),
      ...createProblemBlock("What did I expect to happen?",formData.expected,'subject'),
      ...createProblemBlock("What have I already tried?",formData.tried,'subject'),
      ...createProblemBlock("Why I suspect its not working",formData.suspect,'subject'),
      ...createProblemBlock("Zoom Link",formData.zoomLink,'link'),
      ...createProblemBlock("code",formData.codeBlock,'code')
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
    setFormData(null);
    
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


/*
{
  // {
      //   "type":"section",
      //   "fields":[
      //     {
      //       "type":"mrkdwn",
      //       "text":formData.tried
      //     }
      //   ]
      // },
      // {
      //   "type":"header",
      //      "text":{
      //         "type":"plain_text",
      //         "text": "Why I suspect its not working"
      //       }
      // },
      // {
      //   "type":"section",
      //   "fields":[
      //     {
      //       "type":"mrkdwn",
      //       "text":formData.suspect
      //     }
      //   ]
      // },
      // {
      //   "type":"rich_text",
      //   "elements":[
      //     {
      //       "type":"rich_text_section",
      //       "elements":[
      //         ...divider
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "type":"header",
      //      "text":{
      //         "type":"plain_text",
      //         "text": "Zoom Link"
      //       }
      // },
      // {
      //   "type":"rich_text",
      //   "elements":[
      //     {
      //       "type":"rich_text_section",
      //       "elements":[
      //         ...divider
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "type":"rich_text",
      //   "elements":[
      //     {
      //       "type":"rich_text_section",
      //       "elements":[
      //         {
      //           "type":"link",
      //           "url":formData.zoomLink
      //         }
      //       ]
      //     }
      //   ]
      // },
      
      // {
      //   "type":"header",
      //      "text":{
      //         "type":"plain_text",
      //         "text": "Code Block "
      //       }
      // },
      // {
      //   "type":"rich_text",
      //   "elements":[
      //     {
      //       "type":"rich_text_section",
      //       "elements":[
      //         ...divider
      //       ]
      //     }
      //   ]
      // },
      // {
      //   "type":"rich_text",
      //   "elements":[
      //     {
      //       "type":"rich_text_preformatted",
      //       "elements":[
      //         {
      //           "type":"text",
      //           "text":formData.codeBlock,
      //           "style":{"code":true}
      //         }
      //       ]
      //     }
      //   ]
      // },
        "type":"rich_text",
        "block_id":"block1",
        "elements":[
          {
            "type":"rich_text_list",
            "elements": [
              {
                "type":"rich_text_section",
                "elements":[
                  {
                    "type":"text",
                    "text":formData.problems
                  }
                ]
              }
            ],
            "style":"bullet",
            "indent": 0,
            "border": 1
          },
          
        ]
        
      },
*/