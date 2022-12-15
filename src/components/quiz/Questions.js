import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import RadarComponent from '../chart/Radar';

const Questions = (props) => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [user, setUser] = useState('')
  const [selectedQuestion, setSelectedQuestion] = useState('')
  const data = {
    labels: ['Q#1', 'Q#2', 'Q#3', 'Q#4', 'Q#5', 'Q#6', 'Q#7', 'Q#8', 'Q#9', 'Q#10', 'Q#11', 'Q#12', 'Q#13', 'Q#14', 'Q#15'],
    datasets: [
      {
        label: 'Correct Answers',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [4,1,1,3,1,3,2,1,4,3,4,3,4,1,4]
      },
      {
        label: 'User Answers',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: user?.selection,
    }
    ],
  };
  

  const navigate = useNavigate();

  const onChangeValue = (e) => {
    setSelectedQuestion(e.target.value)
  }

  const nextQuestion = async (question) => {
    if (selectedQuestion !== '') {
      let checkQuestion = questions[user.selection.length]
      let qResult = checkQuestion.answer === selectedQuestion ? true : false
      let updateUser = { ...user, selection: [...user.selection, selectedQuestion], result: [...user.result, qResult] }
      const response = await axios.put(`http://localhost:8000/users/${user.id}`, updateUser)
      if (response) {
        setSelectedQuestion('')
        setUser(response.data)
      }
    }
  }

  const playAgain = async () => {
    let updateUser = { ...user, selection: [], result: [] }
    const response = await axios.put(`http://localhost:8000/users/${user.id}`, updateUser)
    if (response) {
      setUser(response.data)
    }
  }
  const logout = async () => {
    localStorage.removeItem('userId')
    navigate('/')
    props.Logged(false)

  }

  const getQuestions = async () => {

    const res = await axios.get("http://localhost:8000/questions");
    if (res) {
      setQuestions(res.data)
    }
  }

  const getUser = async () => {
    let userId = localStorage.getItem('userId')
    const res = await axios.get(`http://localhost:8000/users/${userId}`);
    if (res) {
      setUser(res.data)
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true);
    getQuestions()
    getUser()
  }, [])

  return (
    <>
      {loading ? 'loading' :
        <div>
          <Link to='/'><button>Home</button></Link>
          {questions?.length > 0 ?
            user?.selection?.length >= questions?.length ?
              <div>
                <RadarComponent data={data} />
                <div>
                  <h3>Total Number of Questions: {questions?.length}</h3>
                  <h3>Total number of correct answers: {(user?.result.filter(rs => rs === true)).length}</h3>
                  <h3>Total number of wrong answers: {(user?.result.filter(rs => rs === false)).length}</h3>
                  <button onClick={playAgain}>Play Again</button>
                </div>
                {questions?.map((qus, ind) => (
                  <>
                    <h3>{qus.id}-{qus.question}</h3>
                    <ul>
                      <li>{qus[1]}</li>
                      <li>{qus[2]}</li>
                      <li>{qus[3]}</li>
                      <li>{qus[4]}</li>
                    </ul>
                    <h4>Your Selection:</h4> {user.selection[ind]}
                    <h4>Correct Answer:</h4> {qus.answer}
                    <h4>Result:</h4> {user.result[ind] === true ? 'true' : 'false'}
                  </>
                ))}
              </div> :
              [questions[user?.selection?.length]].map(question => (
                <div key={question.id}>
                  <h3>{question.id}-{question.question}</h3>
                  <div onChange={onChangeValue}>
                    <div>
                      <input type="radio" id={`${question[1]}`} name="fav_language" value="1" />
                      <label htmlFor={`${question[1]}`}>{question[1]}</label>
                      <input type="radio" id={`${question[2]}`} name="fav_language" value="2" />
                      <label htmlFor={`${question[2]}`}>{question[2]}</label>
                    </div>
                    <div>
                      <input type="radio" id={`${question[3]}`} name="fav_language" value="3" />
                      <label htmlFor={`${question[3]}`}>{question[3]}</label>
                      <input type="radio" id={`${question[4]}`} name="fav_language" value="4" />
                      <label htmlFor={`${question[4]}`}>{question[4]}</label>
                    </div>
                  </div>
                  <button onClick={() => nextQuestion(question)}>Next</button>
                </div>
              )) :
            'Not Question Found'}
        </div>}
    </>
  )
}

export default Questions