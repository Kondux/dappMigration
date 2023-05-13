import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { BrowserView, MobileView } from "react-device-detect";
import { getEllipsisTxt } from "../helpers/formatters";
import Blockie from "./Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "./Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";
import { mobileConnectors } from "./mobileconfig";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#f47900",
  },
  connector: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
    border: "1px solid transparent",
  },

  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

function Account() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !walletAddress) {
    return (
      <>
        <div style={styles.account} onClick={() => setIsAuthModalVisible(true)}>
          <p style={styles.text}>Connect</p>
        </div>

        <Modal
          visible={isAuthModalVisible}
          footer={null}
          zIndex={9999}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Connect Wallet
          </div>

          <BrowserView>
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                {connectors.map(
                  ({ title, icon, connectorId, description }, key) => (
                    <div
                      className="connectors"
                      style={styles.connector}
                      key={key}
                      onClick={async () => {
                        try {
                          await authenticate({
                            provider: connectorId,
                            signingMessage: "🧬 Access Kondux Gateway 🧬",
                            qrcode: false,
                          });
                          window.localStorage.setItem(
                            "connectorId",
                            connectorId
                          );
                          setIsAuthModalVisible(false);
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    >
                      <img src={icon} alt={title} style={styles.icon} />
                      <Text
                        style={{
                          color: "black",
                          fontWeight: 700,
                          fontSize: "24px",
                        }}
                      >
                        {title}
                      </Text>
                      <Text style={{ color: "#AFAFC1", fontSize: "14px" }}>
                        {description}
                      </Text>
                    </div>
                  )
                )}
              </div>
            </>
          </BrowserView>

          <MobileView>
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                {mobileConnectors.map(
                  ({ title, icon, connectorId, description }, key) => (
                    <div
                      className="connectors"
                      style={styles.connector}
                      key={key}
                      onClick={async () => {
                        try {
                          await authenticate({
                            provider: connectorId,
                            signingMessage: "🧬 Access Kondux Gateway 🧬",
                            qrcode: false,
                          });
                          window.localStorage.setItem(
                            "connectorId",
                            connectorId
                          );
                          setIsAuthModalVisible(false);
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    >
                      <img src={icon} alt={title} style={styles.icon} />
                      <Text
                        style={{
                          color: "black",
                          fontWeight: 700,
                          fontSize: "24px",
                        }}
                      >
                        {title}
                      </Text>
                      <Text style={{ color: "#AFAFC1", fontSize: "14px" }}>
                        {description}
                      </Text>
                    </div>
                  )
                )}
              </div>
            </>
          </MobileView>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px", ...styles.text }}>
          {getEllipsisTxt(walletAddress, 4)}
        </p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        zIndex={5000}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`https://sepolia.etherscan.io/address/${walletAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
