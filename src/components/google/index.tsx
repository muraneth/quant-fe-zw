import { GoogleLogin } from "@react-oauth/google"; // Import the new GoogleLogin
import { jwtDecode } from "jwt-decode";
import { signInSuccessAction } from "@/utils/common";
import { useRequest } from "ahooks";
import { googleSignInService } from "@/service/sign-in-up";
import styles from "./index.module.scss";

export const MyGoogleLogin = () => {
  const { run: runGoogleSignIn } = useRequest(googleSignInService, {
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
    console.log("Google Login Failed");
  };

  return (
    <div className={styles.googleBtn}>
      <GoogleLogin
        onSuccess={handleGoogleSignupSuccess}
        onError={handleGoogleLoginError}
        useOneTap
      />
    </div>
  );
};
