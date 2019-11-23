import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { getToken } from "../../services/auth";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Label
} from "reactstrap";


export default function CadExercises({history}){
  const[aulas,setAulas] = useState([]);
  const[classCod,setClassCod] = useState('');
  const[language,setLanguage] = useState('');
  const[answer,setAnswer] = useState('');
  const[exercise,setExercise] = useState('');
  const[error,setError] = useState('');
  
  useEffect(() => {
    try {
      api.get("/class", {
        headers: {
          'Authorization': 'Bearer ' + getToken
        }
      }).then(response => {
        setAulas(response.data)
       
      });
      
    } catch (err) {
      setError("Houve um problema para cadastrar o exercício!")      
    }
  },[])


  async function handleCadExercise(e){
    e.preventDefault();

    if (!classCod || !language || !exercise || !answer) {
      setError("Preencha os dados para continuar!");
    } else {
      try {
        await api.post("/exercise", { 
          'AUL_CODIGO': classCod,
          'EXE_LINGUA': language,
          'EXE_ENUNCIADO': exercise,
          'EXE_RESPOSTA': answer
        },{
          headers: {
            'Authorization': 'Bearer ' + getToken
          }
        });
        alert('Exercício cadastrado com sucesso');
        setClassCod('');
        setLanguage('');
        setAnswer('');
        setExercise('');
        setError('');
      } catch (err) {
        setError("Houve um problema para cadastrar o exercício!")      
      }
    }
  };
    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>

          <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleCadExercise}>
                {error && <p>{error}</p>}
                <FormGroup>
                  <Label for="selectClass">Aula</Label>
                  <Input
                    id="selectClass"
                    type="select"
                    onChange={event => setClassCod(event.target.value)}
                    defaultValue={'DEFAULT'}
                  >
                    <option value="DEFAULT" disabled>Selecione a aula</option>
                    {aulas.map(aula => {
                      return <option key={aula.AUL_CODIGO} value={aula.AUL_CODIGO}>{aula.AUL_CODIGO} - {aula.AUL_NOME}</option>
                    })}  
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="selectLanguage">Línguagem do enunciado</Label>
                  <Input
                    id="selectLanguage"
                    type="select"
                    onChange={event => setLanguage(event.target.value)}
                    defaultValue={'DEFAULT'}
                  >
                    <option value="DEFAULT" disabled>Selecione a linguagem a ser falada</option>
                    <option value='P'>Português</option>
                    <option value='I'>Inglês</option>
                  </Input>
                </FormGroup>  
                <FormGroup>
                  <Label for="selectExercise">Enunciado (Caso seja uma questão de alternativas colocar ';' em seguida as alternativas exemplo: Enunciado;A - resposta;B - resposta... Até 4 alternativas</Label>
                  <Input
                    type="text"
                    placeholder="Exercício"
                    value={exercise}
                    onChange={event => setExercise(event.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="selectExercise">Resposta (Caso seja alternativa: 'Letra - Resposta'</Label>
                  <Input
                    type="text"
                    placeholder="Resposta"
                    value={answer}
                    onChange={event => setAnswer(event.target.value)}
                  />
                </FormGroup>
                <Button 
                  type="submit"  
                  style={{marginTop: '1%', backgroundColor:'#000', color: '#FFF', fontWeight: 'bold', borderColor: '#000',}}>Cadastrar exercício
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
