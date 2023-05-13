import StakingList from "./StakingList/StakingList";
import StakingStyleWrapper from "./Staking.style";

const Staking = ({ totalStakeBalance, rewardsRate }) => {
  return (
    <StakingStyleWrapper>
      <StakingList
      // totalStakeBalance={totalStakeBalance}
      // rewardsRate={rewardsRate}
      />
    </StakingStyleWrapper>
  );
};

export default Staking;
