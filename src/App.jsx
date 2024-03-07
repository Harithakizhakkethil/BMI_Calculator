import { useState } from 'react'
import './App.css'
import { Col, Row } from 'react-bootstrap'


function App() {
  const [height,setHeight]=useState('')
  const [weight,setWeight]=useState('')
  const [bmi,setBmi]=useState(null)
  const [bmiStatus,setBmiStatus]=useState('')
  const [errorMessage,setErrorMessage]=useState('')

  const calculateBmi = ()=>{
    const isValidHeight=/^\d+$/.test(height)
    const isValidWeight=/^\d+$/.test(weight)


    if(isValidHeight && isValidWeight){
      const heightInMeters = height/100
      const bmiValue = weight/(heightInMeters*heightInMeters)
      setBmi(bmiValue.toFixed(2))

      
      if(bmiValue<18.5){
        setBmiStatus("Underweight 😔")
      }else if(bmiValue>=18.5 && bmiValue<24.9){
        setBmiStatus("Normal weight 😊")
      }else if(bmiValue>=25  && bmiValue<29.9){
        setBmiStatus("Overweight 😞")
      }else{
        setBmiStatus("Obese 😞")
      }
      setErrorMessage('')     
    }else{
      setBmi(null)
      setBmiStatus('')
      setErrorMessage('please enter valid numeric values for height and weight')
    }
    
 }

  const clearAll=()=>{
    setBmi(null)
    setBmiStatus('')
    setHeight('')
    setWeight('')
    imgsrc()
    
  }

  
  let imgsrc;
  let note;
  if(bmi<1){
    imgsrc=null
  }else if(bmi<18.5 ){
    imgsrc = './src/assets/underweight.jpg'
    note = 'Eat nutritious foods that are high in calories .'
  }else if(bmi>=18.5 && bmi<24.9){
    imgsrc = './src/assets/Normal weight.jpg'
  }else if(bmi>=25  && bmi<29.9){
    imgsrc= './src/assets/overweight.jpg'
    note='Eat a healthy, reduced-calorie diet and exercise regularly. '
  }else{
    imgsrc = './src/assets/obese.jpg'
    note= ' Focus on the nutritional content of your food. Avoid unhealthy and sugar drinks. '

  }


  return (
    <>

     <Row className='d-flex justify-content-center align-items-center ms-5 ' >
     <h3  style={{alignItems:'center',marginLeft:'300px'}}>BMI Calculator</h3>
  
      <Col lg={6}>
      {errorMessage && <p className='error'>{errorMessage}</p>}
        <div >
          <label className='ms-5' htmlFor='height' >Height (cm) :</label>
          <input type="text" id='height' value={height} onChange={(e)=>setHeight(e.target.value)} /><br />
          <label className='ms-5 mt-3' htmlFor='weight' >Weight (kg) :</label>
          <input  value={weight} type="text" onChange={(e)=>setWeight(e.target.value)} id='weight'  /><br />
          <button onClick={calculateBmi} className='btn btn-success text-dark ms-5 mt-4 me-3'>Calculate BMI</button>
          <button onClick={clearAll}  className='btn btn-light text-dark mt-4 '>Clear</button>
  
        </div>
        {bmi!== null && (
        <div className='results ms-5'>
                 <p>Your BMI is :{bmi}</p>
                 <p>Status : {bmiStatus}</p>
        </div>
        )}
      </Col>
      
      <Col lg={6}>
        <img style={{marginTop:'20px',marginLeft:'50px'}} src={imgsrc} alt="" />
        <p style={{paddingTop:'20px',paddingLeft:'10px',borderStyle:'hidden'}}>{note}</p><br />
      </Col>
     </Row>


    </>
  )
}

export default App
