

function App() {

  return (
    <>
      <h1>The Help Desk Helper</h1>
      <form className="main-form">
        <label>What is the problem?</label>
        <textarea></textarea>
        <label>What did I expect to happen?</label>
        <textarea></textarea>
        <label>What have I already tried?</label>
        <textarea></textarea>
        <label>Why I suspect its not working</label>
        <textarea></textarea>
        <label>Zoom Link</label>
        <input></input>
      </form>
      <div className="form-buttons">
        <button className="send-button">Send</button>
        <button className="clear-button">Clear</button>
      </div>
    </>
  )
}

export default App
