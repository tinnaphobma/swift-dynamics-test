import { Layout, Row, Col, Input, Button, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={[100, 0]} justify="center" align="middle">
      <Col>
        <Link to="/test-layout">
          <Button className="box-antd">
            <h1>{t('Test1')}</h1>
            <p>{t('Layout&Style')}</p>
          </Button>
        </Link>
      </Col>
      <Col>
        <Link to="/test-form">
          <Button className="box-antd">
            <h1>{t("Test2")}</h1>
            <p>{t("Form & Table")}</p>
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default HomePage;
