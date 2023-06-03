import { Layout, Divider, Row, Col, Input, Button, Dropdown, Menu } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TestLayoutAndStyle = () => {
  const { t, i18n } = useTranslation();
  const [position, setPosition] = useState(false);
  const [arrayShape, setArrayShape] = useState([
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
    "square",
    "circle",
  ]);
  const handleMoveLeft = () => {
    const shapes: Array<string> = structuredClone(arrayShape);
    const firstElement = shapes.shift();
    shapes.push(firstElement!);
    setArrayShape(shapes);
  };
  const handleMoveRight = () => {
    const shapes: Array<string> = structuredClone(arrayShape);
    const lastElement = shapes.pop();
    shapes.unshift(lastElement!);
    setArrayShape(shapes);
  };
  const handleMoveRandom = () => {
    const shapes: Array<string> = structuredClone(arrayShape);
    setArrayShape(shapes.sort((a, b) => 0.5 - Math.random()));
  };
  return (
    <>
      <Link
        to={"/"}
        style={{
          marginLeft: "auto",
          position: "absolute",
          top: "50px",
          right: "18px",
        }}
      >
        <Button type="primary">{t("Back to homepage")}</Button>
      </Link>
      <Row justify={"center"}>
        <Row gutter={[16, 0]} style={{ width: "100%", marginTop: "40px" }}>
          <Col span={6}>
            <div className=" antd-col" onClick={handleMoveLeft}>
              <div className="triangle-left"></div>
              <div className="text">{t("layout.Moveshape to left")}</div>
            </div>
          </Col>
          <Col span={12}>
            <div
              onClick={() => setPosition(!position)}
              className="antd-col-position"
            >
              <div className="triangle-up"></div>
              <div className="triangle-down"></div>
              <div className="text" style={{ bottom: "15px" }}>
                {t("layout.Moveshape position")}
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className=" antd-col" onClick={handleMoveRight}>
              <div className="triangle-right"></div>
              <div className="text">{t("layout.Moveshape to right")}</div>
            </div>
          </Col>
        </Row>
        <Row
          justify={position ? "center" : "end"}
          gutter={[16, 0]}
          style={{ width: "100%", marginTop: "40px" }}
        >
          {arrayShape.slice(0, 3).map((shape: string) => (
            <Col span={6}>
              <div className=" antd-col" onClick={handleMoveRandom}>
                <div className={shape}></div>
              </div>
            </Col>
          ))}
        </Row>
        <Row
          justify={position ? "end" : "center"}
          gutter={[16, 0]}
          style={{ width: "100%", marginTop: "40px" }}
        >
          {arrayShape.slice(3).map((shape: string) => (
            <Col span={6}>
              <div className=" antd-col" onClick={handleMoveRandom}>
                <div className={shape}></div>
              </div>
            </Col>
          ))}
        </Row>
      </Row>
    </>
  );
};

export default TestLayoutAndStyle;
