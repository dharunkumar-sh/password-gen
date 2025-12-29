import PasswordGenerator from "@/components/PasswordGenerator";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Cipher Key - Create Secure Passwords Instantly</title>
        <meta 
          name="description" 
          content="Generate strong, secure passwords instantly. Features automatic generation with customizable options or manual password creation with real-time strength analysis." 
        />
      </Helmet>
      <PasswordGenerator />
    </>
  );
};

export default Index;
