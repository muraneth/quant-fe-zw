import { Button, Form, Input } from "antd";
import type { FormProps } from "antd";
import { useRequest } from "ahooks";
import { signUpService, signInService,googleSignInService } from "@/service/sign-in-up";
import type { SignUpReqDto } from "@/service/sign-in-up";
import { svgMap } from "@/constants/svg";
import { passwordRule } from "@/constants/regexp";
import { signInSuccessAction } from "@/utils/common";
import styles from "./index.module.scss";
import { MyGoogleLogin } from "@/components/google";

const SignUp = () => {
  const [form] = Form.useForm();

  const { run: runSignIn, loading: signInLoading } = useRequest(signInService, {
    manual: true,
    onSuccess: (res) => {
      signInSuccessAction(res);
    },
  });

  const { run: runSignUp, loading: signUpLoading } = useRequest(signUpService, {
    manual: true,
    onSuccess: () => {
      const params = form.getFieldsValue();
      params.source = "email";
      runSignIn(params);
    },
    onError: (error) => {
      if (error.message === "USER_EMAIL_EXIST") {
        form.setFields([
          {
            name: "email",
            errors: ["This email is already registered"],
          },
        ]);
      }
      if (error.message === "USER_NAME_EXIST") {
        form.setFields([
          {
            name: "username",
            errors: ["This username is already registered"],
          },
        ]);
      }
    },
  });

  const handleSignUp: FormProps<
    SignUpReqDto & { passwordConfirm?: string }
  >["onFinish"] = (values) => {
    values.source = "email";
    delete values.passwordConfirm;
    runSignUp(values);
  };
  


  return (
    <div className={styles.signUp}>
      <div className={styles.signUpContent}>
        {svgMap["signInLogo"]}
        <span className={styles.title}>Sign Up</span>
        <MyGoogleLogin />

        <Form
          className={styles.signUpForm}
          name="signUp"
          form={form}
          layout="vertical"
          onFinish={handleSignUp}
        >
          <Form.Item
            className={styles.signUpFormItem}
            name="username"
            label="Username"
            rules={[{ required: true, message: "Enter your username" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            className={styles.signUpFormItem}
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter your emalil" />
          </Form.Item>
          <Form.Item
            className={styles.signUpFormItem}
            name="password"
            label="Password"
            tooltip="Contains case, digits, symbols and at least 8 characters"
            rules={[
              { required: true, message: "Enter your password" },
              () => ({
                validator(_, value) {
                  if (passwordRule.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Password must contains case, digits, symbols and at least 8 characters"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            className={styles.signUpFormItem}
            name="passwordConfirm"
            label="Password Confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password again" />
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.signUpFormSubmit}
              type="primary"
              htmlType="submit"
              loading={signUpLoading || signInLoading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <a className={styles.signInWrapper} href="/sign-in">
          <span className={styles.signInWrapperDesc}>
            Already have an account？
          </span>
          <span className={styles.signInWrapperAction}>Sign in</span>
        </a>
      </div>
    </div>
  );
};

export default SignUp;
