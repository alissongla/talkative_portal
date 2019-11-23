import React, { useState } from "react";
import api from "../../services/api";
import { getToken } from "../../services/auth";

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

export default function CadText({history}){
  const[textName,setTextName] = useState('');
  const[error,setError] = useState('');

  async function handleCadModule(e){
    e.preventDefault();

    if (!textName) {
      setError("Preencha o nome do módulo para continuar!");
    } else {
      try {
        await api.post("/text", { 
          'TXT_DESCRICAO': textName 
        },{
          headers: {
            'Authorization': 'Bearer ' + getToken
          }
        });
        alert('Texto cadastrado com sucesso');
        setTextName('');
      } catch (err) {
        setError("Houve um problema para cadastrar o texto!")      
      }
    }
  };
    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>

          <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form onSubmit={handleCadModule}>
                {error && <p>{error}</p>}
                <Input
                  type='textarea'
                  placeholder="Texto "
                  value={textName}
                  onChange={event => setTextName(event.target.value)}
                  style={{marginTop: '1%'}}
                />
                <Button 
                  type="submit"  
                  style={{marginTop: '1%', backgroundColor:'#000', color: '#FFF', fontWeight: 'bold', borderColor: '#000',}}>Cadastrar texto
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
