import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Loader from 'react-loader-spinner';
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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// core components

// mapTypeId={google.maps.MapTypeId.ROADMAP}

export default function CadClasses({history}){
  const[textos,setTextos] = useState([]);
  const[textCod,setTextCod] = useState('');
  const[modulos,setModulos] = useState([]);
  const[moduleCod,setModuleCod] = useState('');
  const[nameClass,setNameClass] = useState('');
  const[error,setError] = useState('');
  const[loading,setLoading] = useState(false);
  
  useEffect(() => {
    try {
      api.get("/text", {
        headers: {
          'Authorization': 'Bearer ' + getToken
        }
      }).then(response => {
        setTextos(response.data)
       
      });
      
    } catch (err) {
      setError("Houve um problema para cadastrar o modulo!")      
    }
  },[])

  useEffect(() => {
    try {
      api.get("/module", {
        headers: {
          'Authorization': 'Bearer ' + getToken
        }
      }).then(response => {
        setModulos(response.data)
       
      });
      
    } catch (err) {
      setError("Houve um problema para cadastrar o modulo!")      
    }
  },[])

  async function handleCadClass(e){
    e.preventDefault();
    setLoading(true);
    console.log(textCod);
    console.log(moduleCod);
    if (!textCod || !moduleCod) {
      setLoading(false);
      setError("Preencha os dados para continuar!");
    } else {
      try {
        await api.post("/class", { 
          'TXT_CODIGO': textCod,
          'MOD_CODIGO': moduleCod,
          'AUL_NOME': nameClass
        },{
          headers: {
            'Authorization': 'Bearer ' + getToken
          }
        });
        setLoading(false);
        alert('Aula cadastrada com sucesso');
        
      } catch (err) {
        setLoading(false);
        setError("Houve um problema para cadastrar o modulo!")      
      }
    }
  };
    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>

          <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleCadClass}>
                {error && <p>{error}</p>}
                <FormGroup>
                  <Label for="selectText">Texto</Label>
                  <Input
                    id="selectText"
                    type="select"
                    onChange={event => setTextCod(event.target.value)}
                    defaultValue={'DEFAULT'}
                  >
                    <option value="DEFAULT" disabled>Selecione o texto</option>
                    {textos.map(text => {
                      return <option key={text.TXT_CODIGO} value={text.TXT_CODIGO}>{text.TXT_CODIGO} - {text.TXT_DESCRICAO}</option>
                    })}  
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="selectModule">Módulo</Label>
                  <Input
                    id="selectModule"
                    type="select"
                    onChange={event => setModuleCod(event.target.value)}
                    defaultValue={'DEFAULT'}
                  >
                    <option value="DEFAULT" disabled>Selecione o módulo</option>
                    {modulos.map(mod => {
                      return <option key={mod.MOD_CODIGO} value={mod.MOD_CODIGO}>{mod.MOD_CODIGO} - {mod.MOD_NOME}</option>
                    })}  
                  </Input>
                </FormGroup>  
                <FormGroup>
                  <Label for="selectClass">Nome de aula</Label>
                  <Input
                    id="selectClass"
                    type="text"
                    placeholder="Nome da aula"
                    value={nameClass}
                    onChange={event => setNameClass(event.target.value)}
                    style={{marginTop: '1%'}}
                  />
                </FormGroup>
                <Button 
                  type="submit"  
                  style={{marginTop: '1%', backgroundColor:'#000', color: '#FFF', fontWeight: 'bold', borderColor: '#000',}}>Cadastrar aula
                </Button>
                <Loader
                  type="TailSpin"
                  visible={loading}
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
