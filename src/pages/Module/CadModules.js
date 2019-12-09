import React, { useState } from "react";
import api from "../../services/api";
import { getToken } from "../../services/auth";

//import './styles.css';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Container
} from "reactstrap";
// core components
// mapTypeId={google.maps.MapTypeId.ROADMAP}

export default function CadModule({history}){
  const[moduleName,setModuleName] = useState('');
  const[error,setError] = useState('');

  async function handleCadModule(e){
    e.preventDefault();

    if (!moduleName) {
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
        setModuleName('');
      } catch (err) {
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
                <Input
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
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
