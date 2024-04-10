import { useState,useEffect } from 'react'
import populateSlackMarkup from './helpers';
import axios from 'axios';

function App() {

  const [ formData, setFormData ] = useState({
    priority:"medium",
    problem:"",
    expected:"",
    tried:"",
    suspect:"",
    zoomLink:"",
    codeBlock:""
  })

  const { createProblemBlock,createPriority } = populateSlackMarkup()

  const handleChange = (e,type)  => {
    const localFormData = JSON.parse(localStorage.getItem('helpDeskHelper'))
    if(!localFormData) localStorage.setItem('helpDeskHelper',JSON.stringify(formData))

    const data = JSON.parse(localStorage.getItem('helpDeskHelper'))
    data[type] = e.target.value
    setFormData(data)
    localStorage.setItem("helpDeskHelper",JSON.stringify(data))
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const body = {
      "blocks":[
        {
          "type":"divider"
        },
        createPriority(formData.priority),
        ...createProblemBlock("What is the problem?",formData.problem,'subject'),
        ...createProblemBlock("What did I expect to happen?",formData.expected,'subject'),
        ...createProblemBlock("What have I already tried?",formData.tried,'subject'),
        ...createProblemBlock("Why I suspect its not working",formData.suspect,'subject'),
        ...createProblemBlock("Zoom Link",formData.zoomLink,'link'),
        ...createProblemBlock("Code",formData.codeBlock,'code')
      ]
    }

  const fetchData = async() => {
    await fetch("http://localhost:3000", {
      method:'POST',
      mode:"cors",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
  }
  fetchData()

  clearInputs()
  alert('Message sent to Slack!')
}

const clearInputs = () => {
  const resetFormData = {
    priority:"medium",
    problem:"",
    expected:"",  
    tried:"",
    suspect:"",
    zoomLink:"",
    codeBlock:""
  }
  setFormData(resetFormData)
  localStorage.removeItem('helpDeskHelper')
}

useEffect(() => {
  
  const localFormData = JSON.parse(localStorage.getItem('helpDeskHelper'))
  if(localFormData) setFormData(localFormData);
  else localStorage.setItem('helpDeskHelper',JSON.stringify(formData));
},[])

  return (
  
    <>
      <h1>The Help Desk Helper</h1>

      <form 
        onSubmit={(e) => handleSubmit(e)} 
        id="main-form"
      >
        <label htmlFor="priority">Priority</label>
        <select onChange={(e) => handleChange(e,'priority')} value={formData.priority} id="priority" name="priority" required>
          <option value="low">
            Low: (Insight or clarification needed, everything working)
          </option>
          <option default value="medium">
           Medium: (Could use some help soon but not urgent)
          </option>
          <option value="high">
            High: (Really stuck, need help asap)
          </option>
        </select>

        <label htmlFor="problem">What is the problem?</label>
        <textarea onChange={(e) => handleChange(e,'problem')} value={formData.problem} id="problem" name="problem" required></textarea>

        <label htmlFor="expected" >What did I expect to happen?</label>
        <textarea onChange={(e) => handleChange(e,'expected')} value={formData.expected} id="expected" name="expected" required></textarea>

        <label htmlFor="alreadyTried">What have I already tried?</label>
        <textarea onChange={(e) => handleChange(e,'tried')} value={formData.tried} id="alreadyTried" name="alreadyTried" required></textarea>

        <label htmlFor="suspect">Why I suspect its not working</label>
        <textarea onChange={(e) => handleChange(e,'suspect')} value={formData.suspect} id="suspect" name="suspect" required></textarea>

        <label htmlFor="zoomLink">Zoom Link</label>
        <input onChange={(e) => handleChange(e,'zoomLink')} value={formData.zoomLink} id="zoomLink" name="zoomLink" required></input>

        <label>Code Block</label>
        <textarea onChange={(e) => handleChange(e,'codeBlock')} value={formData.codeBlock} id="codeBlock" name="codeBlock" placeholder='Paste Code Here' required></textarea>
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
          onClick={clearInputs}
        >
            Clear
        </button>
      </div>
    </>
  )
}

export default App