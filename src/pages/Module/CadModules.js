import React, { useState } from "react";
import api from "../../services/api";
import Loader from 'react-loader-spinner';
import { getToken } from "../../services/auth";

//import './styles.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Container,
  Label
} from "reactstrap";
// core components
// mapTypeId={google.maps.MapTypeId.ROADMAP}

export default function CadModule({history}){
  const[moduleName,setModuleName] = useState('');
  const[error,setError] = useState('');
  const[loading,setLoading] = useState(false);

  async function handleCadModule(e){
    e.preventDefault();
    setLoading(true);
    if (!moduleName) {
      setLoading(false);
      setError("Preencha o nome do módulo para continuar!");
    } else {
      try {
        await api.post("/module", { 
          'MOD_NOME': moduleName 
        },{
          headers: {
            'Authorization': 'Bearer ' + getToken
          }
        });
        alert('Módulo cadastrado com sucesso');
        setLoading(false);
        setModuleName('');
      } catch (err) {
        setLoading(false);
        setError("Houve um problema para cadastrar o modulo!")      
      }
    }
  };
    return (
      <>
        {/* Page content */}
        <Container className="mt--7 container__custom" fluid>

          <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleCadModule}>
                {error && <p>{error}</p>}
                <Label for="moduleInput">Módulo</Label>
                <Input
                  id='moduleInput'
                  type="text"
                  placeholder="Nome do módulo"
                  value={moduleName}
                  onChange={event => setModuleName(event.target.value)}
                  style={{marginTop: '1%'}}
                />
                <Button 
                  type="submit"  
                  style={{marginTop: '1%', backgroundColor:'#000', color: '#FFF', fontWeight: 'bold', borderColor: '#000',}}>Cadastrar módulo
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
