import React from "react";
import { Button, Flex, Form, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../action/actions";

import { toast } from "react-toastify";
import { SingUpStyle } from "../../styledCommponets/SingUpStyle";
const userTypeOptions = ["user", "Provider"];

const { setLoginData, setUserIdCounterData } = actions;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    style: {
      textAlign: "left",
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      // offset: 8,
    },
    sm: {
      // span: 16,
      // offset: 0,
    },
  },
};
const SingUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { registerData } = useSelector((s) => s.register);
  const { userIdCounterData } = useSelector((s) => s.idCounterIncrement);

  const onFinish = (values) => {
    dispatch(setUserIdCounterData());
    const addId = { ...values, id: userIdCounterData };
    dispatch(setLoginData([...registerData, addId]));
    form.resetFields();
    navigate("/");
    toast.success("Register Successfully");
  };

  return (
    <SingUpStyle>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
          userType: "user",
        }}
        style={{
          width: 400,
        }}
        scrollToFirstError
        className="singUpFrom"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="userType"
          label="userType"
          rules={[
            {
              required: true,
              message: "Please select userType Options!",
            },
          ]}
        >
          <Radio.Group options={userTypeOptions} defaultValue="user" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Flex justify="center">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Flex>
        </Form.Item>
        <Flex justify="center" style={{ color: "#fff" }}>
          already have an account
          <Space>
            {" "}
            <Link to="/"> Login </Link>{" "}
          </Space>
          here
        </Flex>
      </Form>
    </SingUpStyle>
  );
};

export default SingUp;
