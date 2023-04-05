import Alert from 'react-bootstrap/Alert';

interface AlertComponentProps {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
};

const AlertComponent = ({ showAlert, setShowAlert }: AlertComponentProps) => {
  return (
    <>
      <Alert
        show={showAlert}
        variant="success"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        <Alert.Heading>Hi there!</Alert.Heading>
        <p>It seems like you've already have this movie in Your Favorites... Choose another one!</p>
        <hr />
      </Alert>
    </>
  );
};

export default AlertComponent;
