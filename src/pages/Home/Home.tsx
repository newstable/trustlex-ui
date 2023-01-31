import React from "react";
import Button from "~/components/Button/Button";
import ExchangeSwapGroup from "~/components/ExchangeSwapGroup/ExchangeSwapGroup";
import GradientBackgroundContainer from "~/components/GradientBackgroundContainer/GradientBackgroundContainer";
import HomepageCard from "~/components/HomepageCard/HomepageCard";
import ImageIcon from "~/components/ImageIcon/ImageIcon";
import { InputWithSelect } from "~/components/InputWithSelect/InputWithSelect";
import SpanFullGridWidth from "~/components/SpanFullGridWidth/SpanFullGridWidth";
import { VariantsEnum } from "~/enums/VariantsEnum";
import styles from "./Home.module.scss";

type Props = {};

const data1 = [
  {
    value: "btc",
    label: "BTC",
    icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
  },
];

const data2 = [
  {
    label: "Limit",
    value: "limit",
  },
  {
    label: "No Limit",
    value: "no-limit",
  },
];

const data3 = [
  {
    value: "eth",
    label: "ETH",
    icon: <ImageIcon image={"/icons/ethereum-2.svg"} />,
  },
  {
    value: "solana",
    label: "SOL",
    icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
  },
];

const Home = (props: Props) => {
  const [activeExchange, setActiveExchange] = React.useState("btc");
  return (
    <div className={styles.root}>
      <h1 className={styles.pageTitle}>Home</h1>
      <p className={styles.pageDesc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <div className={styles.mainContent}>
        <div className={styles.cards}>
          <HomepageCard
            color="#fd90d1b3"
            icon="/icons/Activity.png"
            title="Supported networks / assets"
            value="5 networks, 25 pairs"
          />
          <HomepageCard
            color="#67D558b3"
            icon="/icons/Lock.png"
            title="Total Value Locked"
            value="$ 1.6 Billion"
          />
          <HomepageCard
            color="#78CEF9b3"
            icon="/icons/Chart.png"
            title="Total Transaction Volume (last 24h)"
            value="$ 25 Million"
          />
        </div>
        <div className={styles.bottomSection}>
          <GradientBackgroundContainer
            colorRight="#FEBD38b3"
            colorLeft="#FEBD3833"
          >
            <div className={styles.bottomSectionContent}>
              <SpanFullGridWidth>
                <ExchangeSwapGroup
                  activeExchange={activeExchange}
                  setActiveExchange={setActiveExchange}
                />
              </SpanFullGridWidth>

              <div>
                <div className={styles.homeIndicator}>
                  <span></span>
                </div>
                <InputWithSelect
                  options={data2}
                  type="number"
                  placeholder={"Limit price BTC/ETC"}
                />
              </div>
              <div className={styles.temporary}></div>
              <div className={styles.temporary}></div>
              <Button variant={VariantsEnum.primary} radius="md" fullWidth>
                Confirm
              </Button>
            </div>
          </GradientBackgroundContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
