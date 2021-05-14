import { Alert } from "react-bootstrap";

function AlertComponent(props) {
  const { title, message, show, onClick } = props;
  return (
    <div className="container">
      {show && true ? (
        <Alert
          style={{ marginTop: 20 }}
          variant="danger"
          onClose={onClick}
          dismissible
        >
          <Alert.Heading>{title}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AlertComponent;
