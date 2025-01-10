import { GoogleLogin } from '@react-oauth/google';  // Import the new GoogleLogin
import { jwtDecode } from 'jwt-decode';
import { signInSuccessAction } from "@/utils/common";
import { useRequest } from "ahooks";
import { googleSignInService } from "@/service/sign-in-up";
import { Button } from 'antd';
import { svgMap } from "@/constants/svg";
import styles from "./index.module.scss";
import { useGoogleLogin } from '@react-oauth/google';

export const MyGoogleLogin = () => {
  const { run: runGoogleSignIn, loading: googleSignInLoading } = useRequest(googleSignInService, {
    manual: true,
    onSuccess: (res) => {
      signInSuccessAction(res);
    },
  });
  
  const handleGoogleSignupSuccess = async (credentialResponse: any) => {
    const Idtoken = credentialResponse.credential;
    const userObject = jwtDecode(Idtoken);
    console.log(userObject);

    runGoogleSignIn({
      id_token: Idtoken,
    });
  };

  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSignupSuccess,
    onError: handleGoogleLoginError,
  });

  return (
    //   <Button className={styles.googleBtn} icon={svgMap["google"]} onClick={() => googleLogin()}> 
    //     Google Login
    //   </Button> 
    <div className={styles.googleBtn}>
        <GoogleLogin
        onSuccess={handleGoogleSignupSuccess}
        onError={handleGoogleLoginError}
        useOneTap
      />
    </div>
    
  );
};
