async function main(network) {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  const FantomMintTokenRegistry = await ethers.getContractFactory(
    'FantomMintTokenRegistry'
  );

  const fantomMintTokenRegistry = await FantomMintTokenRegistry.deploy();
  await fantomMintTokenRegistry.deployed();
  console.log(
    'FantomMintTokenRegistry deployed at',
    fantomMintTokenRegistry.address
  );

  await hre.run('verify:verify', {
    address: fantomMintTokenRegistry.address,
    constructorArguments: []
  });

  await fantomMintTokenRegistry.initialize(deployerAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
