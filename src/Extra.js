{
  colorMode === "light" ? (
    <>
      <Router>
        <Box p="1" style={styles.headerLight}>
          <Logo />
          <SearchCollections setInputValue={setInputValue} />

          <Menu
            style={{
              backgroundColor: "transparent",
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "50px",
              width: "30%",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <MenuItem
              key="nftMarket"
              onClick={() => setInputValue("explore")}
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/NFTMarketPlace">🛒 Explore Market</NavLink>
            </MenuItem>

            <MenuItem
              key="nft"
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/nftBalance">🖼 Your Collection</NavLink>
            </MenuItem>

            {/* <MenuItem
key="transactions"
style={{
  backgroundColor: "transparent",
  width: "10%",
}}
>
<NavLink to="/Transactions">📑 Your Transactions</NavLink>
</MenuItem> */}

            <MenuItem
              key="minter"
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/Minter">📑 Minter NFT</NavLink>
            </MenuItem>

            <MenuItem
              key="viewport"
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/Viewport">🗔 Viewport</NavLink>
            </MenuItem>

            <MenuItem
              key="rewards"
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/Rewards">💰 Rewards</NavLink>
            </MenuItem>
          </Menu>
          <div style={styles.headerRight}>
            <Box p={1}>
              {colorMode === "dark" ? (
                <IconButton
                  onClick={toggleColorMode}
                  aria-label="Change Mode"
                  size="lg"
                  icon={<SunIcon />}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </IconButton>
              ) : (
                <IconButton
                  onClick={toggleColorMode}
                  aria-label="Change Mode"
                  size="lg"
                  icon={<MoonIcon />}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </IconButton>
              )}
            </Box>
            <Spacer />

            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Box>
        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </Route>
            {/* <Route path="/Transactions">
<NFTMarketTransactions />
</Route> */}

            <Route path="/Minter">
              <Minter />
            </Route>
            <Route path="/Viewport">
              <CharacterTab />
            </Route>
            <Route path="/Rewards">{/* <RewardsTab /> */}</Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>
      <Box style={{ textAlign: "center" }}>
        <Footer />
      </Box>
    </>
  ) : (
    <>
      <Router>
        <Box p="1" style={styles.headerDark}>
          <Logo />
          <SearchCollections setInputValue={setInputValue} />

          <Menu
            style={{
              backgroundColor: "transparent",
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "50px",
              width: "30%",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <MenuItem
              key="nftMarket"
              onClick={() => setInputValue("explore")}
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/NFTMarketPlace">🛒 Explore Market</NavLink>
            </MenuItem>

            <MenuItem
              key="nft"
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/nftBalance">🖼 Your Collection</NavLink>
            </MenuItem>

            {/* <MenuItem
            key="transactions"
            style={{
              backgroundColor: "transparent",
              width: "10%",
            }}
          >
            <NavLink to="/Transactions">📑 Your Transactions</NavLink>
          </MenuItem> */}

            <MenuItem
              key="minter"
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/Minter">📑 Minter NFT</NavLink>
            </MenuItem>

            <MenuItem
              key="viewport"
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/Viewport">🗔 Viewport</NavLink>
            </MenuItem>

            <MenuItem
              key="rewards"
              style={{
                backgroundColor: "transparent",
                width: "10%",
              }}
            >
              <NavLink to="/Rewards">💰 Rewards</NavLink>
            </MenuItem>
          </Menu>
          <div style={styles.headerRight}>
            <Box p={1}>
              {colorMode === "dark" ? (
                <IconButton
                  onClick={toggleColorMode}
                  aria-label="Change Mode"
                  size="lg"
                  icon={<SunIcon />}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </IconButton>
              ) : (
                <IconButton
                  onClick={toggleColorMode}
                  aria-label="Change Mode"
                  size="lg"
                  icon={<MoonIcon />}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </IconButton>
              )}
            </Box>
            <Spacer />

            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Box>
        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </Route>
            {/* <Route path="/Transactions">
            <NFTMarketTransactions />
          </Route> */}

            <Route path="/Minter">
              <Minter />
            </Route>
            <Route path="/Viewport">
              <CharacterTab />
            </Route>
            <Route path="/Rewards">{/* <RewardsTab /> */}</Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>

      <Box style={{ textAlign: "center" }}>
        <Footer />
        {/*               
        <Text style={{ display: "block" }}>
          <a
            href="https://kondux.io"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </Text>

        <Text style={{ display: "block" }}>
          <a target="_blank" rel="noopener noreferrer" href=""></a>
        </Text>

        <Text style={{ display: "block", marginTop: "50px" }}>
          <p target="_blank" rel="noopener noreferrer" href="">
            Copyright © 2022 Kondux. All Rights Reserved
          </p>
        </Text> */}
      </Box>
    </>
  );
}

// "browserslist": {
//   "production": [
//     "chrome >= 67",
//     "edge >= 79",
//     "firefox >= 68",
//     "opera >= 54",
//     "safari >= 14"
//   ],
//   "development": [
//     "last 1 chrome version",
//     "last 1 firefox version",
//     "last 1 safari version"
//   ]
// },
