pragma solidity ^0.5.0;

import "./SFC.sol";
import "../erc20/base/ERC20Burnable.sol";
import "../erc20/base/ERC20Mintable.sol";
import "../common/Initializable.sol";

contract Spacer {
    address private _owner;
}

contract StakeTokenizer is Spacer, Initializable {
    SFC internal sfc;

    mapping(address => mapping(uint256 => uint256)) public outstandingSFTM;

    address public sFTMTokenAddress;

    function initialize(address payable _sfc, address _sFTMTokenAddress) public initializer {
        sfc = SFC(_sfc);
        sFTMTokenAddress = _sFTMTokenAddress;
    }

    function mintSFTM(uint256 toValidatorID) external {
        address delegator = msg.sender;
        uint256 lockedStake = sfc.getLockedStake(delegator, toValidatorID);
        require(lockedStake > 0, "delegation isn't locked up");
        require(lockedStake > outstandingSFTM[delegator][toValidatorID], "sFTM is already minted");

        uint256 diff = lockedStake - outstandingSFTM[delegator][toValidatorID];
        outstandingSFTM[delegator][toValidatorID] = lockedStake;

        // It's important that we mint after updating outstandingSFTM (protection against Re-Entrancy)
        require(ERC20Mintable(sFTMTokenAddress).mint(delegator, diff), "failed to mint sFTM");
    }

    function redeemSFTM(address _targetAddress, uint256 validatorID, uint256 amount) external {
        address delegator = msg.sender;
        if (_targetAddress != address(0x0)) {
            delegator = _targetAddress;
        }

        require(outstandingSFTM[delegator][validatorID] >= amount, "low outstanding sFTM balance");
        require(IERC20(sFTMTokenAddress).allowance(delegator, address(this)) >= amount, "insufficient allowance");
        outstandingSFTM[delegator][validatorID] -= amount;

        // It's important that we burn after updating outstandingSFTM (protection against Re-Entrancy)
        ERC20Burnable(sFTMTokenAddress).burnFrom(delegator, amount);
    }

    function allowedToWithdrawStake(address sender, uint256 validatorID) public view returns(bool) {
        return outstandingSFTM[sender][validatorID] == 0;
    }
}
