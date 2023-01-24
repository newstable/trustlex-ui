import React from "react";
import Button from "~/components/Button/Button";
import GradientBackgroundContainer from "~/components/GradientBackgroundContainer/GradientBackgroundContainer";
import HomepageCard from "~/components/HomepageCard/HomepageCard";
import ImageIcon from "~/components/ImageIcon/ImageIcon";
import { InputWithSelect } from "~/components/InputWithSelect/InputWithSelect";
import styles from "./Home.module.scss";

type Props = {};

const data1 = [
  {
    value: "btc",
    label: "BTC",
    icon: <ImageIcon image={"/icons/bitcoin.svg"} />,
  },
  {
    value: "eth",
    label: "ETH",
    icon: <ImageIcon image={"/icons/etherium.svg"} />,
  },
  {
    value: "solana",
    label: "SOL",
    icon: <ImageIcon image={"/icons/etherium.svg"} />,
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

const Home = (props: Props) => {
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
            bgImage="/images/Rectangle-large.png"
          >
            <div className={styles.buySection}>
              <div className={styles.left}>
                <InputWithSelect
                  options={data1}
                  type="number"
                  value={0.0029}
                  label={"Buy"}
                />
                <InputWithSelect
                  options={data2}
                  type="number"
                  placeholder={"Limit price BTC/ETC"}
                />
                <Button variant="primary">Confirm</Button>
              </div>
              <div className={styles.middle}>
                <Button variant="default">
                  <ImageIcon image="/icons/swap.svg" />
                </Button>
              </div>
              <div className={styles.right}>
                <p>Pay</p>
              </div>
            </div>
          </GradientBackgroundContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
