import { Row, Col, Divider, Radio, Table, Checkbox } from "antd";
import "./TestFormAndTable.scss";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";
import "moment/locale/en-gb";
import locale from "antd/es/date-picker/locale/en_US";
import {
  Employee,
  EmployeesState,
  addInfo,
  mutipleRemove,
  setEmployees,
} from "../redux/employeeReducer";
import { Link } from "react-router-dom";

const { Option } = Select;

const TestFormAndTable = () => {
  const { t, i18n } = useTranslation();
  const employees = useSelector((state: EmployeesState) => state.data);
  const dispatch = useDispatch();
  const [removeList, setRemoveList] = useState<Array<number>>([]);

  console.log("employees", employees);
  const [form] = Form.useForm();
  useEffect(() => {
    const history = localStorage.getItem("employees");

    if (history) {
      dispatch(setEmployees(JSON.parse(history)));
      console.log("dwd", JSON.parse(history));
    }
  }, []);

  const handleSubmit = (values: Employee) => {
    console.log("dwdaaaavalues", values);
    dispatch(addInfo({ ...values }));
    console.log("value date", values.birthday);
    console.log("value date json", moment(JSON.stringify(values.birthday)));
    localStorage.setItem(
      "employees",
      JSON.stringify([...employees, { ...values }])
    );
  };
  const handleClear = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: `${t("column.Name")}`,
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render: (text: string, record: any, index: number) => (
        <span>
          <input
            style={{ marginRight: "20px" }}
            type="checkbox"
            checked={removeList.includes(index)}
            onClick={() => {
              if (removeList.includes(index)) {
                setRemoveList(removeList.filter((item) => item !== index));
              } else {
                setRemoveList([...removeList, index]);
              }
            }}
          />
          {text}
        </span>
      ),
    },
    {
      title: `${t("column.Gender")}`,
      dataIndex: "gender",
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
    },
    {
      title: `${t("column.Phone Number")}`,
      dataIndex: ["phoneNumber", "number"],
      sorter: (a: any, b: any) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: `${t("column.Nationality")}`,
      dataIndex: "nationality",
      sorter: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: `${t("column.Actions")}`,
      render: (text: string, record: any) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          {t("Edit")}
        </Button>
      ),
    },
  ];
  console.log("first", employees.length && dayjs(employees[0].birthday));
  const handleEdit = (record: Employee) => {
    console.log("record ", record);
    form.setFieldsValue({ ...record, birthday: dayjs(record.birthday) });
  };
  const handleDelete = (record: any) => {
    console.log("Delete", record);
    dispatch(mutipleRemove(removeList));
    localStorage.setItem("employees", JSON.stringify([]));
    setRemoveList([]);
  };
  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      const list = Array.from(
        { length: employees.length },
        (_, index) => index
      );
      setRemoveList(list);
    } else {
      setRemoveList([]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ fontSize: "40px", marginLeft: "10px" }}>
        {t("form management")}
      </p>
      <Link to={"/"} style={{ marginLeft: "auto" }}>
        <Button type="primary">{t("Back to homepage")}</Button>
      </Link>

      <div
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            style={{ border: "1px solid black", width: "100%" }}
            layout="horizontal"
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item style={{ marginBottom: 0, marginTop: "15px" }}>
              <Form.Item
                label={t("form.article")}
                name="article"
                rules={[{ required: true }]}
                style={{ display: "inline-block", width: "90px" }}
              >
                <Select
                  style={{
                    display: "flex",
                    width: "100px",
                    marginLeft: "10px",
                  }}
                >
                  <Option value="male">{t("form.articleOption.Mr.")}</Option>
                  <Option value="female">{t("form.articleOption.Mrs.")}</Option>
                  <Option value="other">{t("form.articleOption.Miss")}</Option>
                  <Option value="other">{t("form.articleOption.Ms.")}</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="name"
                label={t("form.name")}
                style={{
                  display: "inline-block",
                  width: "80px",
                  marginLeft: "110px",
                }}
                rules={[
                  {
                    required: true,
                    message: `${t("massage.Please enter your name")}`,
                  },
                ]}
              >
                <Input style={{ display: "inline-block", width: "300px" }} />
              </Form.Item>
              <Form.Item
                name="surname"
                label={t("form.Surname")}
                style={{
                  display: "inline-block",
                  width: "15%",
                  marginLeft: "290px",
                }}
                rules={[
                  {
                    required: true,
                    message: `${t("massage.Please enter your surname")}`,
                  },
                ]}
              >
                <Input style={{ display: "inline-block", width: "200%" }} />
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                name="birthday"
                label={t("form.Birthday")}
                style={{
                  display: "inline-block",
                  width: "80px",
                }}
                rules={[
                  {
                    required: true,
                    message: `${t("Please select your birthday")}`,
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DDTHH:mm:ss.SSSZ"
                  style={{ width: "150px" }}
                />
              </Form.Item>
              <Form.Item
                name="nationality"
                label={t("form.nationality")}
                style={{
                  display: "inline-block",
                  width: "80px",
                  marginLeft: "180px",
                }}
                rules={[
                  {
                    required: true,
                    message: `${t("massage.Please enter your nationality")}`,
                  },
                ]}
              >
                <Select
                  placeholder={t(
                    "form.placeholder.please select your nationality"
                  )}
                  style={{ display: "flex", width: "300px" }}
                >
                  <Option value="thai">
                    {t("form.nationalityOption.thai")}
                  </Option>
                  <Option value="american">
                    {t("form.nationalityOption.american")}
                  </Option>
                  <Option value="cannadian">
                    {t("form.nationalityOption.cannadian")}
                  </Option>
                </Select>
              </Form.Item>
            </Form.Item>
            <Form.Item label={t("form.ID Card Number")} name="idCardNumber">
              <Input.Group compact>
                <Form.Item name={["idCardNumber", "part1"]} noStyle>
                  <Input style={{ width: "10%" }} />
                </Form.Item>
                <span style={{ margin: "0 8px" }}>-</span>
                <Form.Item name={["idCardNumber", "part2"]} noStyle>
                  <Input style={{ width: "10%" }} />
                </Form.Item>
                <span style={{ margin: "0 8px" }}>-</span>
                <Form.Item name={["idCardNumber", "part3"]} noStyle>
                  <Input style={{ width: "10%" }} />
                </Form.Item>
                <span style={{ margin: "0 8px" }}>-</span>
                <Form.Item name={["idCardNumber", "part4"]} noStyle>
                  <Input style={{ width: "10%" }} />
                </Form.Item>
                <span style={{ margin: "0 8px" }}>-</span>
                <Form.Item name={["idCardNumber", "part5"]} noStyle>
                  <Input style={{ width: "10%" }} />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              label={t("form.Gender")}
              name="gender"
              rules={[
                {
                  required: true,
                  message: `${t("massage.Please select your gender")}`,
                },
              ]}
            >
              <Radio.Group>
                <Radio value="male">{t("form.genderOption.male")}</Radio>
                <Radio value="female">{t("form.genderOption.female")}</Radio>
                <Radio value="other">{t("form.genderOption.other")}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={t("form.Phone Number")}
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: `${t("massage.Please enter your phone number")}`,
                },
              ]}
            >
              <Input.Group compact>
                <Form.Item name={["phoneNumber", "countryCode"]} noStyle>
                  <Select style={{ width: "15%" }}>
                    <Option value="+66">+66 (THA)</Option>
                    <Option value="+1">+1 (USA)</Option>
                    <Option value="+44">+44 (UK)</Option>
                    <Option value="+91">+91 (India)</Option>
                  </Select>
                </Form.Item>{" "}
                -
                <Form.Item name={["phoneNumber", "number"]} noStyle>
                  <Input style={{ width: "30%" }} />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              label={t("form.Passport Number")}
              name="passportNumber"
              rules={[
                {
                  pattern: /^[A-Z0-9]+$/,
                  message: `${t(
                    "massage.Passport number should contain only uppercase letters and numbers"
                  )}`,
                },
              ]}
            >
              <Input style={{ width: "300px" }} />
            </Form.Item>
            <Form.Item
              style={{
                marginBottom: 0,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Form.Item
                name="salary"
                label={t("form.Salary")}
                style={{
                  display: "inline-block",
                  width: "80px",
                }}
                rules={[
                  {
                    required: true,
                    message: `${t("massage.Please enter your salary")}`,
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: `${t("massage.Please enter a valid salary")}`,
                  },
                ]}
              >
                <Input prefix="$" style={{ width: "299px" }} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  onClick={handleClear}
                  style={{
                    display: "inline-block",
                    width: "80px",
                    marginLeft: "250px",
                  }}
                >
                  {t("Clear")}
                </Button>
                <Button
                  style={{
                    display: "inline-block",
                    width: "80px",
                    marginLeft: "180px",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  {t("Submit")}
                </Button>
              </Form.Item>
            </Form.Item>
          </Form>
        </Row>
        <div style={{ width: "90%" }}>
          <Checkbox onChange={handleSelectAll}>{t("Select")}</Checkbox>
          <Button onClick={handleDelete}>{t("Delete")}</Button>
          <Table
            dataSource={employees}
            columns={columns}
            pagination={{ pageSize: 5 }}
            onChange={(pagination, filters, sorter) => console.log(sorter)}
          />
        </div>
      </div>
    </div>
  );
};

export default TestFormAndTable;
