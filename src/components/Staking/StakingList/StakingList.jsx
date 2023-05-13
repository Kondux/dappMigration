import StakingItem from "./StakingItem/StakingItem";
import StakingListStyleWrapper from "./StakingList.style";
import data from "./dataV2";

const StakingList = ({ totalStakeBalance, rewardsRate }) => {
  return (
    <StakingListStyleWrapper>
      <div className="container">
        <div
          className="row staking_items_row"
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {data?.map((stake, i) => (
            <div
              // style={{ width: "45vw" }}
              key={i}
            >
              <StakingItem {...stake} />
            </div>
          ))}
        </div>
      </div>
    </StakingListStyleWrapper>
  );
};

export default StakingList;
