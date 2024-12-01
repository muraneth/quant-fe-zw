import { Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { svgMap } from "@/svg";
import { useRequest } from "ahooks";
import { signInService, SignInReqDto } from "@/service/sign-in-up";
import { signInSuccessAction } from "@/utils/common";
import styles from "./index.module.scss";

const SignIn = () => {
  const { run } = useRequest(signInService, {
    manual: true,
    onSuccess: (res) => {
      signInSuccessAction(res);
    },
  });

  const handleSignIn: FormProps<SignInReqDto>["onFinish"] = (values) => {
    values.source = "email";
    run(values);
  };

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        {svgMap["signInLogo"]}
        <span className={styles.title}>Sign In</span>
        <Button className={styles.googleBtn} icon={svgMap["google"]}>
          Sign in with Google
        </Button>
        <div className={styles.or}>
          <div className={styles.orLine} />
          <div className={styles.orText}>or</div>
        </div>
        <Form
          className={styles.signInForm}
          layout="vertical"
          onFinish={handleSignIn}
        >
          <Form.Item
            className={styles.signInFormItem}
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter your emalil" />
          </Form.Item>
          <Form.Item
            className={styles.signInFormItem}
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.signInFormSubmit}
              type="primary"
              htmlType="submit"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <a className={styles.signUpWrapper} href="/sign-up">
          <span className={styles.signUpWrapperDesc}>Don’t have account？</span>
          <span className={styles.signUpWrapperAction}>Sign UP</span>
        </a>
      </div>
    </div>
  );
};

export default SignIn;
