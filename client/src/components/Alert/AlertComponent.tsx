import Alert from 'react-bootstrap/Alert';

interface AlertComponentProps {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  alertMsg: string;
};

const AlertComponent = ({ showAlert, setShowAlert, alertMsg }: AlertComponentProps) => {
  return (
    <>
      <Alert
        show={showAlert}
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        <Alert.Heading>{alertMsg}</Alert.Heading>
        <hr />
      </Alert>
    </>
  );
};

export default AlertComponent;
