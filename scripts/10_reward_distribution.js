async function main(network) {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  const FantomMintRewardDistribution = await ethers.getContractFactory(
    'FantomMintRewardDistribution'
  );

  const fantomMintRewardDistribution = await FantomMintRewardDistribution.deploy();
  fantomMintRewardDistribution.deployed();
  console.log(
    'FantomMintRewardDistribution deployed at',
    fantomMintRewardDistribution.address
  );
  // await fantomMintRewardDistribution.initialize(
  //   deployerAddress,
  //   fantomMintAddressProvider.address
  // );

  await hre.run('verify:verify', {
    address: fantomMintRewardDistribution.address,
    constructorArguments: []
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
