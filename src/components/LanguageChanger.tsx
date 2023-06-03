import React, { CSSProperties } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const language = ["en", "th"];

const LanguageChanger = ({ style }: { style?: CSSProperties }) => {
  const { i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <Select
      onChange={(e) => changeLanguage(e)}
      defaultValue="en"
      style={{ ...style, width: 120 }}
    >
      <Option value="en">English</Option>
      <Option value="th">ไทย</Option>
    </Select>
  );
};

export default LanguageChanger;
