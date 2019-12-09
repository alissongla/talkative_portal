import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Container
} from "reactstrap";
// core components
// mapTypeId={google.maps.MapTypeId.ROADMAP}

export default function Welcome({history}){

    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>

          <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <h1>TalkAtive.</h1>
              <h3>Seja bem vindo!!!</h3>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
