import { Icon } from "@iconify/react";
import { Center, Drawer, Grid, Text } from "@mantine/core";
import { CurrencyEnum } from "~/enums/CurrencyEnum";
import { VariantsEnum } from "~/enums/VariantsEnum";
import Button from "../Button/Button";
import CurrencyDisplay from "../CurrencyDisplay/CurrencyDisplay";
import GradientBackgroundContainer from "../GradientBackgroundContainer/GradientBackgroundContainer";
import styles from "./ExchangeOfferDrawer.module.scss";
import useWindowDimensions from "~/hooks/useWindowDimesnsion";
import { ReactNode, useRef, useState } from "react";
import useAutoHideScrollbar from "~/hooks/useAutoHideScrollBar";
import StepSvg, { StepFilledSvg } from "./StepSvg";
import useDetectScrollUpDown from "~/hooks/useDetectScrollUpDown";

type Props = {
  isOpened: boolean;
  onClose: () => void;
  data: (string | ReactNode)[];
};

const ExchangeOfferDrawer = ({ isOpened, onClose, data }: Props) => {
  const { mobileView } = useWindowDimensions();
  const rootRef = useRef(null);

  useAutoHideScrollbar(rootRef);
  // console.log(data);

  const [isInitiatng, setIsInitating] = useState("false");
  const handleInitate = () => {
    setIsInitating("loading");
    setTimeout(() => {
      setIsInitating("initiated");
    }, 2000);
  };
  const [checked, setChecked] = useState("allow");
  const [activeStep, setActiveStep] = useState(1);
  const [verified, setVerified] = useState(false);
  const [confirmed, setConfirmed] = useState("");

  const handleConfirmClick = () => {
    setConfirmed("loading");
    setTimeout(() => {
      setConfirmed("confirmed");
    }, 5000);
  };

  const { scrollDirection } = useDetectScrollUpDown();

  return (
    <Drawer
      opened={isOpened}
      onClose={onClose}
      position={!mobileView ? "right" : "bottom"}
      overlayBlur={2.5}
      overlayOpacity={0.5}
      withCloseButton={false}
      size={!mobileView ? 800 : scrollDirection === "down" ? "full" : 600}
      closeOnClickOutside={true}
      closeOnEscape={true}
      transition="fade"
      transitionDuration={800}
      transitionTimingFunction="ease"
    >
      <GradientBackgroundContainer
        radius={0}
        colorLeft={mobileView ? "" : "#FEBD3893"}
        colorRight={mobileView ? "#FEBD3838" : ""}
        bgImage="/images/Rectangle.svg"
      >
        <div className={styles.root} ref={rootRef}>
          <Grid className={styles.heading}>
            {mobileView && (
              <Grid.Col
                span={3}
                p={0}
                pb={1}
                className={styles.cancelContainer}
              >
                <span className={styles.cancel} onClick={onClose}>
                  Cancel
                </span>
              </Grid.Col>
            )}

            <Grid.Col span={!mobileView ? 11 : 9}>
              <Text component="h1" className={styles.headTitle}>
                Initiate your order
              </Text>
            </Grid.Col>
            {!mobileView && (
              <Grid.Col span={1}>
                <Button variant={VariantsEnum.default} onClick={onClose} p={0}>
                  <Icon
                    icon="radix-icons:cross-circled"
                    className={styles.closeIcon}
                  />
                </Button>
              </Grid.Col>
            )}
          </Grid>
          <Grid className={styles.heading}>
            <Grid.Col span={11}>
              <Text component="h1" className={styles.title}>
                <span className={styles.buy}>Buy:</span>
                <CurrencyDisplay amount={10} type={CurrencyEnum.ETH} />
                <span className={styles.for}>with</span>
                <CurrencyDisplay amount={0.5} type={CurrencyEnum.BTC} />{" "}
              </Text>
            </Grid.Col>
          </Grid>

          <div className={styles.stepsConatiner}>
            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <div className={styles.svg}>
                  {activeStep === 1 ? <StepFilledSvg /> : <StepSvg />}
                </div>
                <h2 className={styles.stepCount}>Step 1</h2>
              </div>
              <div className={styles.stepsContentsContainer}>
                <div className={styles.stepContent}>
                  <div className={styles.spacing} />
                  <div
                    className={`${styles.stepItem} ${
                      checked === "allow" && styles.activeStepItem
                    }`}
                    onClick={() => setChecked("allow")}
                  >
                    <div className={styles.checkboxContainer}>
                      <input
                        type="radio"
                        className={styles.checkbox}
                        checked={checked === "allow" ? true : false}
                        onChange={() => setChecked("allow")}
                      />
                    </div>
                    <span>
                      Allow anyone to post payment proof for 0.05% fee
                    </span>
                  </div>

                  <div
                    className={`${styles.stepItem} ${
                      checked !== "allow" && styles.activeStepItem
                    }`}
                    onClick={() => setChecked("notAllow")}
                  >
                    <div className={styles.checkboxContainer}>
                      <input
                        type="radio"
                        className={styles.checkbox}
                        checked={checked !== "allow" ? true : false}
                        onChange={() => setChecked("notAllow")}
                      />
                    </div>
                    <span>I'll do it myself(0% transaction fees)</span>
                  </div>
                  <div className={styles.actionButton}>
                    {isInitiatng === "initiated" ? (
                      <Button
                        variant={VariantsEnum.outline}
                        radius={10}
                        style={{
                          borderColor: "#53C07F",
                          background: "unset",
                          color: "#53C07F",
                        }}
                        leftIcon={
                          <Icon icon={"charm:circle-tick"} color="#53C07F" />
                        }
                      >
                        Initiated
                      </Button>
                    ) : (
                      <Button
                        variant={
                          isInitiatng === "loading"
                            ? VariantsEnum.outline
                            : VariantsEnum.outlinePrimary
                        }
                        radius={10}
                        style={{
                          backgroundColor:
                            isInitiatng === "loading" ? "unset" : "transparent",
                        }}
                        loading={isInitiatng === "loading" ? true : false}
                        onClick={handleInitate}
                      >
                        {isInitiatng === "loading" ? "Initiating" : "Initiate"}
                      </Button>
                    )}
                    {isInitiatng === "loading" ? (
                      <span className={styles.timer}>0:26</span>
                    ) : (
                      isInitiatng !== "initiated" && (
                        <span className={styles.rightText}>
                          It will take approximately 1-3 mins
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <div className={styles.svg}>
                  {activeStep === 2 ? <StepFilledSvg /> : <StepSvg />}
                </div>
                <h2 className={styles.stepCount}>Step 2</h2>
              </div>
              <div className={styles.stepsContentsContainer}>
                <div className={styles.stepContent}>
                  <div className={styles.spacing} />
                  <div className={styles.sendToContainer}>
                    <img src="/images/qr-code.png" className={styles.qrImage} />
                    <div className={styles.sendTo}>
                      <span>Send 0.5 Bitcoins to:</span>
                      {mobileView ? (
                        <span>1BoatSLRHtKNngkdXEeobR76b53</span>
                      ) : (
                        <span>1BoatSLRHtKNngkdXEeobR76b53LETtpyT</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.colletaralTextContainer}>
                    <span
                      className={styles.colletaralText}
                    >{`Colletaral (optional)`}</span>
                    <span className={styles.colletaralText}>
                      Post 10% collateral to increase the payment confirmation
                      time by 3 more hours
                    </span>
                  </div>

                  <div className={styles.actionButton}>
                    <Button
                      variant={VariantsEnum.outlinePrimary}
                      style={{ background: "transparent" }}
                      radius={10}
                    >
                      Add Collateral
                    </Button>
                    <span className={styles.rightText}>
                      5% collateral posted already
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepTitle}>
                <div className={styles.svg}>
                  {activeStep === 3 ? <StepFilledSvg /> : <StepSvg />}
                </div>
                <h2 className={styles.stepCount}>Step 3</h2>
              </div>
              <div className={styles.stepsContentsContainer}>
                <div className={`${styles.stepContent} ${styles.lastContent}`}>
                  <div className={styles.submitProof}>
                    <h3>Submit Proof</h3>
                    <p>
                      Submit Proof of payment before 01 January, 2023 23:45 or
                      add more collateral to increase payment confirmation time
                      in order to have the ability to withdraw ETH from smart
                      contract
                    </p>
                  </div>
                  <div
                    className={`${styles.stepItem} ${styles.proofCheckbox} ${
                      verified && styles.activeStepItem
                    }`}
                    onClick={() => setVerified(!verified)}
                  >
                    <div className={styles.checkboxContainer}>
                      <input
                        type="radio"
                        className={styles.checkbox}
                        checked={verified}
                        onChange={() => {
                          setVerified(true);
                        }}
                      />
                    </div>
                    <span>I've verified the transaction details</span>
                  </div>

                  <div className={styles.buttonContainer}>
                    {confirmed !== "confirmed" && (
                      <Button
                        variant={
                          confirmed === "loading"
                            ? VariantsEnum.outline
                            : VariantsEnum.primary
                        }
                        fullWidth={
                          mobileView && confirmed !== "loading" ? true : false
                        }
                        radius={10}
                        style={{
                          height: "4.5rem",
                          backgroundColor:
                            confirmed === "loading"
                              ? "unset"
                              : "linear-gradient(180deg, #ffd572 0%, #febd38 100%)",
                        }}
                        loading={confirmed === "loading" ? true : false}
                        onClick={handleConfirmClick}
                      >
                        {confirmed === "loading"
                          ? "Confirmation"
                          : "Confirm payment"}
                      </Button>
                    )}
                    {confirmed === "loading" && (
                      <span className={styles.timer}>0:26</span>
                    )}

                    {confirmed === "confirmed" && (
                      <div className={styles.confirmed}>
                        <Button
                          variant={VariantsEnum.outline}
                          radius={10}
                          style={{
                            borderColor: "#53C07F",
                            background: "unset",
                            color: "#53C07F",
                          }}
                          fullWidth={mobileView ? true : false}
                          leftIcon={
                            <Icon icon={"charm:circle-tick"} color="#53C07F" />
                          }
                        >
                          Confirmed
                        </Button>
                        <div className={styles.transactionLink}>
                          <h6>Link to your transaction</h6>
                          <div className={styles.linkBox}>
                            <span>trustlex.so/5aa2342esd2...</span>
                            <div className={styles.iconBox}>
                              <Icon
                                icon={"tabler:copy"}
                                className={styles.icon}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GradientBackgroundContainer>
    </Drawer>
  );
};

export default ExchangeOfferDrawer;